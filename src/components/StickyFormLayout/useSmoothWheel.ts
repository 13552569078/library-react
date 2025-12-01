import { MutableRefObject, RefObject, useEffect } from 'react';

export default function useSmoothWheel(
  rootContainerRef: RefObject<HTMLDivElement>,
  containerRef: MutableRefObject<HTMLDivElement | null>,
  isPinned: boolean,
) {
  // 在吸顶状态下，平滑接力滚动：将外层滚动的滚轮增量无缝转交给内层，避免两层滚动切换时的停顿感
  useEffect(() => {
    const rootEl = rootContainerRef.current;
    const innerEl = containerRef.current;
    if (!rootEl || !innerEl) return;

    // 仅在吸顶时启用转发，以保持原有交互不变
    const handleWheel = (e: WheelEvent) => {
      if (!isPinned) return;

      // 只能在需要时阻止默认（外层继续滚动），从而把滚动增量用于内层
      const deltaY = e.deltaY;
      if (deltaY === 0) return;

      const atTop = innerEl.scrollTop <= 0;
      const atBottom = innerEl.scrollTop + innerEl.clientHeight >= innerEl.scrollHeight - 1;

      // 向下滚：若内层还可继续滚，就接管；若已至底，则放行给外层
      if (deltaY > 0 && !atBottom) {
        e.preventDefault();
        innerEl.scrollTop = Math.min(
          innerEl.scrollTop + deltaY,
          innerEl.scrollHeight - innerEl.clientHeight,
        );
        return;
      }

      // 向上滚：若内层不是顶部，就接管；若在顶部，则放行给外层（回到标题区域）
      if (deltaY < 0 && !atTop) {
        e.preventDefault();
        innerEl.scrollTop = Math.max(innerEl.scrollTop + deltaY, 0);
        return;
      }
      // 其他情况不拦截，维持原有行为
    };

    // 注意要使用 passive: false 才能 preventDefault
    rootEl.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      rootEl.removeEventListener('wheel', handleWheel as EventListener);
    };
  }, [rootContainerRef, isPinned]);
}
