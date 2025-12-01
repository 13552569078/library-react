import React, { useMemo } from 'react';
import classNames from 'classnames';
import CopyItemIcon from '../CopyItemIcon';
import EllipsisPopover from '../EllipsisPopover';

export interface IDescriptionProps {
  colon?: boolean;
  column?: number;
  title?: string;
  data: IDescriptionData[];
  titleStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  valueStyle?: React.CSSProperties;
  wrapperClassName?: string;
  labelWidths?: number[]; // 新增：每列的 label 宽度
}

export type IDescriptionData = {
  label: React.ReactNode;
  value: React.ReactNode;
  isCopy?: boolean;
  column?: number; // 每个项目可以指定占多少列
};

const IDescription: React.FC<IDescriptionProps> = (props: IDescriptionProps) => {
  const { colon = true, labelWidths } = props;

  const columns = Math.max(1, props.column ?? 1);

  // 计算每列的最大 label 宽度
  const calculatedLabelWidths = useMemo(() => {
    if (labelWidths) return labelWidths;

    const columnWidths: number[] = new Array(columns).fill(0);

    props.data?.forEach((item, index) => {
      const colIdx = index % columns;
      if (typeof item.label === 'string') {
        // 估算文本宽度：每个中文字符约14px，英文字符约8px
        const text = item.label + (colon ? '：' : '');
        const chineseChars = text.match(/[\u4e00-\u9fa5]/g)?.length || 0;
        const otherChars = text.length - chineseChars;
        const estimatedWidth = chineseChars * 14 + otherChars * 8 + 8; // 加上一些 padding

        if (estimatedWidth > columnWidths[colIdx]) {
          columnWidths[colIdx] = estimatedWidth;
        }
      } else {
        // 对于非字符串 label，使用默认宽度
        const defaultWidth = 127;
        if (defaultWidth > columnWidths[colIdx]) {
          columnWidths[colIdx] = defaultWidth;
        }
      }
    });

    return columnWidths;
  }, [props.data, columns, colon, labelWidths]);

  const data = useMemo(() => {
    return props.data?.map((item) => {
      if (typeof item.value === 'string') {
        return {
          ...item,
          value: (
            <div className="item-value">
              <div className="value-text">
                <EllipsisPopover value={item.value ?? '-'} />
              </div>
              {item.isCopy ? <CopyItemIcon value={item.value} /> : null}
            </div>
          ),
        };
      }
      return item;
    });
  }, [props.data]);

  const renderItem = (item: IDescriptionProps['data'][number], index: number) => {
    const colIdx = index % columns;
    const isSingleOnLastRow =
      index === props.data.length - 1 && props.data.length % columns === 1 && columns > 1;

    let gridColumnStyle;
    if (item.column && item.column > 1) {
      // 如果项目指定了列数，则跨越多列
      gridColumnStyle = `span ${item.column}`;
    } else if (isSingleOnLastRow) {
      // 仅当最后一行只有一个元素时，占满整行
      gridColumnStyle = '1 / -1';
    }

    return (
      <div
        key={index}
        className="info-item"
        style={{
          gridColumn: gridColumnStyle,
        }}
      >
        <span
          style={{
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '22px',
            color: '#6E7B8D',
            width: `${calculatedLabelWidths[colIdx]}px`,
            minWidth: `${calculatedLabelWidths[colIdx]}px`,
            whiteSpace: 'nowrap',
            ...props.labelStyle,
          }}
          className="item-label-wrapper"
        >
          {item.label}
          {colon ? '：' : null}
        </span>
        <span
          style={{
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '22px',
            ...props.valueStyle,
          }}
          className="item-value-wrapper"
        >
          {item.value}
        </span>
      </div>
    );
  };

  return (
    <div className={classNames('info-section-wrapper', props.wrapperClassName)}>
      {props.title ? (
        <div
          style={{
            fontWeight: 600,
            fontSize: '16px',
            lineHeight: '24px',
            marginBottom: '16px',
            ...props.titleStyle,
          }}
        >
          {props.title}
        </div>
      ) : null}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          // 如需间距可开启：
          gap: '16px 24px',
        }}
      >
        {data?.map((item, index) => renderItem(item, index))}
      </div>
    </div>
  );
};

export default IDescription;
