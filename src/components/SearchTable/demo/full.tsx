import React, { useEffect, useMemo, useState } from 'react';
import SearchTable from '../index';
import AddButton from '../../AddButton';
import OperationMenu, { ActionItem } from '../../OperationMenu';
import { getId } from '../../../utils';
import { use } from 'dumi';

const originData = [
  {
    name: '任务1',
    hasAccess: true,
    id: '1234567891',
    description:
      '任务描述1任务描述1任务描述1任务描述1任务描述1任务描述1任务描述1任务描述1任务描述1任务描述1任务描述1任务描述1',
    userID: 'admin',
    time: '2021-01-01 00:00:00',
  },
  {
    name: '任务12',
    hasAccess: true,
    id: '1234567892',
    description: '任务描述12',
    userID: 'admin',
    time: '2021-01-01 00:00:00',
  },
  {
    name: '任务13',
    id: '1234567893',
    description: '任务描述13',
    userID: 'admin1',
    time: '2021-01-01 00:00:00',
  },
  {
    name: '任务14',
    id: '1234567894',
    description: '任务描述14',
    userID: 'admin1',
    time: '2021-01-01 00:00:00',
  },
  {
    name: '任务15',
    id: '1234567895',
    description: '任务描述14',
    userID: 'admin2',
    time: '2021-01-01 00:00:00',
  },
  {
    name: '任务16',
    id: '1234567896',
    description: '任务描述15',
    userID: 'admin2',
    time: '2021-01-01 00:00:00',
  },
  {
    name: '任务17',
    id: '1234567897',
    description: '任务描述16',
    userID: 'admin2',
    time: '2021-01-01 00:00:00',
  },
  {
    name: '任务18',
    id: '1234567898',
    description: '任务描述17',
    userID: 'admin3',
    time: '2021-01-01 00:00:00',
  },
  {
    name: '任务19',
    id: '1234567899',
    description: '任务描述18',
    userID: 'admin4',
    time: '2021-01-01 00:00:00',
  },
  {
    name: '任务20',
    id: '12345678910',
    description: '任务描述19',
    userID: 'admin5',
    time: '2021-01-01 00:00:00',
  },
  // {
  //   name: '任务21',
  //   id: '12345678911',
  //   description: '任务描述13',
  //   userID: 'admin6',
  //   time: '2021-01-01 00:00:00',
  // },
  // {
  //   name: '任务22',
  //   id: '12345678912',
  //   description: '任务描述13',
  //   userID: 'admin7',
  //   time: '2021-01-01 00:00:00',
  // },
];

const BasicDemo: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const columns: any[] = [
    {
      width: 232,
      ellipsis: true,
      title: '任务名称',
      dataIndex: 'name',
      key: 'name',
      isLink: true,
      targetUrl: `/detail`,
      clickLink: (link: string) => {
        console.log('link', link);
      },
    },
    {
      width: 165,
      ellipsis: true,
      title: '任务ID',
      dataIndex: 'id',
      key: 'id',
      isCopy: true,
      sorter: (a: { id: string | any[] }, b: { id: string | any[] }) => a.id.length - b.id.length,
    },
    {
      title: '任务描述',
      dataIndex: 'description',
      width: 200,
    },
    {
      width: 130,
      ellipsis: true,
      title: '创建人',
      dataIndex: 'userID',
      key: 'userID',
      filters: [
        { text: 'admin', value: 'admin' },
        { text: 'admin2', value: 'admin2' },
        { text: 'admin3', value: 'admin3' },
      ],
      onFilter: (filteredValues: string, record: { userID: any }) => {
        if (filteredValues === 'all') return true;
        return record.userID === filteredValues;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'time',
    },
    {
      title: '创建时间2',
      dataIndex: 'time',
    },
    {
      title: '创建时间3',
      dataIndex: 'time',
    },
    {
      title: '创建时间4',
      dataIndex: 'time',
    },
    {
      width: 192,
      fixed: 'right',
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (value: any, record: { status: string }) => {
        const actions: ActionItem[] = [
          {
            name: '打开',
            priority: 1,
            tips: '运行中的任务可打开',
            onClick: () => {},
          },
          {
            name: '编辑',
            priority: 2,
            tips: '任务终止后可编辑',
            disabled: true,
            onClick: () => {},
          },
          {
            name: '保存镜像',
            priority: 3,
            tips: '运行中的任务可保存',
            disabled: record.status !== 'Running',
            onClick: () => {},
          },
          {
            name: '重新启动',
            priority: 4,
            onClick: () => {},
          },
          {
            name: '详情',
            priority: 6,
            onClick: () => {},
          },
          {
            name: '删除',
            priority: 7,
            tips: '任务终止后可删除',
            disabled: true,
            onClick: () => {},
          },
        ];

        return <OperationMenu actions={actions} />;
      },
    },
  ];
  const tableProps = useMemo(
    () => ({
      data,
      loading,
      pagination: {
        sizeOptions: [20, 50, 100],
        current: currentPage,
        pageSize: 10,
        total,
        defaultPageSize: 20,
      },
      scroll: {
        x: 1800,
      },
    }),
    [currentPage, loading, data, total],
  );

  const search = (text: string) => {
    if (!text) {
      loadData();
    } else {
      setData((data) => data.filter((item: any) => item.name.includes(text)));
      setTotal(50);
      setCurrentPage(1);
    }
  };

  const handleTableChange = (pagination: any, sorter: any, filters: any, extra: any) => {
    const params: Record<string, any> = {
      current: pagination.current,
      pageSize: pagination.pageSize,
    };

    if (filters && filters.status) {
      params.status = filters.status.join(',');
    }

    if (sorter) {
      const { field, direction } = sorter;
    }

    loadData();
    setCurrentPage(pagination.current);
  };

  const loadData = async () => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const d = JSON.parse(JSON.stringify(originData));
        d.forEach((item: any) => {
          item.id = getId();
        });
        setData(d);
        setLoading(false);
        setTotal(100);
        console.log('loadData', d, total, currentPage);
      }, 1500);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={{ height: 300 }}>
      <SearchTable
        noDataTitle="暂无训练任务"
        addButton={<AddButton>创建任务</AddButton>}
        tableProps={{
          columns,
          ...tableProps,
          onChange: handleTableChange,
        }}
        search={search}
        refresh={() => {
          loadData();
        }}
      />
    </div>
  );
};

export default BasicDemo;
