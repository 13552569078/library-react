---
title: TS类型
group:
  title: types
  path: /businesses
  order: 20
---

### 用户信息类型定义

```ts
export interface UserInfo {
  account?: string;
  username?: string;
  phone?: string;
  created_at?: string;
  status: string;
  organization?: {
    description: string;
    fullOrgPath: string;
    id: string;
    name: string;
  };
  roles?: {
    admin: boolean;
    builtin: boolean;
    createdAt: string;
    createdBy: string;
    createdByName: string;
    description: string;
    id: string;
    name: string;
    organizationId: string;
    organizations: any[];
    projects: any[];
    scope: string;
    subjectRoleId: string;
  }[];
  perms?: string[]; // 用户权限数组
  // 可以根据实际 API 返回的字段进行扩展
  [key: string]: any;
}
```

### 项目定义

```ts
export interface ProjectItem {
  id: string;
  name: string;
  description?: string;
  organization: {
    id: string;
    name: string;
    fullOrgPath: string;
    description: string;
  };
}
```
