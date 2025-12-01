import React from 'react';
import { Divider, Space } from '@arco-design/web-react';
import { NoDataCard, NoFileCard, NoPermissionCard } from '../index';

const BasicDemo: React.FC = () => {
  return (
    <div>
      <Space>
        <NoDataCard
          desc="暂无数据源"
          primaryBtnProps={{ text: '创建数据源' }}
          secondaryBtnProps={{ text: '创建数据源' }}
        />
        <NoDataCard desc="暂无数据源" primaryBtnProps={{ text: '创建数据源' }} />
        <NoDataCard title="找不到数据" desc="暂无数据源" />
      </Space>
      <Divider />
      <Space>
        <NoFileCard
          desc="没有搜索到文件"
          primaryBtnProps={{ text: '创建文件' }}
          secondaryBtnProps={{ text: '导入文件' }}
        />
        <NoFileCard />
      </Space>
      <Divider />
      <Space>
        <NoPermissionCard desc="请联系管理员添加权限" />
      </Space>
    </div>
  );
};

export default BasicDemo;
