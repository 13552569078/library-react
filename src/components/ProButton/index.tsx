import React from 'react';
import { Button, ButtonProps } from '@arco-design/web-react';
import { IconLoading } from '@arco-design/web-react/icon';

export interface ProButtonProps extends Omit<ButtonProps, 'loading' | 'onClick'> {
  /** 按钮文本 */
  children?: React.ReactNode;
  /** 是否显示加载状态 */
  loading?: boolean;
  /** 加载状态文本 */
  loadingText?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 按钮类型 */
  type?: 'default' | 'primary' | 'secondary' | 'outline' | 'dashed' | 'text';
  /** 按钮尺寸 */
  size?: 'mini' | 'small' | 'default' | 'large';
  /** 按钮形状 */
  shape?: 'square' | 'round' | 'circle';
  /** 按钮状态 */
  status?: 'warning' | 'danger' | 'success';
  /** 是否为长按钮 */
  long?: boolean;
  /** 点击事件 */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 图标 */
  icon?: React.ReactNode;
  /** 图标位置 */
  iconOnly?: boolean;
}

const ProButton: React.FC<ProButtonProps> = ({
  children,
  loading = false,
  loadingText,
  disabled = false,
  onClick,
  type = 'default',
  size = 'default',
  shape,
  status,
  long = false,
  className,
  style,
  icon,
  iconOnly = false,
  ...rest
}) => {
  const [internalLoading, setInternalLoading] = React.useState(false);

  const handleClick = async (e: any) => {
    const event = e as React.MouseEvent<HTMLButtonElement>;

    if (disabled || loading || internalLoading) {
      return;
    }

    if (onClick) {
      try {
        setInternalLoading(true);
        const result = onClick(event);

        // 如果 onClick 返回 Promise，等待其完成
        if (result instanceof Promise) {
          await result;
        }
      } catch (error) {
        console.error('ProButton onClick error:', error);
      } finally {
        setInternalLoading(false);
      }
    }
  };

  const isLoading = loading || internalLoading;
  const buttonText = isLoading && loadingText ? loadingText : children;
  const buttonIcon = isLoading ? <IconLoading /> : icon;

  return (
    <Button
      {...rest}
      type={type}
      size={size}
      shape={shape}
      status={status}
      long={long}
      loading={isLoading}
      disabled={disabled}
      onClick={handleClick}
      className={`aa-pro-button ${className ?? ''}`}
      style={style}
      icon={buttonIcon}
      iconOnly={iconOnly}
    >
      {buttonText}
    </Button>
  );
};

export default ProButton;
