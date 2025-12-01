import React from 'react';
import { Form } from '@arco-design/web-react';
import Switcher from '../index';

const BasicDemo: React.FC = () => {
  return (
    <Form autoComplete="off">
      <Form.Item label="最大超时时长(秒)" colon field="timeout">
        <Switcher />
      </Form.Item>
    </Form>
  );
};

export default BasicDemo;
