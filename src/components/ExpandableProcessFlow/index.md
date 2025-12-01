---
title: ExpandableProcessFlow 可展开流程
order: 5
group:
  title: 数据展示
  path: /components
---

# ExpandableProcessFlow 可展开流程

封装的可展开流程信息展示组件。

## 代码演示

### 基础用法

<code src="./demo/basic.tsx"></code>

# ProcessFlow 基础流程展示

封装的流程信息展示组件。

## 代码演示

### 基础用法

<code src="./demo/process-flow.tsx"></code>

## API

### ExpandableProcessFlow

| 参数名                 | 类型                          | 默认值       | 说明                   |
| ---------------------- | ----------------------------- | ------------ | ---------------------- |
| `title`                | `string`                      | -            | 流程标题               |
| `description`          | `string`                      | -            | 流程描述               |
| `toggleText`           | `string`                      | `'查看流程'` | 展开/收起按钮文字      |
| `steps`                | `ProcessStep[]`               | -            | 流程步骤数据           |
| `defaultExpanded`      | `boolean`                     | `false`      | 默认是否展开           |
| `className`            | `string`                      | `''`         | 自定义容器样式类名     |
| `headerClassName`      | `string`                      | `''`         | 自定义头部样式类名     |
| `flowClassName`        | `string`                      | `''`         | 自定义流程区域样式类名 |
| `flowWrapperClassName` | `string`                      | `''`         | 自定义流程区域样式类名 |
| `seperatorClassName`   | `string`                      | `''`         | 自定义分隔符样式类名   |
| `onExpandChange`       | `(expanded: boolean) => void` | -            | 展开状态变化回调       |

### ProcessFlow

| 参数名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `steps` | `ProcessStep[]` | - | 流程步骤数据 |
| `className` | `string` | `''` | 自定义容器样式类名 |
| `stepClassName` | `string` | `''` | 自定义步骤项样式类名 |
| `seperatorClassName` | `string` | `''` | 自定义分隔符样式类名 |
| `arrowIcon` | `React.ReactNode` | `<IconRight className="text-gray-400" />` | 自定义箭头图标 |
| `bordered` | `boolean` | `true` | 是否显示边框 |

### ProcessStep 类型

| 参数名        | 类型              | 说明             |
| ------------- | ----------------- | ---------------- |
| `icon`        | `React.ReactNode` | 步骤图标         |
| `title`       | `string`          | 步骤标题         |
| `description` | `string`          | 步骤描述         |
| `color`       | `string`          | 步骤主题色(可选) |
