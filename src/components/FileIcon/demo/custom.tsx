import React from 'react';
import { Space } from '@arco-design/web-react';
import FileIcon, { FileIconMap } from '../index';
import { IconFileJsonl } from '../../../icons';

const IpaIcon = (props: any) => {
  return <span {...props}>&#128051;</span>;
};

FileIconMap.set(['json5'], IconFileJsonl);
FileIconMap.set(['ipa'], IpaIcon);

const BasicDemo: React.FC = () => {
  return (
    <div>
      <Space>
        <FileIcon type="json5" />
        <FileIcon type=".json5" size="24" />
        <FileIcon type=".ipa" size="24" />
      </Space>
    </div>
  );
};

export default BasicDemo;
