import React from 'react';
import { Divider, Space } from '@arco-design/web-react';
import EllipsisPopover from '../index';

const BasicDemo: React.FC = () => {
  return (
    <div>
      <Space>
        <div style={{ width: 200 }}>
          <EllipsisPopover value="没有超长，不显示Popover" />
        </div>
      </Space>
      <Divider />
      <Space direction="vertical">
        <div style={{ width: 100 }}>
          <EllipsisPopover value="这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的文字" />
        </div>
        <div style={{ width: 100 }}>
          <EllipsisPopover
            value="这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的文字"
            isCopy
            isLink
          />
        </div>
      </Space>
    </div>
  );
};

export default BasicDemo;
