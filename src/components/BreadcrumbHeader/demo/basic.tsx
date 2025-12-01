import React from 'react';
import BreadcrumbHeader from '../index';

const BasicDemo: React.FC = () => {
  return (
    <div>
      <BreadcrumbHeader
        list={[
          { name: '我的数据集', href: '/tenant/compute/aispace/dataset' },
          { name: '数据集详情' },
        ]}
      />
    </div>
  );
};

export default BasicDemo;
