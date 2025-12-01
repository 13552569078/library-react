---
nav: 指南
group:
  title: 基础
  order: 1
---

# 快速开始

> 在开始之前，推荐先学习 [React](https://react.dev)，并正确安装和配置了 [Node.js](https://nodejs.org/) v18 或以上。官方指南假设你已了解关于 HTML、CSS 和 JavaScript 的中级知识，并且已经基本掌握了 React 全家桶的正确开发方式。此外，该指南假设你已经通过某个 React 框架（比如 [Next.js](https://nextjs.org/) 或者 [umi](https://umijs.org/)）初始化好了一个项目。

## 介绍

ai-arco-material：包含 业务组件、Hooks、Utils 等，都可以从 `@zhj92/arco-material` 导出使用。

## 安装依赖

你可以在项目的根目录下通过 `npm` 或者 `pnpm` 等包管理工具安装相关依赖，示例如下：

<br />
<NormalInstallDependencies packageNames="@zhj92/arco-material" save="true"></NormalInstallDependencies>

## 在项目中使用

```typescript
import { ProButton, useInView, copyToClipboard } from '@zhj92/arco-material';

export default () => {
  const { ref, inView } = useInView();

  const handleCopy = async () => {
    await copyToClipboard('Hello World!');
  };

  return <ProButton>Click me</ProButton>;
};
```
