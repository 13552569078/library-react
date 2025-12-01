---
title: EmptyCard 空卡片
order: 5
group:
  title: 数据展示
  path: /components
---

# EmptyCard 空卡片

各种类型的空卡片，用于表示没有内容的场景，比如没有文件、没有数据、没有权限、没有结果等等。

## 代码演示

### 基础用法

<code src="./demo/basic.tsx"></code>

### 自定义图标

<code src="./demo/custom.tsx"></code>

### 完全自定义按钮

<code src="./demo/btn.tsx"></code>

## API

### NoDataCard/NoFileCard/NoPermissionCard/NoOtherCard

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` | 根据不同类型，默认值不同 |
| desc | 描述 | `string` |  |
| primaryBtnProps | 主要按钮配置 | `ButtonProps & { text: string }` |  |
| secondaryBtnProps | 次要按钮配置 | `ButtonProps & { text: string }` |  |
| primaryBtn | 自定义主要按钮 | `React.ReactNode` |  |
| secondaryBtn | 自定义次要按钮 | `React.ReactNode` |  |
| icon | 自定义 Icon，只有`NoOtherCard`组件有此属性 | `ReactNode` |  |

> `primaryBtnProps/secondaryBtnProps` 和 `primaryBtn/secondaryBtn` 没有主次关系，传入两个则显示两个按钮
