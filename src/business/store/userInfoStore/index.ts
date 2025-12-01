import { createUserInfoStore } from './createStore';
import { createUserSelectors } from './storeSelectors';
import { ExternalApi } from './types';
import {
  initUserHooks,
  useUserInfo,
  useUserProjectList,
  useUserLoading,
  useUserError,
  useUserInitialized,
  useUserPermissions,
  useHasAnyPermission,
  useHasPermission,
  useIsOnlyProjectAdmin,
  useIsSelf,
  useOrganizationAdmin,
  useProjectAdmin,
  useSuperAdmin,
  useUserId,
  useUserOrganization,
  useUserOrganizationId,
} from './userHooks';

let useUserInfoStore = null as unknown as ReturnType<typeof createUserInfoStore>;

export const initUserInfoStore = (apis: ExternalApi) => {
  if (useUserInfoStore) return useUserInfoStore;

  useUserInfoStore = createUserInfoStore(apis);
  const selectors = createUserSelectors(useUserInfoStore);

  initUserHooks(selectors);

  return useUserInfoStore;
};

export {
  useUserInfoStore,
  useUserInfo,
  useUserProjectList,
  useUserLoading,
  useUserError,
  useUserInitialized,
  useUserPermissions,
  useHasAnyPermission,
  useHasPermission,
  useIsOnlyProjectAdmin,
  useIsSelf,
  useOrganizationAdmin,
  useProjectAdmin,
  useSuperAdmin,
  useUserId,
  useUserOrganization,
  useUserOrganizationId,
};
