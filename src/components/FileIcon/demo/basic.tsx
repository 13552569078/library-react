import React from 'react';
import { Space } from '@arco-design/web-react';
import FileIcon from '../index';

const BasicDemo: React.FC = () => {
  return (
    <div>
      <Space>
        <FileIcon type="mp3" />
        <FileIcon type=".mp3" size="24" />
        <FileIcon type="audio" />
        <FileIcon type="xxxxx" />
      </Space>
    </div>
  );
};

export default BasicDemo;
