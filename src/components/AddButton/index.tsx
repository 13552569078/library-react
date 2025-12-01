import React from 'react';
import { IconPlus } from '@arco-design/web-react/icon';
import { Button, ButtonProps } from '@arco-design/web-react';
import './index.scss';

export interface AddButtonProps extends Omit<ButtonProps, 'children'> {
  text?: string;
  children?: React.ReactNode;
  showIcon?: boolean;
}

const AddButton: React.FC<AddButtonProps> = ({
  text = '添加',
  children,
  className,
  showIcon = true,
  ...props
}) => {
  return (
    <Button type="primary" className={`aa-add-button ${className || ''}`} {...props}>
      {showIcon && <IconPlus className="add-icon" />}
      {children ? children : text}
    </Button>
  );
};

export default AddButton;
