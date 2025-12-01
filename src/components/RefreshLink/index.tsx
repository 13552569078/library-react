import React from 'react';
import { Link, LinkProps } from '@arco-design/web-react';
import { IconRefresh } from '@arco-design/web-react/icon';
import './index.scss';

export type RefreshLinkProps = {
  onRefresh?: () => void;
  loading?: boolean;
} & LinkProps;

const RefreshLink: React.FC<RefreshLinkProps> = ({ onRefresh, loading = false, ...rest }) => {
  return (
    <Link
      onClick={onRefresh}
      className="aa-refresh-link"
      icon={<IconRefresh className="" spin={rest.disabled ? false : loading} />}
      {...rest}
    >
      刷新
    </Link>
  );
};

export default RefreshLink;
