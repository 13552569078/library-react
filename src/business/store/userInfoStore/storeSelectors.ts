import type { UserInfoStore } from './types';

export function createUserSelectors(useUserInfoStore: {
  <U>(selector: (state: UserInfoStore) => U): U;
}) {
  const useUserInfo = () => useUserInfoStore((state) => state.userInfo);
  const useUserId = () => useUserInfoStore((state) => state.userInfo?.id);
  const useUserProjectList = () => useUserInfoStore((state) => state.projectList);
  const useUserLoading = () => useUserInfoStore((state) => state.isLoading);
  const useUserError = () => useUserInfoStore((state) => state.error);
  const useUserInitialized = () => useUserInfoStore((state) => state.isInitialized);

  // 权限相关的 hooks
  const useUserPermissions = () => useUserInfoStore((state) => state.userActions);

  /**
   * 检查用户是否有指定权限的 hook
   * @param permission 权限标识符
   * @returns 是否有权限
   */
  const useHasPermission = (permission: string | string[]) => {
    const userPermissions = useUserPermissions();
    const { isAdmin, actions } = userPermissions;

    if (isAdmin) return true; // 管理员拥有所有权限，直接返回 true
    if (Array.isArray(permission)) {
      // 如果传入的是权限数组，检查是否拥有所有权限
      return permission.every((perm) => actions && actions.includes(perm));
    }

    return actions?.includes(permission) || false;
  };

  /**
   * 检查用户是否有任意一个权限的 hook
   * @param permissions 权限标识符数组
   * @returns 是否有任意一个权限
   */
  const useHasAnyPermission = (permissions: string[]) => {
    const userPermissions = useUserPermissions();
    const { isAdmin, actions } = userPermissions;
    if (isAdmin) return true; // 管理员拥有所有权限，直接返回 true
    return permissions.some((perm) => actions && actions.includes(perm));
  };

  const useUserOrganization = () => useUserInfoStore((state) => state.userInfo?.organization);
  const useUserOrganizationId = () => useUserInfoStore((state) => state.userInfo?.organization?.id);
  const useSuperAdmin = () =>
    useUserInfoStore((state) =>
      state.userInfo?.roles?.some((role) => role.scope === 'global' && role.admin),
    );
  const useOrganizationAdmin = () =>
    useUserInfoStore((state) =>
      state.userInfo?.roles?.some((role) => role.scope === 'organization' && role.admin),
    );
  const useProjectAdmin = () =>
    useUserInfoStore((state) =>
      state.userInfo?.roles?.some((role) => role.scope === 'project' && role.admin),
    );
  const useIsOnlyProjectAdmin = () =>
    useUserInfoStore(
      (state) =>
        state.userInfo?.roles?.some((role) => role.scope === 'project' && role.admin) &&
        !state.userInfo?.roles?.some(
          (role) => (role.scope === 'organization' || role.scope === 'global') && role.admin,
        ),
    );

  const useIsSelf = (userId: string) => useUserInfoStore((state) => state.userInfo?.id === userId);

  return {
    useUserInfo,
    useUserId,
    useUserOrganization,
    useUserOrganizationId,
    useSuperAdmin,
    useOrganizationAdmin,
    useIsOnlyProjectAdmin,
    useProjectAdmin,
    useIsSelf,
    useUserProjectList,
    useUserLoading,
    useUserInitialized,
    useUserError,
    useUserPermissions,
    useHasAnyPermission,
    useHasPermission,
  };
}
