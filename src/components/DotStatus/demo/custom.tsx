import React from 'react';
import DotStatus from '../index';
import { Divider, Space } from '@arco-design/web-react';

const BasicDemo: React.FC = () => {
  return (
    <div>
      <Space>
        <DotStatus text="发布啦" color="red" />
        <DotStatus text="搞定啦" color="rgba(0,0,0,.5)" />
        <DotStatus text="搞定啦" color="green" showText={false} />
      </Space>
    </div>
  );
};

export default BasicDemo;
