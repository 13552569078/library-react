import React from 'react';
import { InputNumberProps } from '@arco-design/web-react';
import InputNumberWrapper from './InputNumberWrapper';
import './index.scss';

// 包装组件：处理 Form.Item 传递的 value 和 onChange
export type InputNumberWithLabelProps = {
  value?: number;
  onChange?: (value: number | undefined) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  loading?: boolean;
  loadingText?: string;
} & Omit<InputNumberProps, 'onChange' | 'value' | 'step' | 'min' | 'max'>;
const InputNumberWithLabel: React.FC<InputNumberWithLabelProps> = ({
  value,
  onChange,
  min,
  max,
  step,
  label,
  loading,
  loadingText = '加载中...',
  ...rest
}) => {
  return (
    <div className="aa-input-number-with-label">
      <InputNumberWrapper
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        {...rest}
      />
      <span className="input-number-label">{loading ? loadingText : label}</span>
    </div>
  );
};
export default InputNumberWithLabel;
