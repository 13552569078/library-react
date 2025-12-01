import React from 'react';
import { Button, ButtonProps } from '@arco-design/web-react';
import './index.scss';

export interface NoCardProps {
  icon: React.ReactNode;
  className?: string;
  title?: string;
  desc?: string;
  primaryBtnProps?: ButtonProps & { text: string };
  primaryBtn?: React.ReactNode;
  secondaryBtnProps?: ButtonProps & { text: string };
  secondaryBtn?: React.ReactNode;
  [x: string]: any;
}

const NoDataCard: React.FC<NoCardProps> = ({
  icon,
  className,
  title,
  desc,
  primaryBtn,
  secondaryBtn,
  primaryBtnProps,
  secondaryBtnProps,
}) => {
  return (
    <div className={`aa-no-card ${className ?? ''}`}>
      {icon}
      <div className="bottom-section">
        <div className="title">{title}</div>
        {desc && <div className="desc">{desc}</div>}
        {primaryBtnProps || secondaryBtnProps || primaryBtn || secondaryBtn ? (
          <div className="btns">
            {secondaryBtnProps && (
              <Button {...secondaryBtnProps} type="outline">
                {secondaryBtnProps.text}
              </Button>
            )}
            {secondaryBtn ?? null}
            {primaryBtnProps && (
              <Button {...primaryBtnProps} type="primary">
                {primaryBtnProps.text}
              </Button>
            )}
            {primaryBtn ?? null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NoDataCard;
