import React from 'react';
import { Button, Space } from '@arco-design/web-react';
import { showConfirm } from '../index';

const BasicDemo: React.FC = () => {
  const show = () => {
    showConfirm({
      title: '确定删除任务吗',
      content: '删除后无法恢复，请问是否继续？',
      onOk: async () => {},
      onCancel: () => {},
    });
  };

  return (
    <div>
      <Space>
        <Button onClick={show}>显示确认弹窗</Button>
      </Space>
    </div>
  );
};

export default BasicDemo;
