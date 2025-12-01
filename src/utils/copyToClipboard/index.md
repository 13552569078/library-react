# copyToClipboard 剪贴板复制工具

一个强大且兼容性良好的剪贴板复制工具函数，支持现代浏览器的 Clipboard API 和传统浏览器的降级方案。

## 特性

- 🚀 **现代 API 优先**: 优先使用 Clipboard API，性能更好
- 🔄 **自动降级**: 自动降级到 execCommand 方案，兼容性更强
- 📱 **移动端优化**: 特别优化了 iOS Safari 的兼容性
- 🛡️ **安全上下文检测**: 自动检测 HTTPS 环境
- 💬 **用户反馈**: 内置成功/失败消息提示
- 🔍 **环境检测**: 提供环境支持检测功能

## 代码演示

### 基础用法

<code src="./demo/basic.tsx"></code>

## API

### copyToClipboard

复制文本到剪贴板的主要函数。

```typescript
copyToClipboard(text: string): Promise<CopyResult>
```

**参数**

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 要复制的文本内容 | `string` | - |

**返回值**

返回一个 Promise，resolve 时包含 `CopyResult` 对象：

```typescript
interface CopyResult {
  success: boolean;        // 是否复制成功
  message: string;         // 结果消息
  method: 'clipboard' | 'execCommand' | 'failed';  // 使用的复制方法
}
```

### isCopySupported

检查当前环境是否支持复制功能。

```typescript
isCopySupported(): boolean
```

**返回值**

| 类型 | 说明 |
| --- | --- |
| `boolean` | 当前环境是否支持复制功能 |

## 使用示例

### 基础复制

```typescript
import { copyToClipboard } from 'ai-arco-material';

const handleCopy = async () => {
  const result = await copyToClipboard('Hello World!');

  if (result.success) {
    console.log('复制成功:', result.message);
  } else {
    console.log('复制失败:', result.message);
  }
};
```

### 环境检测

```typescript
import { isCopySupported, copyToClipboard } from 'ai-arco-material';

const handleCopyWithCheck = async () => {
  if (!isCopySupported()) {
    alert('当前环境不支持复制功能');
    return;
  }

  await copyToClipboard('支持复制的文本');
};
```

### 错误处理

```typescript
import { copyToClipboard } from 'ai-arco-material';

const handleCopyWithErrorHandling = async () => {
  try {
    const result = await copyToClipboard('要复制的文本');

    switch (result.method) {
      case 'clipboard':
        console.log('使用现代 Clipboard API 复制成功');
        break;
      case 'execCommand':
        console.log('使用降级方案复制成功');
        break;
      case 'failed':
        console.log('复制失败，请手动复制');
        break;
    }
  } catch (error) {
    console.error('复制过程中发生错误:', error);
  }
};
```

## 兼容性

| 功能 | Chrome | Firefox | Safari | Edge | IE |
| --- | --- | --- | --- | --- | --- |
| Clipboard API | ✅ 66+ | ✅ 63+ | ✅ 13.1+ | ✅ 79+ | ❌ |
| execCommand | ✅ | ✅ | ✅ | ✅ | ✅ 9+ |
| 移动端支持 | ✅ | ✅ | ✅ | ✅ | - |

## 注意事项

1. **安全上下文**: Clipboard API 只能在 HTTPS 或 localhost 环境下使用
2. **用户交互**: 复制操作必须在用户交互（如点击事件）中触发
3. **权限**: 某些浏览器可能需要用户授权剪贴板权限
4. **文本限制**: 建议复制的文本长度不要过大，以免影响性能

## 实现原理

1. **优先级检测**: 首先检查是否支持现代 Clipboard API 且在安全上下文中
2. **现代方案**: 使用 `navigator.clipboard.writeText()` 进行复制
3. **降级方案**: 创建临时 textarea 元素，使用 `document.execCommand('copy')` 复制
4. **移动端优化**: 特别处理 iOS Safari 的选择范围问题
5. **清理工作**: 自动清理临时创建的 DOM 元素