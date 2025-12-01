import React, { useCallback, useMemo, useState } from 'react';
import {
  Cascader as ArcoCascader,
  CascaderProps as ArcoCascaderProps,
  Popover,
  Tag,
} from '@arco-design/web-react';
import classNames from 'classnames';
import { IconClose } from '@arco-design/web-react/icon';
import EllipsisPopover from '../EllipsisPopover';
import './index.scss';

// 仅用于同级数组比较
const isEqual = (val1: unknown[], val2: unknown[]) => val1.join(',') === val2.join(',');

export interface CascaderProps extends ArcoCascaderProps {
  options: any;
  value?: any[];
  onChange?: (value: any[]) => void;
}

// 默认 Tag 样式，避免重复创建对象
const DEFAULT_TAG_STYLE: React.CSSProperties = {
  // maxWidth: 'calc((100% - 93px) / 2)',
};

const Cascader: React.FC<CascaderProps> = (props) => {
  const { options, maxTagCount, mode = 'multiple', getPopupContainer } = props;
  const [selectedValues, setSelectedValues] = useState<any[]>([]);

  const cascaderValue =
    props.value ?? selectedValues?.map((item: any[]) => item?.map((i) => i?.value));

  const maxCount = useMemo(() => {
    if (typeof maxTagCount === 'number') return maxTagCount;
    else if (typeof maxTagCount === 'object' && maxTagCount && 'count' in maxTagCount) {
      return (maxTagCount as { count: number }).count;
    }
    return 2;
  }, [maxTagCount]);

  const generateTag = (tagProps: any, tagStyle?: React.CSSProperties) => {
    const { key, closable, onClose, label, value } = tagProps;

    return (
      <Tag
        key={value.join('>') + key}
        closable={closable}
        onClose={onClose}
        style={tagStyle || DEFAULT_TAG_STYLE}
        closeIcon={<IconClose />}
        className="aa-cascader-tag"
      >
        <EllipsisPopover value={label} />
      </Tag>
    );
  };

  const updateValue = useCallback(
    (values: any[]) => {
      setSelectedValues(values);
      props.onChange?.(values);
    },
    [props.onChange],
  );

  const renderTag = useCallback(
    (tagProps: any, index: number) => {
      if (index < maxCount) {
        return generateTag({ ...tagProps });
      } else if (index == maxCount) {
        const remainingTags = cascaderValue?.slice(maxCount).map((item) => {
          return generateTag(
            {
              value: item,
              closable: true,
              label: item.join(' > '),
              key: `popover-tags-${item.join('-')}`,
              onClose: (e: any) => {
                e?.preventDefault?.();
                e?.stopPropagation?.();

                const newValues = cascaderValue.filter((v) => !isEqual(v, item));
                updateValue(newValues);
              },
            },
            { maxWidth: 'fit-content', marginBottom: '4px' },
          );
        });

        return (
          <Popover
            key={`tag-aggregated-${maxCount}`}
            content={<div>{remainingTags}</div>}
            style={{ maxWidth: 504, padding: 0 }}
            className={'aa-remaining-tag-popover'}
          >
            {generateTag({
              label: ` +${cascaderValue.length - maxCount}`,
              value: ['extra-tag', 'has-more'],
              closable: true,
              onClose: (e: any) => {
                e?.preventDefault?.();
                e?.stopPropagation?.();
                updateValue([]);
              },
            })}
          </Popover>
        );
      } else return null;
    },
    [maxCount, cascaderValue, updateValue],
  );

  const renderOption = useCallback((node: { label: unknown }, _level: any) => {
    return (
      <div style={{ width: 'calc(100% - 28px)' }}>
        <EllipsisPopover value={node.label} />
      </div>
    );
  }, []);

  return (
    <ArcoCascader
      value={cascaderValue}
      renderTag={renderTag}
      renderFormat={(valueShow) => `${valueShow.join(' > ')}`}
      mode={mode}
      {...props}
      options={options}
      renderOption={renderOption}
      // 将下拉挂载到触发器父节点（可改为 document.getElementById('你的滚动容器')）
      getPopupContainer={
        getPopupContainer ??
        ((triggerNode: HTMLElement) => triggerNode?.parentElement || document.body)
      }
      onChange={(value, selectedOptions, { dropdownVisible }) => {
        setSelectedValues(selectedOptions);
        props.onChange?.(value);
      }}
      className={classNames(props.className, 'aa-cascader')}
      dropdownMenuClassName={classNames(props.dropdownMenuClassName, 'aa-cascader-dropdown')}
    />
  );
};

export default React.memo(Cascader);
