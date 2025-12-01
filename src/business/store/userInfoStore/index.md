---
title: useUserInfoStore 用户信息
group:
  title: zustand store
  path: /businesses
  order: 5
---

# useUserInfoStore 用户信息

平台统一 Zustand 用户信息。

```warning
由于store依赖于外部API，所以一定要在首页渲染前，调用 `initUserInfoStore` 初始化此store！！！
```

## 代码演示

### 基础用法

<code src="./demo/basic.tsx"></code>

## API

### useUserInfoStore

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| initUserInfoStore | 初始化 store | `(apis: ExternalApi) => { <U>(selector: (state: UserInfoStore) => U): U; }` | - |
| useUserInfoStore | 用户信息 store | `UserInfoStore` | - |
| useUserInfo | 用户信息 | `() => UserInfo \| null` | - |
| useUserProjectList | 项目列表 | `ProjectItem[] \| null` | - |
| useUserLoading | 用户信息加载状态 | ` () => boolean` | - |
| useUserError | 错误信息 | ` () => string \| null` | - |
| useUserInitialized | 是否已经初始化过 | ` () => boolean` | - |
| useUserPermissions | 用户权限信息 | ` () => {isAdmin: boolean;actions: string[] \| null;}` | - |
| useHasAnyPermission | 是否有任意权限 | ` (permissions: string[]) => boolean` | - |
| useHasPermission | 是否有权限 | ` (permission: string \| string[]) => boolean` | - |
| useUserId | 获取用户 Id | ` () => string \| null` | - |
| useUserOrganization | 获取用户组织 | ` () => UserInfo['organization']` | - |
| useUserOrganizationId | 获取组织 Id | ` () => string \| null` | - |
| useSuperAdmin | 用户是否是超级管理员 | ` () => boolean` | - |
| useOrganizationAdmin | 用户是否是组织管理员 | ` () => boolean` | - |
| useProjectAdmin | 用户是否是项目管理员 | ` () => boolean` | - |
| useIsOnlyProjectAdmin | 用户是否仅仅是超级管理员 | ` () => boolean` | - |
| useIsSelf | 操作的用户是否是当前登录用户 | `(userId: string) => boolean` | - |

### UserInfoStore 数据类型

```ts
export interface UserInfoState {
  userInfo: UserInfo | null;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean; // 标记是否已经初始化过
  projectList: null | ProjectItem[]; // 项目列表，根据实际 API 返回的类型定义
  projectId: string[]; // 当前项目 ID，根据实际需求定义
  orgId: string; // 当前组织 ID，根据实际需求定义
  userMenus: any[];
  userActions: {
    isAdmin: boolean;
    actions: string[] | null;
  }; // 用户权限点数组，根据实际 API 返回的类型定义
}

// Store 操作类型定义
export interface UserInfoActions {
  // 获取用户信息
  fetchUserInfo: () => Promise<void>;
  // 更新用户信息
  updateUserInfo: (userInfo: Partial<UserInfo>) => void;
  // 获取项目列表
  fetchProjectList: () => Promise<void>;
  // 获取用户权限点
  setUserActions: (params: { isAdmin: boolean; actions: string[] | null }) => void;
  setUserMenus: (menus: any[]) => void;
  setProjectId: (projectId: string[]) => void;
  setOrgId: (orgId: string) => void;
  // 设置加载状态
  setLoading: (loading: boolean) => void;
  // 设置错误信息
  setError: (error: string | null) => void;
  // 清除用户信息（登出时使用）
  clearUserInfo: () => void;
  // 重置初始化状态
  resetInitialized: () => void;
}

// 合并状态和操作的类型
export type UserInfoStore = UserInfoState & UserInfoActions;
```

### ExternalApi 数据类型

```ts
export type ExternalApi = {
  // 获取项目信息
  getProjOrg?: (params: Record<string, any>) => Promise<any>;
  // 获取用户权限
  getUser: () => Promise<any>;
};
```
