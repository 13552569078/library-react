import { useCallback } from 'react';
import { useUserPermissions, useUserInfoStore } from '../../store';
import { isRequestSuccess } from '../../utils';
import { isWujie } from '../../../utils';

/**
 * 权限相关的 hooks 集合
 */
export const usePermission = ({
  ResourcePermissionActions,
}: {
  ResourcePermissionActions: (
    params: Record<string, any>,
  ) => Promise<{ statusCode: number; data: any }>;
}) => {
  const { setUserActions } = useUserInfoStore();
  const userPermissions = useUserPermissions();
  const { isAdmin, actions } = userPermissions;

  /**
   * 检查是否有指定权限
   */
  const hasPermission = useCallback(
    (permission: string | string[]) => {
      if (isAdmin) return true;
      if (Array.isArray(permission)) {
        return permission.every((perm) => actions && actions.includes(perm));
      }
      return actions && actions.includes(permission);
    },
    [userPermissions],
  );

  /**
   * 检查是否有指定权限
   */
  const hasMenuPermission = useCallback(
    (permission: string | string[]) => {
      if (isAdmin) return true;
      if (Array.isArray(permission)) {
        return permission.every((perm) => actions && actions.includes(perm));
      }
      return (
        actions &&
        (actions.includes(permission) || actions.some((item) => item.startsWith(permission)))
      );
    },
    [userPermissions],
  );

  /**
   * 检查是否有任意一个权限
   */
  const hasAnyPermission = useCallback(
    (permissions: string[]) => {
      if (isAdmin) return true;
      return permissions.some((perm) => actions && actions.includes(perm));
    },
    [userPermissions],
  );

  /**
   * 检查权限并返回相应的组件属性
   * 用于动态设置组件的 disabled、className 等属性
   */
  const getPermissionProps = useCallback(
    (
      permission: string | string[],
      options: {
        disableWhenNoPermission?: boolean;
        noPermissionClassName?: string;
        noPermissionStyle?: React.CSSProperties;
      } = {},
    ) => {
      const hasAccess = hasPermission(permission);

      if (hasAccess) {
        return {};
      }

      const props: any = {};

      if (options.disableWhenNoPermission) {
        props.disabled = true;
        props.style = {
          opacity: 0.5,
          cursor: 'not-allowed',
          ...options.noPermissionStyle,
        };
      }

      if (options.noPermissionClassName) {
        props.className = options.noPermissionClassName;
      }

      return props;
    },
    [hasPermission],
  );

  /**
   * 创建权限过滤器函数
   * 用于过滤数组中的项目
   */
  const createPermissionFilter = useCallback(
    <
      T extends {
        children?: T[];
        permission?: string;
        external?: boolean;
      },
    >(
      items: T[],
    ): T[] => {
      return items
        .filter((m) => (isWujie ? !m.external : true))
        .reduce<T[]>((result, item) => {
          // 如果是ItemGroup，递归处理其子项
          if (item.children) {
            const filteredChildren = createPermissionFilter(item.children);
            // 只有当子项不为空时，才保留这个ItemGroup
            if (filteredChildren.length > 0) {
              result.push({ ...item, children: filteredChildren });
            }
          }
          // 普通菜单项，检查是否有权限
          else if (!item.permission || hasMenuPermission(item.permission)) {
            result.push(item);
          }

          return result;
        }, [] as T[]);
    },
    [hasMenuPermission],
  );

  const setUserPermissions = async (projectId: string, platforms = ['aisocket']) => {
    console.log('setUserPermissions', projectId);
    try {
      const response = await ResourcePermissionActions({
        projectID: projectId,
        platforms,
      });

      if (isRequestSuccess(response)) {
        const { admin } = response.data;
        setUserActions({
          isAdmin: admin === true,
          actions: response.data.actions,
        });
      }
    } catch (error) {
      console.error('Failed to fetch project list:', error);
    }
  };

  return {
    userPermissions,
    setUserPermissions,
    hasPermission,
    hasAnyPermission,
    getPermissionProps,
    createPermissionFilter,
  };
};
