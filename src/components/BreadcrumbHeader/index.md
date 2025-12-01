---
title: BreadcrumbHeader 面包屑导航
order: 2
group:
  title: 导航
  path: /components
  order: 10
---

# BreadcrumbHeader 面包屑导航

封装的面包屑组件。

## 代码演示

### 基础用法

<code src="./demo/basic.tsx"></code>

### 附加内容

<code src="./demo/extra.tsx"></code>

## API

### BreadcrumbHeader

| 参数            | 说明           | 类型                                | 默认值 |
| --------------- | -------------- | ----------------------------------- | ------ |
| list            | 面包屑         | `{ name: string; href?: string }[]` | []     |
| breadcrumbProps | 面包屑组件属性 | `Omit<BreadcrumbProps, 'children'>` | -      |
| onArrowClick    | 返回事件       | `() => void`                        | -      |
| onLinkClick     | 点击链接事件   | `(href: string) => void`            | -      |
| extra           | 额外内容       | `React.ReactNode`                   | -      |
| showArrow       | 是否显示返回   | `boolean`                           | true   |
| className       | 类             | `string`                            | -      |
