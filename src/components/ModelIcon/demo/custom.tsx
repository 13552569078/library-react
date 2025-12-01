import React from 'react';
import { Space } from '@arco-design/web-react';
import ModelIcon, { ModelIconMap } from '../index';
import { IconFileJsonl } from '../../../icons';

const KimiIcon = (props: any) => {
  return <span {...props}>&#x1F989;</span>;
};

ModelIconMap.set(['glm'], IconFileJsonl);
ModelIconMap.set(['kimi'], KimiIcon);

const BasicDemo: React.FC = () => {
  return (
    <div>
      <Space>
        <ModelIcon type="meta" />
        <ModelIcon type="glm" size="24" />
        <ModelIcon type="kimi" style={{ color: 'red' }} />
      </Space>
    </div>
  );
};

export default BasicDemo;
