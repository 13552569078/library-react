import React from 'react';
import { Button } from '@arco-design/web-react';
import { IconEdit } from '@arco-design/web-react/icon';
import { ButtonProps } from '@arco-design/web-react/lib';
import './index.scss';

const EditButton: React.FC<ButtonProps & { text?: string | null }> = ({
  text = '编辑',
  children,
  onClick,
  ...rest
}) => {
  return (
    <Button
      icon={<IconEdit />}
      onClick={onClick}
      className="aa-edit-button"
      style={{
        border: '1px solid rgb(203,213,225)',
        backgroundColor: '#ffffff',
        color: '#000',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f9fafb';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#ffffff';
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.backgroundColor = '#f3f4f6';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.backgroundColor = '#f9fafb';
      }}
      {...rest}
    >
      {children ? children : text}
    </Button>
  );
};

export default EditButton;
