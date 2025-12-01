import { IconUp } from '@arco-design/web-react/icon';
import classNames from 'classnames';
import React, { useRef, useState, useEffect } from 'react';
import './index.scss';

export interface ExpandableContainerProps {
  moreText?: string;
  lessText?: string;
  align?: 'left' | 'right' | 'center';
  children: React.ReactNode;
  maxHeight?: number; // 可选，默认259
  expand?: boolean; // 可选，默认false
  handleExpand?: (expanded: boolean) => void; // 可选，展开收起回调
}

const ExpandableContainer: React.FC<ExpandableContainerProps> = ({
  moreText = '更多',
  lessText = '收起',
  align = 'left',
  children,
  maxHeight = 259,
  expand = false,
  handleExpand,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(expand);
  const [showToggle, setShowToggle] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    setExpanded(expand);
  }, [expand]);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const update = () => {
      const sh = el.scrollHeight;
      if (sh !== undefined) {
        setContentHeight(sh);
        setShowToggle(sh > maxHeight);
      }
    };

    // 初始计算
    update();

    // ResizeObserver：当元素自身尺寸变化时更新（在展开后有用）
    const ro = new ResizeObserver(() => {
      requestAnimationFrame(update);
    });
    try {
      ro.observe(el);
    } catch (e) {
      // 忽略老浏览器或异常
    }

    // MutationObserver：监听子树/属性/文本变化（例如表单校验错误消息插入）
    const mo = new MutationObserver(() => {
      // 保证在 DOM 更新并且样式计算后读取 scrollHeight
      requestAnimationFrame(update);
      setTimeout(update, 0);
    });
    mo.observe(el, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
    });

    return () => {
      ro.disconnect();
      mo.disconnect();
    };
  }, [maxHeight]);

  const handleToggle = () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    handleExpand?.(newExpanded);
  };

  return (
    <div className="aa-expandable-container">
      <div
        ref={contentRef}
        style={{
          maxHeight: expanded ? contentHeight : maxHeight,
          overflow: 'hidden',
          transition: 'max-height 0.3s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {children}
      </div>
      {showToggle ? (
        <div className={classNames('expandable-toggler', align)}>
          {expanded ? <IconUp /> : <IconUp className="icon-up-deg180" />}
          <div onClick={handleToggle} className="more-text">
            {expanded ? lessText : moreText}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ExpandableContainer;
