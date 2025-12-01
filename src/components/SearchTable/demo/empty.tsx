import React from 'react';
import SearchTable from '../index';
import AddButton from '../../AddButton';

const BasicDemo: React.FC = () => {
  const columns = [
    {
      title: '任务名称',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: '任务状态',
      dataIndex: 'status',
      width: 100,
    },
    {
      title: '任务描述',
      dataIndex: 'description',
      width: 200,
    },
    {
      title: '创建时间',
    },
  ];
  const tableProps = {
    data: [],
    loading: false,
    pagination: {
      sizeOptions: [20, 50, 100],
      current: 1,
      pageSize: 10,
      total: 0,
      defaultPageSize: 20,
    },
  };

  const search = (text: string) => {
    console.log('searching', text);
  };

  return (
    <div style={{ height: 400 }}>
      <SearchTable
        noDataTitle="暂无训练任务"
        noDataDesc="您可以创建任务，或者xxxx"
        addButton={<AddButton>创建任务</AddButton>}
        tableProps={{
          columns,
          ...tableProps,
        }}
        search={search}
        refresh={() => {
          console.log('refresh');
        }}
      />
    </div>
  );
};

export default BasicDemo;
