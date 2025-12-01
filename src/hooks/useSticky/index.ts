import { useState, useEffect, useRef, RefObject } from 'react';

export const useSticky = <T extends HTMLElement = HTMLDivElement>(): [
  RefObject<T>,
  boolean,
  boolean,
] => {
  const ref = useRef<T | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // 检测元素是否可滚动
    const checkScrollable = () => {
      if (!element) return false;

      // 检查垂直滚动
      const canScrollVertically = element.scrollHeight > element.clientHeight;
      // 检查水平滚动
      const canScrollHorizontally = element.scrollWidth > element.clientWidth;

      return canScrollVertically || canScrollHorizontally;
    };

    // 检测是否滚动到底部
    const checkScrolledToBottom = () => {
      if (!element) return false;
      const threshold = 5; // 5px 的容差
      return element.scrollTop + element.clientHeight >= element.scrollHeight - threshold;
    };

    // 更新滚动状态
    const updateState = () => {
      const scrollable = checkScrollable();
      setIsSticky(scrollable);

      if (scrollable) {
        const scrolledToBottom = checkScrolledToBottom();
        setIsScrolledToBottom(scrolledToBottom);
      } else {
        setIsScrolledToBottom(false);
      }
    };

    // 滚动事件处理
    const handleScroll = () => {
      if (checkScrollable()) {
        const scrolledToBottom = checkScrolledToBottom();
        setIsScrolledToBottom(scrolledToBottom);
      }
    };

    // 初始化检测
    updateState();

    // 添加滚动事件监听
    element.addEventListener('scroll', handleScroll, { passive: true });

    // 创建观察器监听变化
    const resizeObserver = new ResizeObserver(updateState);
    const mutationObserver = new MutationObserver(updateState);

    // 开始观察
    resizeObserver.observe(element);
    mutationObserver.observe(element, {
      childList: true, // 观察子节点变化
      subtree: true, // 观察所有后代节点
      characterData: true, // 观察文本内容变化
    });

    // 清理函数
    return () => {
      element.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return [ref, isSticky, isScrolledToBottom];
};
