import React from 'react';
import { Divider, Space } from '@arco-design/web-react';
import {
  initUserInfoStore,
  useUserInfo,
  useUserInfoStore,
  useUserPermissions,
  useHasPermission,
} from '../index';
import { Button } from 'antd';

initUserInfoStore({
  getUser: () => {
    return Promise.resolve({
      statusCode: 0,
      data: {
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
      },
    });
  },
  getProjOrg(params) {
    return Promise.resolve({
      id: 'org-zx6x62g6',
      name: '组织1',
      description: '',
      scope: 'global',
      builtin: true,
      admin: true,
      projects: [
        {
          id: 'project-zx6x62g6',
          name: '项目1',
          description: '',
        },
      ],
    });
  },
});

const BasicDemo: React.FC = () => {
  const { fetchUserInfo, setUserActions, updateUserInfo } = useUserInfoStore();
  const userInfo = useUserInfo();
  const permissions = useUserPermissions();
  const hasEditPermission = useHasPermission('can_edit');
  const hasDelPermission = useHasPermission('can_delete');
  const hasAllPermission = useHasPermission(['can_edit', 'can_add']);

  return (
    <div>
      <Space direction="vertical">
        <div>用户信息: {JSON.stringify(userInfo)}</div>
        <div>用户权限: {JSON.stringify(permissions)}</div>
        <div>是否有edit权限: {JSON.stringify(hasEditPermission)}</div>
        <div>是否有delete权限: {JSON.stringify(hasDelPermission)}</div>
        <div>是否有edit和add权限: {JSON.stringify(hasAllPermission)}</div>
      </Space>
      <Divider />
      <Space>
        <Button type="primary" onClick={fetchUserInfo}>
          获取用户信息
        </Button>
        <Button type="primary" onClick={() => updateUserInfo({ name: '更新用户名' })}>
          更新用户信息
        </Button>
        <Button
          type="primary"
          onClick={() => setUserActions({ isAdmin: false, actions: ['can_edit', 'can_add'] })}
        >
          设置权限
        </Button>
      </Space>
    </div>
  );
};

export default BasicDemo;
