import React from 'react';
import { Space } from '@arco-design/web-react';
import ModelIcon from '../index';

const BasicDemo: React.FC = () => {
  return (
    <div>
      <Space>
        <ModelIcon type="ali" />
        <ModelIcon type="ds" size="24" />
        <ModelIcon type="meta" />
      </Space>
    </div>
  );
};

export default BasicDemo;
