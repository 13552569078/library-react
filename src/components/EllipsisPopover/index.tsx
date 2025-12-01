import React, { useRef, useEffect, useState } from 'react';
import { Popover, Link, Message, Typography, EllipsisConfig } from '@arco-design/web-react';
import { IconCopy } from '@arco-design/web-react/icon';
import './index.less';

export interface EllipsisPopoverProps {
  value: any;
  isCopy?: boolean;
  isLink?: boolean;
  handleLink?: () => void;
  wrapperClassName?: string;
  className?: string;
  preferTypography?: boolean;
  ellipsis?: EllipsisConfig;
  quiteMessage?: boolean;
  copySuccessCallback?: () => void;
  copyFailCallback?: () => void;
  [x: string]: any;
}

function EllipsisPopover(props: EllipsisPopoverProps) {
  const {
    value,
    isCopy,
    isLink,
    handleLink,
    wrapperClassName,
    className,
    preferTypography,
    quiteMessage = false,
    copySuccessCallback,
    caopyFailCallback,
    ellipsis = {},
  } = props;
  const valueRef = useRef<any>(null);
  const columnTextRef = useRef(null);
  const columnInputRef = useRef<HTMLInputElement | null>(null);
  const [isShowTooltip, setIsShowTooltip] = useState(false);
  const [columnTextVisible, setColumnTextVisible] = useState(false);
  const [columnInputVisible, setColumnInputVisible] = useState(false);
  const columnTimerRef = useRef<null | NodeJS.Timeout>(null);

  useEffect(() => {
    if (columnTextVisible) {
      const tag = valueRef.current;
      const tag1 = columnTextRef.current;
      if (tag && tag1) {
        let parentWidth = Number(
          window.getComputedStyle(tag?.parentNode as Element).width.replace('px', ''),
        ); // 获取元素父级宽度精确到小数
        const contentWidth = Number(window.getComputedStyle(tag1).width.replace('px', '')); // 获取元素宽度精确到小数
        if (isCopy) parentWidth = parentWidth - 20;

        setIsShowTooltip(contentWidth > parentWidth);
      } else {
        setIsShowTooltip(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnTextVisible]);

  const onMouseOver = () => {
    columnTimerRef.current && clearTimeout(columnTimerRef.current);
    const columnTimer = setTimeout(() => {
      setColumnTextVisible(true);
    }, 200);
    columnTimerRef.current = columnTimer;
  };
  const onMouseOut = () => {
    setIsShowTooltip(false);
    setColumnTextVisible(false);
    // @ts-expect-error
    clearTimeout(columnTimerRef.current);
  };
  const onMouseOverIconCopy = () => {
    setColumnInputVisible(true);
  };
  const onMouseOutIconCopy = () => {
    setColumnInputVisible(false);
  };
  const handleCopy = () => {
    const oInput = columnInputRef.current;
    // 选择对象
    oInput?.select && oInput.select();
    // 执行浏览器复制命令
    try {
      document.execCommand('Copy');
      if (!quiteMessage) {
        Message.success({
          className: 'net-ecs-message',
          content: '复制成功',
        });
      }
      copySuccessCallback?.();
    } catch (e) {
      if (!quiteMessage) {
        Message.success({
          className: 'net-ecs-message',
          content: '复制失败',
        });
      }
      caopyFailCallback?.();
    }
  };
  const renderPopover = () => {
    const displayContent = value || value === 0 ? value : '--';
    return preferTypography ? (
      <Typography.Paragraph
        ellipsis={{
          showTooltip: {
            type: 'popover',
            props: {
              position: 'tl',
              className: 'ellipsis-popover',
            },
          },
          ...ellipsis,
        }}
        className={`typoWrap ${className ? className : ''}`}
      >
        {displayContent}
      </Typography.Paragraph>
    ) : (
      <Popover
        className="ellipsis-popover"
        position="tl"
        content={value}
        popupVisible={isShowTooltip}
      >
        {isLink ? (
          <Link
            className={`ellipsis-text ${isCopy ? 'ellipsis-pop-span' : ''} ${
              className ? className : ''
            }`}
            onClick={handleLink}
            ref={valueRef}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
          >
            {displayContent}
          </Link>
        ) : (
          <span
            className={`ellipsis-text ${isCopy ? 'ellipsis-pop-span' : ''} ${
              className ? className : ''
            }`}
            ref={valueRef}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
          >
            {displayContent}
          </span>
        )}
      </Popover>
    );
  };
  return (
    <div className={`aa-ellipsis-popover ${wrapperClassName || ''}`}>
      {renderPopover()}
      {isCopy && (
        <Popover className="ellipsis-popover" position="top" content="复制">
          <IconCopy
            className="ellipsis-pop-copy-icon"
            onClick={handleCopy}
            onMouseOver={onMouseOverIconCopy}
            onMouseOut={onMouseOutIconCopy}
          />
        </Popover>
      )}
      {columnTextVisible && (
        <span ref={columnTextRef} className="ellipsis-text-span">
          {value}
        </span>
      )}
      {columnInputVisible && (
        <input ref={columnInputRef} readOnly defaultValue={value} className="ellipsis-text-span" />
      )}
    </div>
  );
}

export default EllipsisPopover;
