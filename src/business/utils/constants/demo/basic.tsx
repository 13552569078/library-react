import React from 'react';
import { Divider, Space } from '@arco-design/web-react';
import { LoginLogoBase64Png, HeaderLogoBase64Png } from '../index';

const BasicDemo: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#efefef', padding: 20 }}>
      <Space direction="vertical">
        <img src={LoginLogoBase64Png} />
        <Divider />
        <img src={HeaderLogoBase64Png} />
      </Space>
    </div>
  );
};

export default BasicDemo;
