import React from 'react';
import { Button, Link, Space } from '@arco-design/web-react';
import { NoDataCard } from '../index';
import { IconPlus } from '@arco-design/web-react/icon';

const BasicDemo: React.FC = () => {
  return (
    <div>
      <Space>
        <NoDataCard
          title="没有数据"
          desc="是否创建数据"
          primaryBtn={<Link href="#">Link</Link>}
          secondaryBtn={<Button shape="circle" type="outline" icon={<IconPlus />} />}
        />
        <NoDataCard
          title="没有数据"
          desc="是否创建数据"
          primaryBtn={<Link href="#">Link</Link>}
          primaryBtnProps={{ text: '创建数据源' }}
          secondaryBtn={<Button shape="circle" type="outline" icon={<IconPlus />} />}
        />
      </Space>
    </div>
  );
};

export default BasicDemo;
