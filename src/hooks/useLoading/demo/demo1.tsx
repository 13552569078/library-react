import React from 'react';
import { useLoading } from '..';
import { RefreshButton } from '../../../components';
import { Space } from '@arco-design/web-react';
import { Button } from 'antd';

export default () => {
  const handler = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  const { loading, wrapperHandler } = useLoading(handler);

  return (
    <Space>
      <RefreshButton loading={loading} />
      <Button onClick={wrapperHandler}>Click</Button>
    </Space>
  );
};
