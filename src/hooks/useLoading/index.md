---
title: useLoading
path: /useLoading
group:
  title: 通用
  order: 1
  path: /useLoading
category: '通用'
sidebar: true
---

# useLoading

自动管理异步函数的加载状态。

## 代码演示

<code src='./demo/demo1'></code>

## API

```ts
const useLoading = <T extends (...args: any[]) => Promise<any>>(handler: T):
  { loading: boolean, wrapperHandler: (...args: Parameters<T>) => ReturnType<T>}
```

### 参数

| 参数    | 说明                 | 类型                               |
| ------- | -------------------- | ---------------------------------- |
| handler | 被封装的异步请求函数 | `(...args: any[]) => Promise<any>` |

### 返回值

| 参数           | 说明                 | 类型                               |
| -------------- | -------------------- | ---------------------------------- |
| loading        | 是否处于加载中       | boolean                            |
| wrapperHandler | 封装后的异步请求函数 | `(...args: any[]) => Promise<any>` |
