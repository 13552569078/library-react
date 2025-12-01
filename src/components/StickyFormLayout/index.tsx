import React, { useEffect, useMemo, useRef, useState } from 'react';
import ActionBar from './ActionBar';
import { useSticky } from '../../hooks/useSticky';
import useSmoothWheel from './useSmoothWheel';
import './index.scss';

export interface StickyFormLayoutProps {
  title: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  // 确认按钮点击事件
  onConfirm: () => void;
  // 取消按钮点击事件
  onCancel: () => void;
  // 是否正在加载
  loading?: boolean;
  // 确认按钮文本
  confirmText?: string;
  // 悬浮模式
  stickyMode?: 'viewport' | 'container';
  headerHeight?: number;
  // title 高度，默认为 64
  titleHeight?: number;
  /**
   * 自定义操作栏高度（用于计算 padding-bottom）
   * 默认为 76px (按钮高度 36px + padding 40px)
   */
  actionBarHeight?: number;
  // 根节点样式类名
  rootClassName?: string;
  // 标题区域样式类名
  titleClassName?: string;
  // 内容区域样式类名
  containerClassName?: string;
  // 底部区域样式类名
  footerClassName?: string;
  // 操作栏样式类名
  actionBarClassName?: string;
  actions?: React.ReactNode;
}

const StickyFormLayout: React.FC<StickyFormLayoutProps> = ({
  title,
  children,
  footer,
  onConfirm,
  onCancel,
  loading = false,
  confirmText = '确定',
  stickyMode = 'container',
  headerHeight = 50,
  titleHeight = 64,
  actionBarHeight = 76,
  rootClassName = '',
  titleClassName = '',
  containerClassName = '',
  footerClassName = '',
  actionBarClassName = '',
  actions,
}: StickyFormLayoutProps) => {
  const [rootContainerRef, isSticky, isScrolledToBottom] = useSticky();
  const footerRef = useRef<HTMLDivElement | null>(null);

  const titleRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  // 吸顶开关：当面包屑不可见时为 true（仅用于视觉状态，不再切换布局属性，避免抖动）
  const [isPinned, setIsPinned] = useState(false);
  // container 的最小高度（用于在内容较少时填满可视区，无需滚动）
  const [containerMinHeight, setContainerMinHeight] = useState<number>(0);

  useEffect(() => {
    if (!titleRef.current) return;
    const target = titleRef.current;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // title 不可见，进入吸顶模式
        setIsPinned(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
      },
    );
    io.observe(target);
    return () => {
      io.disconnect();
    };
  }, []);

  // 根据 root 可视高度 - 标题高度 - 底部高度 动态计算 container 最小高度
  useEffect(() => {
    const rootEl = rootContainerRef.current;

    const compute = () => {
      if (!rootEl) return;
      const available = rootEl.clientHeight - titleHeight - actionBarHeight;
      // 保持原有的最小高度计算，占位空间已经在JSX中固定添加
      setContainerMinHeight(Math.max(available, 0));
    };

    // 首次计算
    compute();

    // 监听尺寸变化（root、title、footer）
    const ro = new ResizeObserver(() => compute());
    rootEl && ro.observe(rootEl);
    titleRef.current && ro.observe(titleRef.current);
    footerRef.current && ro.observe(footerRef.current);

    // 窗口尺寸变化
    window.addEventListener('resize', compute);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', compute);
    };
  }, [rootContainerRef, titleHeight, actionBarHeight]);

  useSmoothWheel(rootContainerRef, containerRef, isPinned);

  const rootStyles: React.CSSProperties = useMemo(() => {
    return {
      width: 'calc(100% - 20px)',
      height: `calc(100vh - 20px - ${headerHeight}px)`,
      overflow: 'auto',
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
    };
  }, []);

  const containerStyles: React.CSSProperties = useMemo(() => {
    if (isPinned) {
      return {
        position: 'sticky',
        top: 0,
        maxHeight: `calc(${rootContainerRef.current?.clientHeight} - ${headerHeight}px)`,
        // 关键：当内容较少时填满空间
        minHeight: containerMinHeight,
        paddingBottom: actionBarHeight,
      };
    } else {
      return {
        // 关键：当内容较少时填满空间
        minHeight: containerMinHeight,
      };
    }
  }, [isPinned, containerMinHeight]);

  const footerStyles: React.CSSProperties = useMemo(() => {
    return {
      position: 'sticky',
      bottom: 0,
      height: actionBarHeight,
      padding: 24,
      boxSizing: 'border-box',
      width: '100%',
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
    };
  }, [actionBarHeight]);

  return (
    <div
      ref={rootContainerRef}
      className={`aa-sticky-form-layout ${rootClassName}`}
      style={{
        scrollbarWidth: 'none',
        ...rootStyles,
      }}
    >
      <div ref={titleRef} className={`${titleClassName}`}>
        {title}
      </div>
      <div
        ref={containerRef}
        className={`layout-container ${containerClassName}`}
        style={{
          scrollbarWidth: isPinned ? 'thin' : 'none',
          ...containerStyles,
        }}
      >
        {children}
      </div>
      <div ref={footerRef} style={footerStyles} className={footerClassName}>
        {footer || (
          <ActionBar
            isSticky={isSticky}
            isScrolledToBottom={isScrolledToBottom}
            onConfirm={onConfirm}
            onCancel={onCancel}
            loading={loading}
            confirmText={confirmText}
            // stickyMode={stickyMode}
            className={actionBarClassName}
            actions={actions}
          />
        )}
      </div>
    </div>
  );
};

export default StickyFormLayout;
