import React from 'react';
import classNames from 'classnames';
import IDescription, { IDescriptionProps } from './IDescription';
import { Spin } from '@arco-design/web-react';
import useCountMaxWidthByCols from './useCountMaxWidthByCols';
import './index.scss';

export type IData = IDescriptionProps & {
  items: {
    label: string;
    value: React.ReactNode;
    isCopy?: boolean;
  }[];
};
export interface InfoDescriptionProps {
  data: Omit<IData, 'data'>[];
  className?: string;
  colon?: boolean;
  column?: number; // 列数，可统一设置，也可在 data 中给每一个描述快设置，data 中设置的优先级更高
  /* 是否自动根据 data 内容计算最长 label 宽度 */
  autoLabelWidth?: boolean;
  loading?: boolean;
  titleStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  valueStyle?: React.CSSProperties;
}

const InfoDescription: React.FC<InfoDescriptionProps> = (props: InfoDescriptionProps) => {
  const {
    autoLabelWidth = true,
    colon = true,
    column = 2,
    loading = false,
    titleStyle,
    labelStyle,
    valueStyle,
  } = props;

  const { widthMapByCols } = useCountMaxWidthByCols({
    autoLabelWidth,
    colon,
    column,
    data: props.data,
  });

  return (
    <Spin loading={loading} className="aa-info-description">
      <div className={classNames('info-wrapper', props.className || '')}>
        {props.data?.map((item) => {
          const cols = item.column ?? column;
          const labelWidths = autoLabelWidth ? widthMapByCols[cols] : undefined;
          return (
            <div key={item.title}>
              <IDescription
                column={cols}
                title={item.title}
                data={item.items}
                labelWidths={labelWidths}
                titleStyle={titleStyle}
                labelStyle={labelStyle}
                valueStyle={valueStyle}
              />
            </div>
          );
        })}
      </div>
    </Spin>
  );
};

export default InfoDescription;
