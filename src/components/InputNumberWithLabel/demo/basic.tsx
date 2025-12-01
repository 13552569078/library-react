import React from 'react';
import { Space } from '@arco-design/web-react';
import InputNumberWithLabel from '../index';

const BasicDemo: React.FC = () => {
  return (
    <div>
      <Space direction="vertical">
        <InputNumberWithLabel
          placeholder="请输入"
          min={1}
          max={300}
          style={{ width: 160 }}
          label="当前最大支持300秒"
        />
        <InputNumberWithLabel
          placeholder="请输入"
          min={1}
          max={300}
          style={{ width: 160 }}
          loading
          label="当前最大支持300秒"
        />
      </Space>
    </div>
  );
};

export default BasicDemo;
