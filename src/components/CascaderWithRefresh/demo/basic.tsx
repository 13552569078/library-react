import React from 'react';
import { Divider, Space } from '@arco-design/web-react';
import CascaderWithRefresh from '../index';
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
        <CascaderWithRefresh
          placeholder="请选择训练任务"
          options={[
            {
              value: '任务1',
              label: '任务1',
              children: [
                { value: '子任务11', label: '子任务11' },
                { value: '子任务12', label: '子任务12' },
              ],
            },
            {
              value: '任务2',
              label: '任务2',
              children: [
                { value: '子任务21', label: '子任务21' },
                { value: '子任务22', label: '子任务22' },
              ],
            },
            {
              value: '任务3',
              label: '任务3',
              children: [
                { value: '子任务31', label: '子任务31' },
                { value: '子任务32', label: '子任务32' },
              ],
            },
            {
              value: '任务4',
              label: '任务4',
              children: [
                { value: '子任务41', label: '子任务41' },
                { value: '子任务42', label: '子任务42' },
              ],
            },
          ]}
          dropdownMenuColumnStyle={{ width: '200px' }}
          onRefresh={refreshWrapper}
          loading={loading}
        />

        <CascaderWithRefresh
          placeholder="请选择训练任务"
          options={[]}
          dropdownMenuColumnStyle={{ width: '200px' }}
          onRefresh={refreshWrapper}
          disabled
        />
        <CascaderWithRefresh
          placeholder="请选择训练任务"
          options={[]}
          dropdownMenuColumnStyle={{ width: '200px' }}
          onRefresh={refreshWrapper}
          showRefresh={false}
        />
      </Space>
      <Divider />
      <Space>
        <CascaderWithRefresh
          placeholder="请选择训练任务"
          options={[]}
          dropdownMenuColumnStyle={{ width: '200px' }}
          onRefresh={refreshWrapper}
          style={{ width: '400px' }}
          loading={loading}
        />
      </Space>
    </div>
  );
};

export default BasicDemo;
