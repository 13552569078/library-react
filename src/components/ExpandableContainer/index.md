---
title: ExpandableContainer 可展开容器
order: 5
group:
  title: 数据展示
  path: /components
---

# ExpandableContainer 可展开容器

封装的可展开容器组件。

## 代码演示

### 基础用法

<code src="./demo/basic.tsx"></code>

## API

### ExpandableContainer

| 参数         | 说明                 | 类型                          | 默认值 |
| ------------ | -------------------- | ----------------------------- | ------ |
| moreText     | 更多提示文字         | `string`                      | 更多   |
| lessText     | 收起提示文字         | `string`                      | 收起   |
| align        | 收起文字水平对齐方向 | `left\|right\|center`         | left   |
| children     | 内容                 | `React.ReactNode`             | -      |
| maxHeight    | 最大高               | `number`                      | 259    |
| expand       | 是否展开             | `boolean`                     | false  |
| handleExpand | 展开收起回调         | `(expanded: boolean) => void` | -      |
