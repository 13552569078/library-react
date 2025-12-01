---
title: PermissionWrapper 权限包装
group:
  title: 组件
  path: /businesses
  order: 1
---

# PermissionWrapper 权限包装

平台统一权限包装组件，依赖于组件库中的 zustand store: `userInfoStore`

## 代码演示

### 基础用法

<code src="./demo/basic.tsx"></code>

## API

### PermissionWrapper

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | - | `React.ReactNode` | - |
| permission | 单个权限或权限数组（需要全部满足） | `string \| string[]` | - |
| anyPermission | 权限数组（满足任意一个即可） | `string[]` | - |
| fallback | 无权限时显示的内容，默认为 null（不显示） | `React.ReactNode` | - |
| disableWhenNoPermission | 无权限时是否禁用而不是隐藏，仅对支持 disabled 属性的组件有效 | `boolean` | - |
| noPermissionClassName | 无权限时的样式类名 | `string` | - |
| noPermissionStyle | 无权限时的内联样式 | `React.CSSProperties` | - |
