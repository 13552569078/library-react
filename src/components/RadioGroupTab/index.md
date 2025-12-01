---
title: RadioGroupTab 选项卡
order: 18
group:
  title: 数据展示
  path: /components
---

# RadioGroupTab 选项卡

封装的单选选项卡组件。

## 代码演示

### 基础用法

<code src="./demo/basic.tsx"></code>

### Form 中使用

<code src="./demo/form.tsx"></code>

## API

### RadioGroupTab

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 选项 | `{ value: string; label: string; disabled?: boolean }[]` | [] |
| value | 选中值 | `string` | - |
| defaultValue | 默认值 | `string` | - |
| onChange | 点击单选的回调 | `(value: string) => void` | - |

> Radio.Group 组件支持的属性，RadioGroupTab 组件也支持。
