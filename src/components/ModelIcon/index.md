---
title: ModelIcon AI模型图标
order: 13
group:
  title: 通用
  path: /components
---

# ModelIcon AI 模型图标

根据提供商类型显示不同的图标。

## 代码演示

### 基础用法

<code src="./demo/basic.tsx"></code>

### 添加自定义模型类型

<code src="./demo/custom.tsx"></code>

## API

### ModelIcon

| 参数 | 说明 | 类型     | 默认值 |
| ---- | ---- | -------- | ------ |
| type | 类型 | `string` | -      |

> Icon 组件支持的属性，ModelIcon 组件也支持

## 模型类型映射

### 默认模型类型映射关系

```tsx
export const ModelIconMap = new Map([
  [['deepseek', 'ds'], IconLlmDs],
  [['meta', 'llama'], IconLlmLlama],
  [['ali', 'alibaba', 'qwen', 'qianwen'], IconLlmQwen],
]);
```
