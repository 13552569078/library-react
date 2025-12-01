import React from 'react';
import { Space } from '@arco-design/web-react';
import Switcher from '../index';

const BasicDemo: React.FC = () => {
  return (
    <div>
      <Space direction="vertical">
        <Switcher defaultChecked />
      </Space>
    </div>
  );
};

export default BasicDemo;
