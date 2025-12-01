import { ProjectItem, UserInfo } from '../../types';

export let useUserInfo: () => UserInfo | null;
export let useUserId: () => string | null;
export let useUserProjectList: () => ProjectItem[] | null;
export let useUserLoading: () => boolean;
export let useUserInitialized: () => boolean;
export let useUserError: () => string | null;
export let useUserPermissions: () => {
  isAdmin: boolean;
  actions: string[] | null;
};
export let useHasAnyPermission: (permissions: string[]) => boolean;
export let useHasPermission: (permission: string | string[]) => boolean;

export let useUserOrganization: () => UserInfo['organization'];
export let useUserOrganizationId: () => string | null;
export let useSuperAdmin: () => boolean;
export let useOrganizationAdmin: () => boolean;
export let useProjectAdmin: () => boolean;
export let useIsOnlyProjectAdmin: () => boolean;
export let useIsSelf: (userId: string) => boolean;

export function initUserHooks(hooks: any) {
  useUserInfo = hooks.useUserInfo;
  useUserId = hooks.useUserId;
  useUserProjectList = hooks.useUserProjectList;
  useUserLoading = hooks.useUserLoading;
  useUserError = hooks.useUserError;
  useUserInitialized = hooks.useUserInitialized;
  useUserPermissions = hooks.useUserPermissions;
  useHasAnyPermission = hooks.useHasAnyPermission;
  useHasPermission = hooks.useHasPermission;
  useUserOrganization = hooks.useUserOrganization;
  useUserOrganizationId = hooks.useUserOrganizationId;
  useSuperAdmin = hooks.useSuperAdmin;
  useOrganizationAdmin = hooks.useOrganizationAdmin;
  useProjectAdmin = hooks.useProjectAdmin;
  useIsOnlyProjectAdmin = hooks.useIsOnlyProjectAdmin;
  useIsSelf = hooks.useIsSelf;
}
