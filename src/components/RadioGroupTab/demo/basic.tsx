import React from 'react';
import { Space } from '@arco-design/web-react';
import RadioGroupTab from '../index';

const BasicDemo: React.FC = () => {
  return (
    <div>
      <Space direction="vertical">
        <RadioGroupTab
          options={[
            { value: 'Public', label: '预置镜像' },
            { value: 'Custom', label: '我的镜像' },
            { value: 'Custom2', label: '自定义镜像' },
          ]}
        />
        <RadioGroupTab
          options={[
            { value: 'Public', label: '预置镜像' },
            { value: 'Custom', label: '我的镜像', disabled: true },
          ]}
        />
        <RadioGroupTab
          disabled
          options={[
            { value: 'Public', label: '预置镜像' },
            { value: 'Custom', label: '我的镜像' },
          ]}
        />
      </Space>
    </div>
  );
};

export default BasicDemo;
