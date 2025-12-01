import React from 'react';
import { IconNoOther } from '../../icons';
import { ButtonProps } from '@arco-design/web-react';
import NoCard from './NoCard';

export interface NoOtherCardProps {
  icon?: React.ReactNode;
  title?: string;
  desc?: string;
  primaryBtnProps?: ButtonProps & { text: string };
  primaryBtn?: React.ReactNode;
  secondaryBtnProps?: ButtonProps & { text: string };
  secondaryBtn?: React.ReactNode;
}

const NoDataCard: React.FC<NoOtherCardProps> = ({ title = '未找到文件', icon, ...rest }) => {
  return (
    <NoCard
      className="aa-no-other-card"
      icon={icon ? icon : <IconNoOther size={124} />}
      title={title}
      {...rest}
    />
  );
};

export default NoDataCard;
