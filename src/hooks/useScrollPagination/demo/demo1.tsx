import React, { useRef } from 'react';
import { useScrollPagination } from '..';
import { getId } from '../../../utils';
import { Select, Space } from '@arco-design/web-react';

export default () => {
  const count = useRef(0);
  const getNoteBookList = async (params: any) => {
    console.log('getNoteBookList', params);
    return new Promise<any>((resolve) =>
      setTimeout(() => {
        const result = Array(10)
          .fill(0)
          .map(() => ({ name: 'name' + count.current++, id: getId() }));
        resolve({
          data: {
            result,
            totalCount: 100,
          },
        });
      }, 1000),
    );
  };

  const getNoteBookList2 = async (params: any) => {
    console.log('getNoteBookList2', params);
    return new Promise<any>((resolve) =>
      setTimeout(() => {
        const result = Array(10)
          .fill(0)
          .map(() => ({ label: 'label' + count.current++, value: getId() }));
        resolve({
          data: {
            result,
            totalCount: 100,
          },
        });
      }, 1000),
    );
  };

  const {
    options: notebookOptions,
    loading,
    onPopupScroll,
  } = useScrollPagination({
    pageSize: 10,
    fetchData: getNoteBookList,
    mapToOption: (item: any) => ({
      label: item?.name,
      value: item?.id,
      original: item, // 保存原始数据
    }),
    extraParams: {
      status: 'Running',
    },
  });

  const {
    options: notebookOptions2,
    loading: loading2,
    onPopupScroll: onPopupScroll2,
  } = useScrollPagination({
    pageSize: 10,
    fetchData: getNoteBookList2,
  });

  return (
    <Space>
      <Select placeholder="请选择Notebook任务" loading={loading} onPopupScroll={onPopupScroll}>
        {notebookOptions.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
      <Select placeholder="请选择Notebook任务2" loading={loading2} onPopupScroll={onPopupScroll2}>
        {notebookOptions2.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
    </Space>
  );
};
