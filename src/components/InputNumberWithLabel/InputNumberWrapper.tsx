import React from 'react';
import { InputNumber } from '@arco-design/web-react';

/**
 * 通用数字输入组件，默认按钮模式
 * 符合 Arco Form 自定义控件规范：
 * - Form.Item 会传递 value 和 onChange 属性
 * - 必须调用 onChange 来让 Form.Item 收集值
 */
interface InputNumberWrapperProps {
  value?: number;
  onChange?: (value: number | undefined) => void;
  mode?: 'embed' | 'button';
  [key: string]: any; // 其他所有 InputNumber 属性通过 rest 传递
}

const InputNumberWrapper: React.FC<InputNumberWrapperProps> = ({
  value,
  onChange,
  mode = 'button', // 默认使用按钮模式
  ...rest
}) => {
  const handleChange = (val: number | undefined) => {
    // 调用 Form.Item 传递的 onChange，这样值才能被收集
    onChange?.(val);
  };

  return <InputNumber mode={mode} value={value} onChange={handleChange} {...rest} />;
};

export default InputNumberWrapper;
