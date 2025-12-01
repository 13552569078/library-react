import React from 'react';
import { Space } from '@arco-design/web-react';
import OperationMenu, { ActionItem } from '../index';

const BasicDemo: React.FC = () => {
  const actions: ActionItem[] = [
    {
      name: '详情',
      priority: 1,
    },
    {
      name: '终止',
      priority: 2,
      disabled: true,
      tips: '禁止访问',
    },
    {
      name: '发布模型',
      priority: 3,
    },
    {
      name: '可视化',
      priority: 4,
    },
    {
      name: '复制',
      priority: 5,
      disabled: true,
      tips: '禁止复制',
    },
    {
      name: '删除',
      priority: 6,
    },
  ];
  return (
    <div>
      <Space direction="vertical">
        <OperationMenu actions={actions} />
      </Space>
    </div>
  );
};

export default BasicDemo;
