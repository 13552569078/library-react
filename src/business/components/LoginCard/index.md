---
title: LoginCard 登录卡片
group:
  title: 组件
  path: /businesses
  order: 1
---

# LoginCard 登录卡片

平台统一登录卡片。

## 代码演示

### 基础用法

<code src="./demo/basic.tsx"></code>

## API

### LoginCard

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 产品名称 | `string` | - |
| logo | 自定义 logo 图，可选 | `string` | - |
| login | 登录函数 | `(info: Record<string, any>) => Promise<{ statusCode: number}>` | - |
| targetUrl | 登录成功跳转 url | `string \| (() => Promise<string>)` | - |
| go | 最终跳转 url | `(url: string) => void` | - |

> 登录后会首先处理当前 url 上`redirect_uri`参数，然后处理`targetUrl`参数，最后传给`go`进行最终跳转。
