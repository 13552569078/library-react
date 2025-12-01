// action-bar
import React from 'react';
import { Button } from '@arco-design/web-react';

interface ActionBarProps {
  /**
   * 是否处于悬浮状态
   */
  isSticky: boolean;
  /**
   * 是否滚动到底部
   */
  isScrolledToBottom?: boolean;
  /**
   * 确认按钮点击事件
   */
  onConfirm: () => void;
  /**
   * 取消按钮点击事件
   */
  onCancel: () => void;
  /**
   * 是否正在加载
   */
  loading?: boolean;
  /**
   * 确认按钮文本
   */
  confirmText?: string;
  /**
   * 悬浮模式
   * - viewport: 相对于视口悬浮
   * - container: 相对于容器悬浮
   */
  // stickyMode?: 'viewport' | 'container';
  /**
   * 自定义样式类名
   */
  className?: string;
  actions?: React.ReactNode;
}

const ActionBar: React.FC<ActionBarProps> = (props) => {
  const {
    isSticky,
    isScrolledToBottom = false,
    onConfirm,
    onCancel,
    loading = false,
    confirmText = '确定',
    // stickyMode = 'container',
    className = '',
    actions,
  } = props;

  const getStickyContainerStyles = () => {
    if (!isSticky) {
      return '';
    }
    // 当滚动到底部时，不显示阴影和边框；否则显示阴影和边框
    if (isScrolledToBottom) {
      return 'to-bottomed';
    }
    return 'is-sticky';
  };

  return (
    <div
      className={`
        action-bar
        ${getStickyContainerStyles()}
        ${isSticky ? '' : 'not-sticky'}
        ${className}
      `}
    >
      <div className="action-btns">
        {!!actions ? (
          actions
        ) : (
          <>
            <Button type="primary" size="large" loading={loading} onClick={onConfirm}>
              {confirmText}
            </Button>
            <Button size="large" onClick={onCancel} disabled={loading}>
              取消
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ActionBar;
