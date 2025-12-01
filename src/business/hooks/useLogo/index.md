---
title: useLogo 动态设置logo
group:
  title: hooks
  path: /businesses
  order: 10
---

# useLogo 动态设置 logo

动态设置登录页，功能页面头部以及浏览器 Tab 页签 favicon 图标，依赖于 API：`/config/api/v1/configuration/platform`。

## 依赖项

favicon 图标需要在 index.html 中给 link 加上 id 属性，代码参考：

```html
<link rel="shortcut icon" type="image/x-icon" href="/assets/logo.ico" id="favIcon" />
```

## 代码演示

```ts
export function useLogo(GetConfig: () => Promise<any>): { loginLogo; headerLogo };
```
