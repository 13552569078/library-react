import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { Tag, TagProps, Tooltip } from '@arco-design/web-react';

export interface TruncatedTagListProps {
  tagList: string[];
  tagProps?: TagProps;
  moreTagProps?: TagProps;
}

const TruncatedTagList: React.FC<TruncatedTagListProps> = ({ tagList, tagProps, moreTagProps }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(tagList.length);
  const [remainingScripts, setRemainingScripts] = useState<string[]>([]);

  const calculateVisibleCount = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerWidth = parseFloat(window.getComputedStyle(container).width.replace('px', ''));
    const tags = container.querySelectorAll('.truncated-tag');
    const moreTags = container.querySelectorAll('.more-tag');
    let totalWidth = 0;
    let count = 0;

    const moreTagWidth = moreTags.length
      ? parseFloat(window.getComputedStyle(moreTags[0]).width.replace('px', ''))
      : 0;
    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i] as HTMLElement;
      const tagWidth = parseFloat(window.getComputedStyle(tag).width.replace('px', '')) + 4; // 包括gap
      if (totalWidth + tagWidth + moreTagWidth > containerWidth) {
        break;
      }
      totalWidth += tagWidth;
      count++;
    }

    setVisibleCount(count);
    setRemainingScripts(tagList.slice(count));
  };

  useEffect(() => {
    calculateVisibleCount();
  }, [visibleCount]);

  useLayoutEffect(() => {
    calculateVisibleCount();
  }, [tagList]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      calculateVisibleCount();
    });

    resizeObserver.observe(container);

    const handleResize = () => calculateVisibleCount();
    window.addEventListener('resize', handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [tagList]);

  const visibleScripts = tagList.slice(0, visibleCount);
  const remainingCount = remainingScripts.length;

  return (
    <div
      ref={containerRef}
      className="aa-truncated-tag-list"
      style={{
        display: 'flex',
        flexWrap: 'nowrap',
        gap: '4px',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {visibleScripts.map((script, index) => (
        <Tag key={index} className="truncated-tag" style={{ background: '#E7ECF0' }} {...tagProps}>
          {script}
        </Tag>
      ))}
      {remainingCount > 0 && (
        <Tooltip
          content={
            <div style={{ maxHeight: 200, overflowY: 'auto' }}>
              {remainingScripts.map((script, index) => (
                <div key={index} style={{ marginBottom: 4 }}>
                  {script}
                </div>
              ))}
            </div>
          }
          trigger="hover"
        >
          <Tag
            className="more-tag"
            style={{ background: '#E7ECF0', cursor: 'pointer' }}
            {...moreTagProps}
          >
            +{remainingCount}
          </Tag>
        </Tooltip>
      )}
    </div>
  );
};

export default TruncatedTagList;
