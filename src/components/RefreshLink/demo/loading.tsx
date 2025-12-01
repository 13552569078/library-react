import React, { useState } from 'react';
import { Button, Space } from '@arco-design/web-react';
import RefreshLink from '../index';

const BasicDemo: React.FC = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <Space>
        <RefreshLink loading={loading} />
        <Button type="text" onClick={() => setLoading((s) => !s)}>
          loading:{String(loading)}
        </Button>
      </Space>
    </div>
  );
};

export default BasicDemo;
