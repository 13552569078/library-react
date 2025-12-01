import React from 'react';
import { Breadcrumb } from '@arco-design/web-react';
import { IconArrowLeft, IconObliqueLine } from '@arco-design/web-react/icon';
import type { BreadcrumbProps } from '@arco-design/web-react';
import './index.scss';

export interface BreadcrumbHeaderProps {
  list: { name: string; href?: string }[];
  /**
   * 面包屑组件的 props
   */
  breadcrumbProps?: Omit<BreadcrumbProps, 'children'>;
  /**
   * 左箭头点击事件
   */
  onArrowClick?: () => void;
  onLinkClick?: (href: string) => void;
  /**
   * 额外内容，显示在面包屑后面
   */
  extra?: React.ReactNode;
  /**
   * 是否显示左箭头
   */
  showArrow?: boolean;
  className?: string;
}

const BreadcrumbHeader: React.FC<BreadcrumbHeaderProps> = ({
  list = [],
  breadcrumbProps,
  onArrowClick,
  onLinkClick,
  extra,
  showArrow = true,
  className = '',
}) => {
  return (
    <div className={`aa-breadcrumb-header ${className}`}>
      {showArrow && <IconArrowLeft className="icon-left-arrow" onClick={onArrowClick} />}
      <div className="breadcrumb-wrapper">
        <Breadcrumb separator={<IconObliqueLine />} {...breadcrumbProps}>
          {list.map((item, index: number) => {
            return (
              <Breadcrumb.Item
                key={index}
                className={item.href ? 'link' : ''}
                onClick={() => {
                  if (item.href) onLinkClick?.(item.href);
                }}
              >
                {item.name}
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </div>
      {extra}
    </div>
  );
};

export default BreadcrumbHeader;
