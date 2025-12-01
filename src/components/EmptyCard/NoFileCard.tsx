import React from 'react';
import { IconNoFile } from '../../icons';
import { ButtonProps } from '@arco-design/web-react';
import NoCard from './NoCard';

export interface NoFileCardProps {
  title?: string;
  desc?: string;
  primaryBtnProps?: ButtonProps & { text: string };
  primaryBtn?: React.ReactNode;
  secondaryBtnProps?: ButtonProps & { text: string };
  secondaryBtn?: React.ReactNode;
}

const NoDataCard: React.FC<NoFileCardProps> = ({ title = '未找到文件', ...rest }) => {
  return (
    <NoCard className="aa-no-file-card" icon={<IconNoFile size={124} />} title={title} {...rest} />
  );
};

export default NoDataCard;
