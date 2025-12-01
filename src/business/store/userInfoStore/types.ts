import { UserInfo, ProjectItem } from '../../types';

// Store 状态类型定义
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

export type ExternalApi = {
  // 获取项目信息
  getProjOrg?: (params?: Record<string, any>) => Promise<any>;
  // 获取用户权限
  getUser: (params?: any) => Promise<any>;
};
