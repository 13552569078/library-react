---
title: EllipsisPopover 文本省略提示框
order: 5
group:
  title: 数据展示
  order: 5
  path: /components
---

# EllipsisPopover 文本省略提示框

根据文字长度超出容器时，使用省略号提示。

## 代码演示

### 基础用法

<code src="./demo/basic.tsx"></code>

### 使用 `Typography.Paragraph`

当 `preferTypography` 为 `true` 时，不支持设置 `isLink` 属性。

<code src="./demo/typography.tsx"></code>

### 自定义复制成功消息

可以设置 `quiteMessage` 为 `true`，添加 `copySuccessCallback`， `copyFailCallback` 实现自定义提示。无论设置`quiteMessage`与否，`copySuccessCallback` 和 `copyFailCallback` 都会执行。

<code src="./demo/message.tsx"></code>

## API

### FileIcon

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 文本 | `any` | `--` |
| isCopy | 是否显示复制 Icon | `boolean` | `false` |
| isLink | 是否显示为 Link | `boolean` | `false` |
| handleLink | 点击 Link 的回调函数 | `() => void` |  |
| wrapperClassName | 文本包装类 | `string` |  |
| className | 文本类 | `string` |  |
| preferTypography | 是否优先使用`Typography`组件 | `boolean` | `false` |
| quiteMessage | 是否禁用复制成功与失败提示消息 | `boolean` | `false` |
| copySuccessCallback | 复制成功回调 | `() => void` |  |
| caopyFailCallback | 复制失败回调 | `() => void` |  |
| ellipsis | `Typography`组件的`ellipsis`属性 | `EllipsisConfig` | `{showTooltip: {type: 'popover',props: {position: 'tl',className: 'ellipsis-popover'}}}` |
