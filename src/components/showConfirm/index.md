---
title: showConfirm 显示确认弹窗
order: 19
group:
  title: 其他
  path: /components
  order: 999
---

# showConfirm 显示确认弹窗

封装的显示确认弹窗函数。

## 代码演示

### 基础用法

<code src="./demo/basic.tsx"></code>

## API

### showConfirm

| 参数    | 说明         | 类型             | 默认值 |
| ------- | ------------ | ---------------- | ------ |
| options | confirm 参数 | `ConfirmOptions` | -      |

> Modal.confirm 支持的参数，showConfirm 也支持。

### ConfirmOptions 默认值

```ts
okButtonProps = { style: { minWidth: '60px' } },
cancelButtonProps = { style: { minWidth: '60px' } },
style = { padding: '20px 28px', width: '400px' },
content: <div className="aa-confirm-content">{content}</div>,
```
