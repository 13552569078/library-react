import React from 'react';

export interface IconProps {
  /** 图标大小 */
  size?: number | string;
  viewBox?: string;
  /** 图标颜色 */
  color?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 点击事件 */
  onClick?: (event: React.MouseEvent<SVGElement>) => void;
  /** SVG 内容 */
  children: React.ReactNode;
}

const Icon: React.FC<IconProps> = ({
  size = 16,
  viewBox = '0 0 16 16',
  color = 'currentColor',
  className,
  style,
  onClick,
  children,
  ...props
}) => {
  const iconStyle: React.CSSProperties = {
    width: size,
    height: size,
    color,
    display: 'inline-block',
    verticalAlign: 'middle',
    ...style,
  };

  return (
    <svg
      className={`aa-icon ${className ?? ''}`}
      style={iconStyle}
      onClick={onClick}
      fill="none"
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  );
};

export default Icon;
