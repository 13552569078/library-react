import React from 'react';
import { Form } from '@arco-design/web-react';
import InputNumberWithLabel from '../index';

const BasicDemo: React.FC = () => {
  return (
    <Form autoComplete="off">
      <Form.Item label="最大超时时长(秒)" colon field="timeout">
        <InputNumberWithLabel
          placeholder="请输入最大超时时长"
          min={1}
          max={300}
          style={{ width: 160 }}
          label="当前最大支持300秒"
        />
      </Form.Item>
    </Form>
  );
};

export default BasicDemo;
