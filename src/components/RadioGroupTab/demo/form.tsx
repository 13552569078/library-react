import React from 'react';
import { Form } from '@arco-design/web-react';
import InputNumberWithLabel from '../index';

const BasicDemo: React.FC = () => {
  return (
    <Form autoComplete="off">
      <Form.Item label="保存位置" colon required>
        <InputNumberWithLabel
          type="button"
          options={[
            { value: 'Preset', label: '默认存储卷' },
            { value: 'Select', label: '选择存储卷' },
          ]}
          defaultValue={'Preset'}
        />
      </Form.Item>
    </Form>
  );
};

export default BasicDemo;
