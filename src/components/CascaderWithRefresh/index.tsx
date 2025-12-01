import React from 'react';
import { Cascader, CascaderProps } from '@arco-design/web-react';
import classNames from 'classnames';
import RefreshButton from '../RefreshButton';
import './index.scss';

export interface CascaderWithRefreshProps extends CascaderProps {
  onRefresh?: (...args: any) => Promise<any>;
  showRefresh?: boolean;
  wrapperClassName?: string;
}

const CascaderWithRefresh: React.FC<CascaderWithRefreshProps> = (props) => {
  const {
    showRefresh = true,
    onRefresh,
    loading,
    disabled,
    wrapperClassName,
    ...restProps
  } = props;

  return (
    <div className={classNames('aa-cascader-with-refresh', wrapperClassName)}>
      <Cascader {...restProps} disabled={loading || disabled} />
      {showRefresh && onRefresh ? (
        <RefreshButton onClick={onRefresh} loading={loading} disabled={disabled} />
      ) : null}
    </div>
  );
};

export default React.memo(CascaderWithRefresh);
