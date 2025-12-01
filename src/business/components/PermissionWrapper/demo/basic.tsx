import React, { useEffect } from 'react';
import { Button, Divider, Space } from '@arco-design/web-react';
import { initUserInfoStore, useUserInfoStore } from '../../../store';
import PermissionWrapper from '../index';

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
});

const BasicDemo: React.FC = () => {
  const { setUserActions } = useUserInfoStore();

  useEffect(() => {
    setUserActions({ isAdmin: false, actions: ['can_edit', 'can_add'] });
  }, []);

  return (
    <div>
      <Space>
        <PermissionWrapper permission="can_add">
          <Button type="primary">添加</Button>
        </PermissionWrapper>
        <PermissionWrapper permission="can_edit">
          <Button type="primary">编辑</Button>
        </PermissionWrapper>
        <PermissionWrapper permission="can_delete">
          <Button type="primary">删除</Button>
        </PermissionWrapper>
      </Space>
      <Divider />
      <Space>
        <PermissionWrapper permission="can_delete" disableWhenNoPermission>
          <Button type="primary">删除</Button>
        </PermissionWrapper>
        <PermissionWrapper
          permission="can_delete"
          fallback={<Button disabled>删除用户（无权限）</Button>}
        >
          <Button>删除用户</Button>
        </PermissionWrapper>
      </Space>
      <Divider />
      <Space direction="vertical">
        {/* 需要多个权限 */}
        <PermissionWrapper permission={['can_add', 'can_edit']}>
          <Button>添加并编辑用户</Button>
        </PermissionWrapper>

        {/* 满足任意一个权限即可 */}
        <PermissionWrapper anyPermission={['can_add', 'can_delete']}>
          <Button>管理用户</Button>
        </PermissionWrapper>

        {/* 组合使用：需要基础权限 + 任意一个高级权限 */}
        <PermissionWrapper permission="can_add" anyPermission={['can_delete', 'can_edit']}>
          <Button>高级操作</Button>
        </PermissionWrapper>
      </Space>
    </div>
  );
};

export default BasicDemo;
