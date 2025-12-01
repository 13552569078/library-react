import React from 'react';
import StickyFormLayout from '../index';

const BasicDemo: React.FC = () => {
  const Title: React.FC = () => {
    return (
      <div
        style={{
          padding: '16px 20px',
          background: '#1677ff',
          color: '#fff',
          // position: 'relative'
        }}
      >
        <h1 style={{ margin: 0, fontSize: 20 }}>页面标题</h1>
        <p style={{ margin: '6px 0 0 0', opacity: 0.9 }}>滚动直到标题不可见时，内容区会吸顶</p>
      </div>
    );
  };

  const ShortContent: React.FC = () => (
    <div style={{ padding: 16 }}>
      <p>这是较短的内容。当总高度不足以撑满屏幕时，footer 会跟随在后，不会强制吸底。</p>
      <p>当页面向上滚动时，footer 会吸底。</p>
    </div>
  );

  return (
    <div style={{ height: 200, overflow: 'auto', backgroundColor: '#efefef', padding: 20 }}>
      <StickyFormLayout title={<Title />} onConfirm={() => {}} onCancel={() => {}}>
        <ShortContent />
      </StickyFormLayout>
    </div>
  );
};

export default BasicDemo;
