---
title: InlineInputEditor 行内编辑器
order: 9
group:
  title: 数据输入
  path: /components
  order: 4
---

# InlineInputEditor 行内编辑器

封装的行内输入框编辑器组件。

## 代码演示

### 基础用法

<code src="./demo/basic.tsx"></code>

### 多行文本

<code src="./demo/area.tsx"></code>

## API

### InlineInputEditor

| 参数        | 说明             | 类型                      | 默认值 |
| ----------- | ---------------- | ------------------------- | ------ |
| value       | 值               | `string`                  | -      |
| onChange    | 值变更时回调     | `(value: string) => void` | -      |
| onEnd       | 值变更确认时回调 | `(value: string) => void` | -      |
| placeholder | 提示说明         | `string`                  | -      |
| className   | 包裹类           | `string`                  | -      |
| multiLine   | 是否是多行文本   | `boolean`                 | false  |

> Input & Input.TextArea 组件支持的属性，InlineInputEditor 组件也支持。
