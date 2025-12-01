---
title: OperationMenu 操作菜单
order: 15
group:
  title: 导航
  path: /components
  order: 10
---

# OperationMenu 操作菜单

封装的操作菜单组件，主要用于表格操作列。

## 代码演示

### 基础用法

<code src="./demo/basic.tsx"></code>

## API

### OperationMenu

| 参数       | 说明   | 类型           | 默认值 |
| ---------- | ------ | -------------- | ------ |
| actions    | 操作   | `ActionItem[]` | []     |
| className  | 类名   | `string`       | -      |
| displayNum | 默认值 | `number`       | 2      |

### ActionItem 数据类型

```ts
type ActionItem = {
  name: string;
  priority: number; // 优先级，越小优先级越高
  tips?: string; // 提示信息
  disabled?: boolean; // 是否禁用
  onClick?: () => void; // 点击事件
  [x: string]: any;
};
```
