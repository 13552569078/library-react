---
title: ProButton 增强按钮
order: 16
group:
  title: 通用
  order: 1
  path: /components
---

# ProButton 增强按钮

ProButton 是基于 Arco Design Button 组件的增强版本，提供了更丰富的功能和更好的用户体验。

## 特性

- 🚀 **异步支持**: 自动处理异步操作，显示加载状态
- 🎯 **智能加载**: 支持自定义加载文本
- 🛡️ **防重复点击**: 自动防止重复点击
- 🎨 **完全兼容**: 完全兼容 Arco Design Button 的所有属性
- 📱 **响应式**: 支持多种尺寸和状态

## 代码演示

### 基础用法

<code src="./demo/basic.tsx"></code>

## API

### ProButton

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 按钮文本 | `ReactNode` | - |
| loading | 是否显示加载状态 | `boolean` | `false` |
| loadingText | 加载状态文本 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| type | 按钮类型 | `'default' \| 'primary' \| 'secondary' \| 'outline' \| 'dashed' \| 'text'` | `'default'` |
| size | 按钮尺寸 | `'mini' \| 'small' \| 'default' \| 'large'` | `'default'` |
| shape | 按钮形状 | `'square' \| 'round' \| 'circle'` | - |
| status | 按钮状态 | `'warning' \| 'danger' \| 'success'` | - |
| long | 是否为长按钮 | `boolean` | `false` |
| onClick | 点击事件，支持异步函数 | `(event: React.MouseEvent<HTMLButtonElement>) => void \| Promise<void>` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `React.CSSProperties` | - |
| icon | 图标 | `ReactNode` | - |
| iconOnly | 是否只显示图标 | `boolean` | `false` |

> 更多属性请参考 [Arco Design Button](https://arco.design/react/components/button) 组件文档。

## 使用场景

### 异步操作

ProButton 特别适合处理异步操作，如 API 调用、文件上传等场景：

```tsx
import { ProButton } from 'ai-arco-material';

const handleSubmit = async () => {
  // 模拟 API 调用
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log('提交成功');
};

<ProButton type="primary" onClick={handleSubmit} loadingText="提交中...">
  提交
</ProButton>;
```

### 防重复点击

组件会自动防止在异步操作进行中的重复点击：

```tsx
<ProButton
  onClick={async () => {
    await fetch('/api/data');
    // 在请求完成前，按钮会保持加载状态，防止重复点击
  }}
>
  获取数据
</ProButton>
```
