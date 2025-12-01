import React from 'react';
import { Space } from '@arco-design/web-react';
import EllipsisPopover from '../index';

const BasicDemo: React.FC = () => {
  return (
    <div>
      <Space direction="vertical">
        <div style={{ width: 100 }}>
          <EllipsisPopover
            value="这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的文字"
            preferTypography
          />
        </div>
        <div style={{ width: 100 }}>
          <EllipsisPopover
            value="不支持Link，这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的文字"
            preferTypography
            isLink
          />
        </div>
      </Space>
    </div>
  );
};

export default BasicDemo;
