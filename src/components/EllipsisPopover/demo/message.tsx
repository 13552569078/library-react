import React from 'react';
import { Message, Space } from '@arco-design/web-react';
import EllipsisPopover from '../index';

const BasicDemo: React.FC = () => {
  return (
    <div>
      <Space>
        <div style={{ width: 100 }}>
          <EllipsisPopover
            value="这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的文字"
            isCopy
            isLink
            quiteMessage
            copySuccessCallback={() => {
              Message.success('自定义复制成功消息');
            }}
          />
        </div>
      </Space>
    </div>
  );
};

export default BasicDemo;
