import React from 'react';
import { Space } from '@arco-design/web-react';
import RefreshLink from '../index';

const BasicDemo: React.FC = () => {
  return (
    <div>
      <Space>
        <RefreshLink />
        <RefreshLink disabled />
      </Space>
    </div>
  );
};

export default BasicDemo;
