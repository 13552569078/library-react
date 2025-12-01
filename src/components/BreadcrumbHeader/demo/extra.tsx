import React from 'react';
import BreadcrumbHeader from '../index';
import RefreshLink from '../../RefreshLink';

const BasicDemo: React.FC = () => {
  return (
    <div>
      <BreadcrumbHeader
        list={[
          { name: '我的数据集', href: '/tenant/compute/aispace/dataset' },
          { name: '私有数据', href: '/tenant/compute/aispace/dataset' },
          { name: 'yoloV7 数据集' },
        ]}
        extra={
          <>
            <RefreshLink style={{ marginLeft: '6px', marginRight: '4px' }} />
          </>
        }
      />
    </div>
  );
};

export default BasicDemo;
