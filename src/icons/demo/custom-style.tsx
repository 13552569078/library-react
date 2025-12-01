import React from 'react';
import { IconFileApk, IconFileAudio } from '../index';

export default () => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
    <button
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        border: '1px solid #165dff',
        borderRadius: '6px',
        background: '#165dff',
        color: 'white',
        cursor: 'pointer',
      }}
    >
      <IconFileApk size={16} />
      搜索
    </button>

    <button
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        border: '1px solid #e5e6eb',
        borderRadius: '6px',
        background: 'white',
        color: '#1d2129',
        cursor: 'pointer',
      }}
    >
      <IconFileAudio size={16} />
      设置
    </button>
  </div>
);
