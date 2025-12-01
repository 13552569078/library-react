import React from 'react';
import { Space } from '@arco-design/web-react';
import CopyItemIcon from '../index';

const BasicDemo: React.FC = () => {
  return (
    <div>
      <Space>
        <CopyItemIcon value="https://arco.design" />
      </Space>
    </div>
  );
};

export default BasicDemo;
