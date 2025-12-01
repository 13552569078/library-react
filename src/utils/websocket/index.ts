/*
 * ReconnectingWebSocketClient.ts
 * 适用于 React/前端项目的 WebSocket 工具类
 * 功能：
 * - 自动重连（指数退避 + 抖动）
 * - 心跳保活（可自定义心跳消息）
 * - 发送队列（未连接时先排队，连接后自动发送）
 * - 事件订阅 on/off（open / message / error / close / reconnecting / reconnected / online / offline）
 * - 超时控制（连接超时、可手动立即重连）
 * - JSON 发送/接收辅助（sendJSON，自动尝试 JSON.parse）
 * - 网络状态感知（window online/offline）
 *
 * 注意：浏览器 WebSocket 无法自定义请求头，鉴权可放在 URL Query、子协议(protocols) 或连接后先发 auth 消息。
 */

export type ReadyStateName = 'CONNECTING' | 'OPEN' | 'CLOSING' | 'CLOSED';

export interface ReconnectInfo {
  attempt: number;
  delay: number; // 本次重连的延迟毫秒
}

export interface MessagePayload<T = unknown> {
  /** 原始 MessageEvent */
  event: MessageEvent;
  /** 原始 data（字符串/Blob/ArrayBuffer） */
  data: any;
  /** 如果是字符串并可解析 JSON，则给出解析后的对象 */
  json?: T;
  /** 文本数据（如果是字符串） */
  text?: string;
}

export interface EventsMap<TIncoming = any> {
  open: Event;
  message: MessagePayload<TIncoming>;
  error: Event;
  close: CloseEvent;
  reconnecting: ReconnectInfo; // 将要重连
  reconnected: { attempt: number }; // 重连成功
  online: Event; // 浏览器网络恢复
  offline: Event; // 浏览器网络断开
}

export type EventKey = keyof EventsMap<any>;
export type Handler<E extends EventKey, TIncoming> = (payload: EventsMap<TIncoming>[E]) => void;

export interface WSOptions<TIncoming = any> {
  /** 子协议，或数组 */
  protocols?: string | string[];
  /** 实例化后是否自动连接，默认 true */
  autoConnect?: boolean;
  /** 最大重试次数，默认 Infinity（无限次） */
  maxRetries?: number;
  /** 初始退避毫秒，默认 500 */
  backoffStartMs?: number;
  /** 退避倍数，默认 1.8 */
  backoffFactor?: number;
  /** 最大退避毫秒，默认 30_000 */
  maxBackoffMs?: number;
  /** 心跳间隔，默认 30_000ms；<=0 表示关闭心跳 */
  heartbeatIntervalMs?: number;
  /** 心跳消息，字符串/对象或函数返回，默认 'ping' */
  heartbeatMessage?: any | (() => any);
  /** 将收到的 data 转换为你需要的结构（优先于内置 JSON 解析） */
  parse?: (data: any) => TIncoming;
  /** 设置底层 ws.binaryType，默认 'blob' */
  binaryType?: 'blob' | 'arraybuffer';
  /** 连接超时，默认 10000ms */
  connectTimeoutMs?: number;
  /** 打日志 */
  logger?: (...args: any[]) => void;
  /** 当服务端正常 close（wasClean=true）时是否继续重连，默认 true */
  retryOnCleanClose?: boolean;
}

export class ReconnectingWebSocketClient<TIncoming = any> {
  private url: string;
  private opts: Required<WSOptions<TIncoming>>;
  private ws: WebSocket | null = null;
  private listeners: Map<EventKey, Set<(...args: any) => any>> = new Map();
  private queue: (string | ArrayBuffer | Blob | ArrayBufferView)[] = [];
  private manualClose = false;
  private attempt = 0;
  private heartbeatTimer: number | null = null;
  private connectTimer: number | null = null;

  constructor(url: string, options: WSOptions<TIncoming> = {}) {
    this.url = url;
    this.opts = {
      protocols: options.protocols ?? undefined,
      autoConnect: options.autoConnect ?? true,
      maxRetries: options.maxRetries ?? Infinity,
      backoffStartMs: options.backoffStartMs ?? 500,
      backoffFactor: options.backoffFactor ?? 1.8,
      maxBackoffMs: options.maxBackoffMs ?? 30_000,
      heartbeatIntervalMs: options.heartbeatIntervalMs ?? 30_000,
      heartbeatMessage: options.heartbeatMessage ?? 'ping',
      parse: options.parse ?? ((d: any) => d as TIncoming),
      binaryType: options.binaryType ?? 'blob',
      connectTimeoutMs: options.connectTimeoutMs ?? 10_000,
      logger: options.logger ?? (() => {}),
      retryOnCleanClose: options.retryOnCleanClose ?? true,
    } as Required<WSOptions<TIncoming>>;

    // 初始化事件容器
    (
      [
        'open',
        'message',
        'error',
        'close',
        'reconnecting',
        'reconnected',
        'online',
        'offline',
      ] as EventKey[]
    ).forEach((k) => this.listeners.set(k, new Set()));

    // 浏览器网络事件
    window.addEventListener('online', this.onOnline);
    window.addEventListener('offline', this.onOffline);

    if (this.opts.autoConnect) this.connect();
  }

  /** 连接 WebSocket */
  connect() {
    if (
      this.ws &&
      (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)
    ) {
      this.opts.logger('WS: already connecting/open');
      return;
    }

    this.manualClose = false;
    const ws = new WebSocket(this.url, this.opts.protocols);
    ws.binaryType = this.opts.binaryType;
    this.ws = ws;

    // 连接超时
    if (this.opts.connectTimeoutMs > 0) {
      this.clearConnectTimer();
      this.connectTimer = window.setTimeout(() => {
        if (ws.readyState === WebSocket.CONNECTING) {
          this.opts.logger('WS: connect timeout, closing');
          try {
            ws.close(4000, 'CONNECT_TIMEOUT');
          } catch {}
        }
      }, this.opts.connectTimeoutMs);
    }

    ws.onopen = (ev) => {
      this.clearConnectTimer();
      this.attempt = 0; // 重连计数归零
      this.emit('open', ev);
      this.flushQueue();
      this.startHeartbeat();
      if (this.attempt > 0) this.emit('reconnected', { attempt: this.attempt });
    };

    ws.onmessage = (ev) => {
      const payload: MessagePayload<TIncoming> = { event: ev, data: ev.data };

      if (typeof ev.data === 'string') {
        payload.text = ev.data;
        // 优先使用自定义 parse，其次尝试 JSON.parse
        try {
          const parsed = this.opts.parse ? this.opts.parse(ev.data) : JSON.parse(ev.data);
          payload.json = parsed as TIncoming;
        } catch {
          // 不是 JSON，忽略
        }
      }

      this.emit('message', payload);
    };

    ws.onerror = (ev) => {
      this.emit('error', ev);
    };

    ws.onclose = (ev) => {
      this.clearConnectTimer();
      this.stopHeartbeat();
      this.emit('close', ev);

      // 是否需要继续重连
      const shouldRetry =
        !this.manualClose &&
        this.attempt < this.opts.maxRetries &&
        (this.opts.retryOnCleanClose || !ev.wasClean);
      if (shouldRetry) {
        const { delay } = this.computeBackoff(++this.attempt);
        this.emit('reconnecting', { attempt: this.attempt, delay });
        window.setTimeout(() => this.connect(), delay);
      }
    };
  }

  /** 立即重置计数并重连 */
  reconnectNow() {
    this.attempt = 0;
    this.manualClose = false;
    try {
      this.ws?.close(4100, 'MANUAL_RECONNECT');
    } catch {}
    // onclose 中会触发重连逻辑
  }

  /** 关闭连接并停止自动重连 */
  close(code?: number, reason?: string) {
    this.manualClose = true;
    this.stopHeartbeat();
    this.clearConnectTimer();
    try {
      this.ws?.close(code, reason);
    } catch {}
    this.ws = null;
  }

  /** 发送（未连接则入队），返回是否立即成功发送 */
  send(data: string | ArrayBuffer | Blob | ArrayBufferView | Record<string, any>): boolean {
    const payload =
      typeof data === 'string' ||
      data instanceof Blob ||
      data instanceof ArrayBuffer ||
      ArrayBuffer.isView(data)
        ? data
        : JSON.stringify(data);

    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(payload as any);
      return true;
    }
    this.queue.push(payload as any);
    return false;
  }

  /** 发送 JSON 对象 */
  sendJSON(obj: any) {
    return this.send(JSON.stringify(obj));
  }

  /** 等到 OPEN 再继续 */
  waitUntilOpen(timeoutMs = 10_000): Promise<void> {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const timer = window.setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        off();
        reject(new Error('WS waitUntilOpen timeout'));
      }, timeoutMs);
      const off = this.on('open', () => {
        window.clearTimeout(timer);
        off();
        resolve();
      });
    });
  }

  /** 获取当前状态名 */
  get readyState(): ReadyStateName {
    const rs = this.ws?.readyState;
    return rs === WebSocket.OPEN
      ? 'OPEN'
      : rs === WebSocket.CONNECTING
      ? 'CONNECTING'
      : rs === WebSocket.CLOSING
      ? 'CLOSING'
      : 'CLOSED';
  }

  get isConnected() {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  /** 订阅事件，返回取消订阅函数 */
  on<E extends EventKey>(event: E, handler: Handler<E, TIncoming>) {
    const set = this.listeners.get(event)!;
    set.add(handler);
    return () => set.delete(handler);
  }

  off<E extends EventKey>(event: E, handler: Handler<E, TIncoming>) {
    this.listeners.get(event)!.delete(handler);
  }

  // ====== 内部方法 ======
  private emit<E extends EventKey>(event: E, payload: EventsMap<TIncoming>[E]) {
    const set = this.listeners.get(event)!;
    set.forEach((fn) => {
      try {
        (fn as any)(payload);
      } catch (err) {
        this.opts.logger('WS listener error', err);
      }
    });
  }

  private flushQueue() {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
    while (this.queue.length) {
      this.ws.send(this.queue.shift() as any);
    }
  }

  private computeBackoff(attempt: number) {
    const exp = Math.pow(this.opts.backoffFactor, attempt - 1);
    const raw = Math.min(this.opts.backoffStartMs * exp, this.opts.maxBackoffMs);
    // 抖动：0.5x ~ 1.5x
    const jitter = raw * (0.5 + Math.random());
    return { delay: Math.floor(jitter) };
  }

  private startHeartbeat() {
    this.stopHeartbeat();
    if (this.opts.heartbeatIntervalMs <= 0) return;
    this.heartbeatTimer = window.setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        const msg =
          typeof this.opts.heartbeatMessage === 'function'
            ? this.opts.heartbeatMessage()
            : this.opts.heartbeatMessage;
        try {
          this.send(msg);
        } catch {}
      }
    }, this.opts.heartbeatIntervalMs);
  }

  private stopHeartbeat() {
    if (this.heartbeatTimer) {
      window.clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  private clearConnectTimer() {
    if (this.connectTimer) {
      window.clearTimeout(this.connectTimer);
      this.connectTimer = null;
    }
  }

  private onOnline = (ev: Event) => {
    this.emit('online', ev);
    // 网络恢复后，如果不是 OPEN，则发起重连
    if (!this.isConnected) this.reconnectNow();
  };

  private onOffline = (ev: Event) => {
    this.emit('offline', ev);
    // 可选：也可以先行关闭以尽早失败
    try {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) this.ws.close(4500, 'OFFLINE');
    } catch {}
  };

  /** 销毁（解绑全局事件） */
  destroy() {
    window.removeEventListener('online', this.onOnline);
    window.removeEventListener('offline', this.onOffline);
    this.close(1000, 'DESTROY');
    this.listeners.forEach((set) => set.clear());
  }
}

/* =======================
 * React 快速使用示例
 * =======================

// 1) 在组件中直接使用
import React, { useEffect, useRef, useState } from 'react';

export function DemoWS() {
  const clientRef = useRef<ReconnectingWebSocketClient<any>>();
  const [status, setStatus] = useState<ReadyStateName>('CLOSED');
  const [last, setLast] = useState<any>(null);

  useEffect(() => {
    const client = new ReconnectingWebSocketClient('wss://example.com/ws', {
      heartbeatIntervalMs: 30_000,
      heartbeatMessage: () => ({ type: 'ping', t: Date.now() }),
      parse: (d) => {
        if (typeof d === 'string') {
          try { return JSON.parse(d); } catch {}
        }
        return d;
      },
      logger: console.debug,
    });

    clientRef.current = client;

    const offOpen = client.on('open', () => setStatus('OPEN'));
    const offClose = client.on('close', () => setStatus('CLOSED'));
    const offMsg = client.on('message', (m) => setLast(m.json ?? m.data));
    const offRe = client.on('reconnecting', (info) => console.debug('reconnecting', info));

    return () => {
      offOpen(); offClose(); offMsg(); offRe();
      client.destroy();
    };
  }, []);

  return (
    <div>
      <div>状态：{status}</div>
      <button onClick={() => clientRef.current?.sendJSON({ type: 'hello' })}>Send</button>
      <pre>{JSON.stringify(last, null, 2)}</pre>
    </div>
  );
}

// 2) 可选：一个简单的 React Hook 包装
export function useWebSocket<T = any>(url: string, options?: WSOptions<T>) {
  const clientRef = useRef<ReconnectingWebSocketClient<T> | null>(null);
  const [readyState, setReadyState] = React.useState<ReadyStateName>('CLOSED');
  const [lastMessage, setLastMessage] = React.useState<T | null>(null);

  useEffect(() => {
    const client = new ReconnectingWebSocketClient<T>(url, options);
    clientRef.current = client;

    const offOpen = client.on('open', () => setReadyState('OPEN'));
    const offClose = client.on('close', () => setReadyState('CLOSED'));
    const offMsg = client.on('message', (m) => setLastMessage((m as any).json ?? m.data));

    return () => {
      offOpen(); offClose(); offMsg();
      client.destroy();
    };
  }, [url]);

  return {
    readyState,
    lastMessage,
    send: (d: any) => clientRef.current?.send(d),
    sendJSON: (o: any) => clientRef.current?.sendJSON(o),
    reconnect: () => clientRef.current?.reconnectNow(),
    close: (code?: number, reason?: string) => clientRef.current?.close(code, reason),
    client: clientRef.current,
  } as const;
}

*/
