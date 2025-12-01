import { Select, SelectProps } from '@arco-design/web-react';
import React, { ReactElement } from 'react';
import RefreshButton from '../RefreshButton';
import './index.scss';

export interface SelectWithRefreshProps extends SelectProps {
  onRefresh?: () => void;
  showRefresh?: boolean;
  wrapperClassName?: string;
}

export const filterOption: SelectWithRefreshProps['filterOption'] = (inputValue, option) =>
  option.props.children?.toLowerCase()?.includes(inputValue.toLowerCase());

export default function SelectWithRefresh({
  onRefresh,
  wrapperClassName,
  showRefresh = true,
  loading,
  disabled,
  ...rest
}: SelectWithRefreshProps): ReactElement {
  return (
    <div className={`aa-select-with-refresh ${wrapperClassName ?? ''}`}>
      <Select filterOption={filterOption} disabled={loading || disabled} {...rest} />
      {showRefresh && onRefresh ? (
        <RefreshButton loading={loading} disabled={disabled} onClick={onRefresh} />
      ) : null}
    </div>
  );
}
