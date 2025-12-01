---
title: usePermission 鉴权
group:
  title: hooks
  path: /businesses
  order: 10
---

# usePermission 鉴权

封装的鉴权工具，依赖于组件库中的 zustand store: `userInfoStore`以及获取权限 API。

## 代码演示

```ts
const {
  userPermissions,
  setUserPermissions,
  hasPermission,
  hasAnyPermission,
  getPermissionProps,
  createPermissionFilter
} = usePermission(
  { ResourcePermissionActions }:
    { ResourcePermissionActions: (params: Record<string, any>) => Promise<{ statusCode: number; data: any }>}
);
```

## API

#### 1. `userPermissions` 返回用户权限信息，数据格式为：

```ts
{
  isAdmin: boolean;
  actions: string[] | null;
}
```

#### 2. `setUserPermissions` 调用 ResourcePermissionActions 接口设置用户权限，接口定义为：

```ts
const setUserPermissions = async (projectId: string, platforms = ['aisocket']): void
```

#### 3. `hasPermission` 是否有所需的所有权限，接口定义为：

```ts
const hasPermission = (permission: string | string[]): boolean
```

#### 4. `hasAnyPermission` 是否有任意权限，接口定义为：

```ts
const hasAnyPermission = (permissions: string[]): boolean
```

#### 5. `getPermissionProps` 检查权限并返回相应的组件属性，用于动态设置组件的 disabled、className 等属性，接口定义为：

```ts
const getPermissionProps = (
  permission: string | string[],
  options: {
    disableWhenNoPermission?: boolean;
    noPermissionClassName?: string;
    noPermissionStyle?: React.CSSProperties;
  } = {}
): Record<string, any>
```

#### 6. `createPermissionFilter` 创建权限过滤器函数，用于过滤数组中的项目，主要用于过滤左侧菜单，接口定义为：

```ts
const createPermissionFilter = <
  T extends {
    children?: T[];
    permission?: string;
    external?: boolean;
  }
>(
  items: T[]
): T[]
```
