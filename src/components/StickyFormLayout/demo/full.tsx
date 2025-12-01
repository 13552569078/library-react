import React from 'react';
import StickyFormLayout from '../index';
import BreadCrumbHeader from '../../BreadcrumbHeader';

const BasicDemo: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const Title: React.FC = () => {
    return (
      <div style={{ display: 'flex', height: 64, alignItems: 'center' }}>
        <BreadCrumbHeader showArrow={false} list={[{ name: `创建任务` }]} />
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
    <div style={{ height: 400, overflow: 'auto', backgroundColor: '#efefef', paddingBottom: 20 }}>
      <div style={{ height: 50, backgroundColor: 'grey' }}>Header</div>
      <StickyFormLayout
        title={<Title />}
        loading={loading}
        onConfirm={() => {
          setLoading(true);
        }}
        onCancel={() => {
          setLoading(false);
        }}
      >
        <LongContent lines={80} />
      </StickyFormLayout>
    </div>
  );
};

export default BasicDemo;
