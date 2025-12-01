---
title: CascaderWithRefresh 级联选择带刷新
order: 3
group:
  title: 数据输入
  path: /components
  order: 4
---

# CascaderWithRefresh 级联选择带刷新

主要封装带有刷新按钮功能的级联选择组件。

## 代码演示

### 基础用法

<code src="./demo/basic.tsx"></code>

## API

### Cascader

| 参数             | 说明             | 类型                             | 默认值 |
| ---------------- | ---------------- | -------------------------------- | ------ |
| onRefresh        | 刷新回调         | `(...args: any) => Promise<any>` | -      |
| showRefresh      | 是否显示刷新按钮 | `boolean`                        | true   |
| wrapperClassName | 包裹类           | `string`                         | -      |

> Cascader 组件支持的属性，CascaderWithRefresh 组件也支持。
