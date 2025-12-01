---
title: UserDropdown 用户菜单
group:
  title: 组件
  path: /businesses
  order: 1
---

# UserDropdown 用户下拉菜单信息

平台统一用户下拉菜单信息。

## 代码演示

### 基础用法

<code src="./demo/basic.tsx"></code>

## API

### UserDropdown

| 参数            | 说明         | 类型                  | 默认值 |
| --------------- | ------------ | --------------------- | ------ |
| userInfo        | 用户信息     | `Record<string, any>` | -      |
| logout          | 退出菜单回调 | `() => void`          | -      |
| accountCallback | 账号菜单回调 | `() => void`          | -      |

### userInfo 数据类型

```ts
const userInfo = {
  id: 'user-gqsss21nu',
  name: '管理员',
  account: 'admin',
  phone: '15xxxxx99367',
  description: '',
  position: '',
  organization: {
    id: '',
    name: '',
    description: '',
    fullOrgPath: '',
  },
  status: 'active',
  createdAt: '2025-08-29T16:25:43.438+08:00',
  roles: [
    {
      subjectRoleId: '',
      id: 'role-zx6x62g6',
      name: '超级管理员',
      description: '',
      scope: 'global',
      builtin: true,
      admin: true,
      organizationId: '',
      organizations: null,
      projects: null,
      createdBy: '',
      createdByName: '',
      createdAt: '0001-01-01T00:00:00Z',
    },
  ],
};
```
