---
title: funcs 工具函数
group:
  title: utils
  path: /businesses
  order: 18
---

# funcs 工具函数

## 特性

- **getLocalProjectId**: 获取本地存储的项目 Id

## API

```typescript
export function getLocalProjectId(userId: string): {
  projectId: string | undefined;
  orgId: string | undefined;
};
```
