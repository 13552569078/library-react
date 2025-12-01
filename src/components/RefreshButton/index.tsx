import React from 'react';
import { Button, ButtonProps, Popover } from '@arco-design/web-react';
import { IconRefresh } from '@arco-design/web-react/icon';
import './index.scss';

const RefreshButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { className = '', loading, disabled, ...rest } = props;
  return (
    <Popover trigger="hover" content="刷新">
      <Button
        type="outline"
        icon={<IconRefresh className={`${loading ? 'loading' : ''}`} />}
        className={`aa-refresh-button ${className ?? ''}`}
        disabled={loading || disabled}
        {...rest}
        style={{
          borderColor: 'var(--color-border-1)',
          backgroundColor: '#ffffff',
          color: 'var(--color-text-2)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-text-5)';
          e.currentTarget.style.color = 'var(--color-text-3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#ffffff';
          e.currentTarget.style.borderColor = 'var(--color-border-1)';
          e.currentTarget.style.color = 'var(--color-text-2)';
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-text-3)';
          e.currentTarget.style.color = 'var(--color-text-1)';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-border-1)';
          e.currentTarget.style.color = 'var(--color-text-2)';
        }}
      />
    </Popover>
  );
};

export default RefreshButton;
