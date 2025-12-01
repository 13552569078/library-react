import React from 'react';
import { Switch, SwitchProps } from '@arco-design/web-react';
import classNames from 'classnames';
import './index.scss';

const Switcher: React.FC<SwitchProps> = (props: SwitchProps) => {
  return (
    <Switch
      checkedText="开"
      uncheckedText="关"
      {...props}
      className={classNames('aa-switcher', props.className)}
    />
  );
};

export default Switcher;
