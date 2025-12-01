import React from 'react';
import { IconFileApk, IconFileAudio } from '../index';
import { Message } from '@arco-design/web-react';

export default () => (
  <div style={{ display: 'flex', gap: '16px' }}>
    <IconFileApk
      size={24}
      style={{ cursor: 'pointer' }}
      onClick={() => Message.success('添加成功')}
    />
    <IconFileAudio
      size={24}
      color="#f53f3f"
      style={{ cursor: 'pointer' }}
      onClick={() => Message.warning('确认删除？')}
    />
  </div>
);
