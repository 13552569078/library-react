---
title: StickyFormLayout 粘性表单布局
order: 19
group:
  title: 布局
  path: /components
  order: 3
---

# StickyFormLayout 粘性表单布局

封装的粘性表单布局组件。

## 代码演示

### 短内容

<code src="./demo/basic.tsx"></code>

### 长内容

<code src="./demo/long.tsx"></code>

### 自定义操作

<code src="./demo/actions.tsx"></code>

### 模拟整体页面

<code src="./demo/full.tsx"></code>

## API

### StickyFormLayout

| 参数               | 说明             | 类型              | 默认值    |
| ------------------ | ---------------- | ----------------- | --------- |
| title              | 标题部分         | `React.ReactNode` | -         |
| children           | 表单             | `React.ReactNode` | -         |
| footer             | 底部操作         | `React.ReactNode` | ActionBar |
| onConfirm          | 确认按钮点击事件 | `() => void`      | -         |
| onCancel           | 取消按钮点击事件 | `() => void`      | -         |
| loading            | 是否正在加载     | `boolean`         | false     |
| confirmText        | 确认按钮文本     | `string`          | 确定      |
| headerHeight       | 整体页面头部高度 | `number`          | 50        |
| actionBarHeight    | 操作栏高度       | `number`          | 76        |
| rootClassName      | 根节点样式类名   | `string`          | -         |
| titleClassName     | 标题区域样式类名 | `string`          | -         |
| containerClassName | 内容区域样式类名 | `string`          | -         |
| footerClassName    | 底部区域样式类名 | `string`          | -         |
| actionBarClassName | 操作栏样式类名   | `string`          | -         |
