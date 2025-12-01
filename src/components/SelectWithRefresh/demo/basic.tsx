import React from 'react';
import { Divider, Space } from '@arco-design/web-react';
import SelectWithRefresh from '../index';
import { useLoading } from '../../../hooks';

const BasicDemo: React.FC = () => {
  const refresh = async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  };

  const { loading, wrapperHandler: refreshWrapper } = useLoading(refresh);
  return (
    <div>
      <Space direction="vertical">
        <SelectWithRefresh
          placeholder="请选择训练任务"
          options={[
            { value: '任务1', label: '任务1' },
            { value: '任务2', label: '任务2' },
            { value: '任务3', label: '任务3' },
            { value: '任务4', label: '任务4' },
          ]}
          onRefresh={refreshWrapper}
          loading={loading}
        />

        <SelectWithRefresh
          placeholder="请选择训练任务"
          options={[]}
          onRefresh={refreshWrapper}
          disabled
        />
        <SelectWithRefresh
          placeholder="请选择训练任务"
          options={[]}
          onRefresh={refreshWrapper}
          showRefresh={false}
        />
      </Space>
      <Divider />
      <Space>
        <SelectWithRefresh
          placeholder="请选择训练任务"
          options={[]}
          onRefresh={refreshWrapper}
          style={{ width: '400px' }}
          loading={loading}
        />
      </Space>
    </div>
  );
};

export default BasicDemo;
