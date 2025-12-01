import React, { useMemo, useRef, useState } from 'react';
import { Input, PaginationProps, TableProps } from '@arco-design/web-react';
import { Table } from '@ccf2e/arco-material';
import { NoDataCard } from '../EmptyCard';
import { IconSearch } from '@arco-design/web-react/icon';
import useColumns from './useColumns';
import RefreshButton from '../RefreshButton';
import './index.scss';

export type SearchTableProps = {
  noDataTitle?: string;
  noDataDesc?: string;
  searchForm?: React.ReactNode;
  addButton?: React.ReactNode;
  tableProps: TableProps<any>;
  refresh?: () => void;
  search?: (text: string) => void;
  className?: string;
  style?: React.CSSProperties;
  searcherPlaceholder?: string;
};

const SearchTable: React.FC<SearchTableProps> = (props: SearchTableProps) => {
  const {
    noDataTitle,
    noDataDesc,
    searchForm,
    addButton,
    tableProps,
    refresh,
    search,
    searcherPlaceholder,
  } = props;
  const [isFiltering, setIsFiltering] = useState(false);
  const [searchText, setSearchText] = useState('');

  const tableRef = useRef<HTMLDivElement>(null);

  const isSearchingOrFiltering = useMemo(
    () => searchText || isFiltering,
    [searchText, isFiltering],
  );

  const { processedColumns: columns } = useColumns({
    columns: tableProps.columns!,
  });

  const onSearch = () => {
    search?.(searchText);
  };

  const handleTableChange = (
    pagination: PaginationProps,
    sorter: any,
    filters: any,
    extra: any,
  ) => {
    setIsFiltering(extra?.action === 'filter');
    props?.tableProps?.onChange?.(pagination, sorter, filters, extra);
  };

  return (
    <div className={`aa-search-table ${props?.className || ''}`} style={props?.style}>
      <div className="table-header">
        <div className="search-form">
          {searchForm ?? (
            <Input.Search
              placeholder={searcherPlaceholder || '请输入名称/ID搜索'}
              suffix={<IconSearch onClick={onSearch} className="icon-search cursor-pointer" />}
              maxLength={255}
              allowClear
              style={{ width: 220, height: 32 }}
              value={searchText}
              onChange={(v) => setSearchText(v)}
              onPressEnter={onSearch}
              onClear={onSearch}
              autoComplete="off"
            />
          )}
        </div>
        <div className="extra-action">
          {props.refresh ? (
            <RefreshButton
              onClick={refresh}
              loading={typeof tableProps.loading === 'boolean' ? tableProps.loading : false}
            />
          ) : null}
          {addButton}
        </div>
      </div>
      <div ref={tableRef} className="table-content-wrapper">
        <Table
          rowKey={tableProps.rowKey || 'id'}
          {...tableProps}
          onChange={handleTableChange}
          columns={columns}
          noDataElement={
            tableProps.loading ? null : (
              <NoDataCard
                title={isSearchingOrFiltering ? '暂无查询结果' : noDataTitle}
                desc={noDataDesc}
                primaryBtn={!isSearchingOrFiltering ? addButton : undefined}
              />
            )
          }
          scroll={{
            ...tableProps.scroll,
          }}
          className={`${tableProps.className || ''}`}
        />
      </div>
    </div>
  );
};

export default SearchTable;
