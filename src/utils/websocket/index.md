# WebSocket 客户端

## 特性

ReconnectingWebSocketClient.ts 适用于 React/前端项目的 WebSocket 工具类<br> 功能：

- 自动重连（指数退避 + 抖动）
- 心跳保活（可自定义心跳消息）
- 发送队列（未连接时先排队，连接后自动发送）
- 事件订阅 on/off（open / message / error / close / reconnecting / reconnected / online / offline）
- 超时控制（连接超时、可手动立即重连）
- JSON 发送/接收辅助（sendJSON，自动尝试 JSON.parse）
- 网络状态感知（window online/offline）

注意：浏览器 WebSocket 无法自定义请求头，鉴权可放在 URL Query、子协议(protocols) 或连接后先发 auth 消息。

## 使用示例

```typescript
// 1) 在组件中直接使用
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
          try {
            return JSON.parse(d);
          } catch {}
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
      offOpen();
      offClose();
      offMsg();
      offRe();
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
```

```typescript
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
      offOpen();
      offClose();
      offMsg();
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
```

## API

```typescript
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
  constructor(url: string, options: WSOptions<TIncoming> = {}) {}

  /** 连接 WebSocket */
  connect() {}

  /** 立即重置计数并重连 */
  reconnectNow() {}

  /** 关闭连接并停止自动重连 */
  close(code?: number, reason?: string) {}

  /** 发送（未连接则入队），返回是否立即成功发送 */
  send(data: string | ArrayBuffer | Blob | ArrayBufferView | Record<string, any>): boolean {}

  /** 发送 JSON 对象 */
  sendJSON(obj: any) {}

  /** 等到 OPEN 再继续 */
  waitUntilOpen(timeoutMs = 10_000): Promise<void> {}

  /** 获取当前状态名 */
  get readyState(): ReadyStateName {}

  get isConnected() {}

  /** 订阅事件，返回取消订阅函数 */
  on<E extends EventKey>(event: E, handler: Handler<E, TIncoming>) {}

  off<E extends EventKey>(event: E, handler: Handler<E, TIncoming>) {}

  /** 销毁（解绑全局事件） */
  destroy() {}
}
```
