import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { isRequestSuccess } from '../../utils';
import { ExternalApi, UserInfoStore } from './types';

export function createUserInfoStore(apis: ExternalApi) {
  return create<UserInfoStore>()(
    devtools(
      (set, get) => ({
        // 初始状态
        userInfo: null,
        isLoading: false,
        error: null,
        isInitialized: false,

        // 获取用户信息
        fetchUserInfo: async () => {
          const { isLoading } = get();

          // 如果正在加载中，避免重复请求
          if (isLoading) {
            return;
          }

          try {
            set({ isLoading: true, error: null });

            const response = await apis.getUser();
            console.log(response, 'response.data');

            if (isRequestSuccess(response)) {
              set({
                userInfo: response.data,
                isLoading: false,
                error: null,
                isInitialized: true,
              });
              console.log('User info fetched successfully:', response.data);
            } else {
              // 当 success 为 false 时，记录错误信息
              // 权限相关的跳转已经在请求拦截器中统一处理
              const errorMessage = response.message || '获取用户信息失败';
              set({
                isLoading: false,
                error: errorMessage,
                isInitialized: true,
              });
              console.warn('Failed to fetch user info:', errorMessage);
            }
          } catch (error) {
            console.error('Failed to fetch user info:', error);
            const errorMessage = error instanceof Error ? error.message : '获取用户信息失败';

            set({
              isLoading: false,
              error: errorMessage,
              isInitialized: true,
            });

            // 权限相关的错误处理已经在请求拦截器中统一处理
            // 这里只需要记录错误状态
          }
        },

        // 更新用户信息
        updateUserInfo: (newUserInfo) => {
          const currentUserInfo = get().userInfo;
          set({
            userInfo: currentUserInfo ? { ...currentUserInfo, ...newUserInfo } : newUserInfo,
          });
          console.log('User info updated:', newUserInfo);
        },

        projectList: null,
        // 获取项目列表
        fetchProjectList: async () => {
          const { userInfo } = get();
          if (!userInfo || !userInfo?.organization?.id) return;
          try {
            const response = await apis.getProjOrg?.({
              organizationId: userInfo.organization?.id,
            });

            console.log(response, 'response.data');
            if (isRequestSuccess(response)) {
              set({
                projectList: response.data,
              });
              console.log('User info fetched successfully:', response.data);
            }
          } catch (error) {
            console.error('Failed to fetch project list:', error);
          }
        },

        projectId: [],
        setProjectId: (projectId) => {
          set({ projectId });
        },

        orgId: '',
        setOrgId: (orgId) => {
          set({ orgId });
        },

        // 用户权限点
        userActions: {
          isAdmin: false,
          actions: null,
        },
        setUserActions: (params) => {
          set({ userActions: params });
        },

        // 用户菜单
        userMenus: [],
        setUserMenus: (menus) => {
          set({ userMenus: menus });
        },

        // 设置加载状态
        setLoading: (loading) => {
          set({ isLoading: loading });
        },

        // 设置错误信息
        setError: (error) => {
          set({ error });
        },

        // 清除用户信息
        clearUserInfo: () => {
          set({
            userInfo: null,
            isLoading: false,
            error: null,
            isInitialized: false,
          });
          console.log('User info cleared');
        },

        // 重置初始化状态
        resetInitialized: () => {
          set({ isInitialized: false });
        },
      }),
      {
        name: 'user-info-store', // devtools 中显示的名称
      },
    ),
  );
}
