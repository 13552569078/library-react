import { Message } from '@arco-design/web-react';

/**
 * 复制文本到剪贴板的工具函数
 * 支持现代浏览器的 clipboard API 和传统的 execCommand 降级方案
 */

export interface CopyResult {
  success: boolean;
  message: string;
  method: 'clipboard' | 'execCommand' | 'failed';
}

/**
 * 复制文本到剪贴板
 * @param text 要复制的文本
 * @returns Promise<CopyResult> 复制结果
 */
export const copyToClipboard = async (text: string): Promise<CopyResult> => {
  // 检查是否支持现代 clipboard API 且在安全上下文中
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      Message.success('已复制到剪贴板');
      return {
        success: true,
        message: '已复制到剪贴板!',
        method: 'clipboard'
      };
    } catch (error) {
      console.warn('Clipboard API 复制失败，尝试降级方案:', error);
      // 如果 clipboard API 失败，尝试降级方案
      return fallbackCopy(text);
    }
  } else {
    // 降级方案：使用传统的 execCommand 方法
    return fallbackCopy(text);
  }
};

/**
 * 降级复制方案：使用 execCommand
 * @param text 要复制的文本
 * @returns CopyResult 复制结果
 */
const fallbackCopy = (text: string): CopyResult => {
  try {
    // 创建临时的 textarea 元素
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // 设置样式，使其不可见但仍然可以被选中
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    textArea.style.opacity = '0';
    textArea.style.pointerEvents = 'none';
    textArea.style.zIndex = '-1';

    // 添加到 DOM
    document.body.appendChild(textArea);

    // 选中文本
    textArea.focus();
    textArea.select();

    // 兼容 iOS Safari
    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
      const range = document.createRange();
      range.selectNodeContents(textArea);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
      textArea.setSelectionRange(0, 999999);
    }

    // 执行复制命令
    const successful = document.execCommand('copy');

    // 清理：移除临时元素
    document.body.removeChild(textArea);

    if (successful) {
      Message.success('已复制到剪贴板');
      return {
        success: true,
        message: '已复制到剪贴板!',
        method: 'execCommand'
      };
    } else {
      return {
        success: false,
        message: '复制失败，请手动复制',
        method: 'failed'
      };
    }
  } catch (error) {
    console.error('降级复制方案失败:', error);
    return {
      success: false,
      message: '复制失败，请手动复制',
      method: 'failed'
    };
  }
};

/**
 * 检查当前环境是否支持复制功能
 * @returns boolean 是否支持复制
 */
export const isCopySupported = (): boolean => {
  // 检查是否支持现代 clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    return true;
  }

  // 检查是否支持 execCommand
  try {
    return (
      document.queryCommandSupported && document.queryCommandSupported('copy')
    );
  } catch (error) {
    return false;
  }
};
