import React from 'react';
import { Space } from '@arco-design/web-react';
import AddButton from '../index';
import FileIcon from '../../FileIcon';

const BasicDemo: React.FC = () => {
  return (
    <div>
      <Space>
        <AddButton />
        <AddButton>创建镜像</AddButton>
        <AddButton>
          <FileIcon type="excel" />
          添加数据集
        </AddButton>
      </Space>
    </div>
  );
};

export default BasicDemo;
