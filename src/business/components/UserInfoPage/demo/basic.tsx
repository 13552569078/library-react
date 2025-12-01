import React from 'react';
import { Space } from '@arco-design/web-react';
import UserInfoPage from '../index';

const BasicDemo: React.FC = () => {
  const userInfo = {
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
        organizations: [],
        projects: [],
        createdBy: '',
        createdByName: '',
        createdAt: '0001-01-01T00:00:00Z',
      },
    ],
  };
  return (
    <div style={{ backgroundColor: 'white' }}>
      <UserInfoPage
        userInfo={userInfo}
        changePassword={async (p: Record<string, any>) => {
          return { statusCode: 0 };
        }}
        updateUser={async (p: Record<string, any>) => {
          return { statusCode: 0 };
        }}
        updateUserCallback={(p: Record<string, any>) => {}}
      />
    </div>
  );
};

export default BasicDemo;
