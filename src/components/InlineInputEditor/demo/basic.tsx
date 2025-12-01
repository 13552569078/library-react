import React from 'react';
import { Message, Space } from '@arco-design/web-react';
import InlineInputEditor from '../index';

const BasicDemo: React.FC = () => {
  return (
    <Space direction="vertical">
      <InlineInputEditor
        value={'描述信息'}
        onChange={(newDescription) => {
          if (newDescription && newDescription.length > 20) {
            Message.error('任务描述不能超过200个字符');
            return false;
          }
          return true;
        }}
        onEnd={async (finalValue?: string) => {
          const safeValue = finalValue ?? '';
          console.log('finalValue', finalValue);
        }}
        placeholder="请输入任务描述"
      />
      <div style={{ width: 100 }}>
        <InlineInputEditor
          value={
            '描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息'
          }
          onChange={(newDescription) => {
            if (newDescription && newDescription.length > 20) {
              Message.error('任务描述不能超过200个字符');
              return false;
            }
            return true;
          }}
          onEnd={async (finalValue?: string) => {
            const safeValue = finalValue ?? '';
            console.log('finalValue', finalValue);
          }}
          placeholder="请输入任务描述"
        />
      </div>
    </Space>
  );
};

export default BasicDemo;
