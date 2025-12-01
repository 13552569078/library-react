import React from 'react';
import { IconNoData } from '../../icons';
import { ButtonProps } from '@arco-design/web-react';
import NoCard from './NoCard';

export interface NoDataCardProps {
  title?: string;
  desc?: string;
  primaryBtnProps?: ButtonProps & { text: string };
  primaryBtn?: React.ReactNode;
  secondaryBtnProps?: ButtonProps & { text: string };
  secondaryBtn?: React.ReactNode;
}

const NoDataCard: React.FC<NoDataCardProps> = ({ title = '暂无数据', ...rest }) => {
  return (
    <NoCard className="aa-no-data-card" icon={<IconNoData size={124} />} title={title} {...rest} />
  );
};

export default NoDataCard;
