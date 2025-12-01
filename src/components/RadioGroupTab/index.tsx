import React, { useState, useEffect } from 'react';
import { Radio, RadioGroupProps } from '@arco-design/web-react';
import './index.scss';

export type RadioGroupTabProps = {
  options: { value: string; label: string; disabled?: boolean }[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
} & Omit<RadioGroupProps, 'options' | 'value' | 'defaultValue' | 'onChange'>;

const RadioGroupTab: React.FC<RadioGroupTabProps> = ({
  options = [],
  value,
  defaultValue,
  onChange,
  ...rest
}) => {
  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const handleChange = (val: string) => {
    if (value === undefined) {
      setInternalValue(val);
    }
    if (onChange) {
      onChange(val);
    }
  };

  return (
    <div className={'aa-radio-group-tab'}>
      <Radio.Group value={internalValue} type="button" onChange={handleChange} {...rest}>
        {options.map((option) => (
          <Radio
            key={option.value}
            value={option.value}
            disabled={option.disabled || rest.disabled}
          >
            {option.label}
          </Radio>
        ))}
      </Radio.Group>
    </div>
  );
};

export default RadioGroupTab;
