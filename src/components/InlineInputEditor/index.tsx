import React, { useEffect, useRef, useState } from 'react';
import { Popover, Input, Tooltip, InputProps, TextAreaProps } from '@arco-design/web-react';
import { IconEdit } from '@arco-design/web-react/icon';
import classNames from 'classnames';
import './index.scss';

export type InlineInputEditorProps = {
  value: string;
  onChange?: (value: string) => void;
  onEnd?: (value: string) => void;
  placeholder?: string;
  className?: string;
  multiLine?: boolean;
} & InputProps &
  TextAreaProps;

const InlineInputEditor: React.FC<InlineInputEditorProps> = ({
  value,
  onChange,
  onEnd,
  placeholder,
  className,
  multiLine,
  ...rest
}) => {
  const InputComponent = multiLine ? Input.TextArea : Input;
  const [isEditing, setIsEditing] = useState(false);
  const [inner, setInner] = useState<string>(value || '');
  const [isTextTruncated, setIsTextTruncated] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!isEditing) setInner(value || '');
  }, [value, isEditing]);

  const commit = (next: string) => {
    const trimmed = next;
    if (trimmed !== value) {
      onChange?.(trimmed);
    }
    setIsEditing(false);
    // 调用 onEnd 回调函数，并传入处理后的 trimmed 值作为参数
    onEnd && onEnd(trimmed);
  };

  const cancel = () => {
    setInner(value || '');
    setIsEditing(false);
  };

  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | null = null;
    if (isEditing) {
      t = setTimeout(() => inputRef.current?.focus(), 0);
    }
    return () => {
      t && clearTimeout(t);
    };
  }, [isEditing]);

  // 检测文本是否被截断
  useEffect(() => {
    const checkTextTruncation = () => {
      if (textRef.current) {
        const element = textRef.current;
        const isTruncated = element.offsetWidth < element.scrollWidth;
        setIsTextTruncated(isTruncated);
      }
    };

    checkTextTruncation();

    // 添加 resize 监听器，当窗口大小变化时重新检测
    window.addEventListener('resize', checkTextTruncation);

    return () => {
      window.removeEventListener('resize', checkTextTruncation);
    };
  }, [value]);

  // 公共的显示内容
  const displayContent = (
    <div className="text-content">
      <Popover position="top" content={value} disabled={!isTextTruncated}>
        <span ref={textRef} className="text-value" title={undefined}>
          {value}
        </span>
      </Popover>
      <Tooltip content="编辑">
        <IconEdit
          className={classNames('edit-icon')}
          onClick={() => {
            setInner(value || '');
            setIsEditing(true);
          }}
        />
      </Tooltip>
    </div>
  );

  return (
    <div className={`aa-inline-input-editor ${className || ''}`}>
      {isEditing ? (
        <InputComponent
          ref={inputRef as any}
          size="small"
          value={inner}
          placeholder={placeholder}
          onChange={(v) => setInner(v)}
          onPressEnter={() => commit(inner)}
          onBlur={() => commit(inner)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              e.stopPropagation();
              cancel();
            }
          }}
          style={{ minWidth: 80 }}
          {...rest}
        />
      ) : (
        displayContent
      )}
    </div>
  );
};

export default InlineInputEditor;
