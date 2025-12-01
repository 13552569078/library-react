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

  const LongContent: React.FC<{ lines?: number }> = ({ lines = 60 }) => (
    <div style={{ padding: 16 }}>
      {Array.from({ length: lines }).map((_, i) => (
        <p key={i} style={{ margin: '10px 0' }}>
          第 {i + 1} 行占位内容 —— 这是用于演示 container 滚动并吸顶的长内容。
        </p>
      ))}
    </div>
  );

  return (
    <div style={{ height: 400, overflow: 'auto', backgroundColor: '#efefef', padding: 20 }}>
      <StickyFormLayout title={<Title />} onConfirm={() => {}} onCancel={() => {}}>
        <LongContent lines={80} />
      </StickyFormLayout>
    </div>
  );
};

export default BasicDemo;
