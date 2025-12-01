import React from 'react';
import { IconNoPermission } from '../../icons';
import { ButtonProps } from '@arco-design/web-react';
import NoCard from './NoCard';

export interface NoPermissionCardProps {
  title?: string;
  desc?: string;
  primaryBtnProps?: ButtonProps & { text: string };
  primaryBtn?: React.ReactNode;
  secondaryBtnProps?: ButtonProps & { text: string };
  secondaryBtn?: React.ReactNode;
}

const NoDataCard: React.FC<NoPermissionCardProps> = ({ title = '暂无权限', ...rest }) => {
  return (
    <NoCard
      className="aa-no-permission-card"
      icon={<IconNoPermission size={124} />}
      title={title}
      {...rest}
    />
  );
};

export default NoDataCard;
