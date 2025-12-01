import React, { useState } from 'react';
import { Button, Space } from '@arco-design/web-react';
import RefreshButton from '../index';

const BasicDemo: React.FC = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <Space>
        <RefreshButton loading={loading} />
        <Button type="text" onClick={() => setLoading((s) => !s)}>
          loading:{String(loading)}
        </Button>
      </Space>
    </div>
  );
};

export default BasicDemo;
