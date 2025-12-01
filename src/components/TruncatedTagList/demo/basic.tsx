import React from 'react';
import TruncatedTagList from '../index';
import { Space } from '@arco-design/web-react';

const BasicDemo: React.FC = () => {
  return (
    <Space direction="vertical">
      <div style={{ width: 400 }}>
        <TruncatedTagList
          tagList={[
            'xxxxdx',
            'sdfaxxxs',
            'asdfaxxx',
            'asdfadfas',
            'asdfasdasf',
            'asdfasdfasdf',
            'asdfaxxxxdxxxxdxxxxdxxxxdxxxxdxxxxdxxxxdxxxxdwerw',
            'asdfaxxxxdxxxxdxxxxdxxxxdxxxxdxxxxdxxxxdxxxxdwerw',
            'asdfaxxxxdxxxxdxxxxdxxxxdxxxxdxxxxdxxxxdxxxxdwerw',
          ]}
        />
      </div>
      <TruncatedTagList
        tagList={['xxxxdx', 'sdfaxxxs', 'asdfaxxx', 'asdfadfas', 'asdfasdasf', 'asdfasdfasdf']}
      />
    </Space>
  );
};

export default BasicDemo;
