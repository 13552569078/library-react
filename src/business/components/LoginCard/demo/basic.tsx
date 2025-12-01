import React from 'react';
import { Space } from '@arco-design/web-react';
import LoginCard from '../index';

const BasicDemo: React.FC = () => {
  return (
    <LoginCard
      title="AI平台"
      login={async (info) => {
        return { statusCode: 0 };
      }}
      targetUrl={'/'}
      go={(url) => {}}
    />
  );
};

export default BasicDemo;
