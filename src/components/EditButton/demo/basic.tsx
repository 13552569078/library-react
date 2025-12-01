import React from 'react';
import { Space } from '@arco-design/web-react';
import EditButton from '../index';
import FileIcon from '../../FileIcon';

const BasicDemo: React.FC = () => {
  return (
    <div>
      <Space>
        <EditButton />
        <EditButton text="编辑镜像" />
        <EditButton>
          <FileIcon type="excel" />
          编辑数据集
        </EditButton>
      </Space>
    </div>
  );
};

export default BasicDemo;
