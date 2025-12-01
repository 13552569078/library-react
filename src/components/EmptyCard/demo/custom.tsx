import React from 'react';
import { Divider, Space } from '@arco-design/web-react';
import { NoOtherCard } from '../index';
import FileIcon from '../../FileIcon';

const BasicDemo: React.FC = () => {
  return (
    <div>
      <Space>
        <NoOtherCard
          title="出错了"
          desc="请检查一下"
          primaryBtnProps={{ text: '报告错误' }}
          secondaryBtnProps={{ text: '导出错误' }}
        />
      </Space>
      <Divider />
      <Space>
        <NoOtherCard
          icon={<FileIcon type="png" size={64} />}
          title="出错误啦"
          desc="请联系管理员添加权限"
        />
      </Space>
    </div>
  );
};

export default BasicDemo;
