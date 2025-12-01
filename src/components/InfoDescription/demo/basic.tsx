import React from 'react';
import InfoDescription from '../index';
import { IconLlmDs, IconLlmQwen } from '../../../icons';

const BasicDemo: React.FC = () => {
  const detailData = [
    {
      title: '资源配置',
      items: [
        {
          label: '资源池ID',
          value: 'xxx-sss-dddd-ssss-xxxx-ssss-xxxx-ssss-xxxx-ssss-xxxx-xxxx',
          isCopy: true,
        },
        {
          label: '卡型',
          value: 'H100',
        },
        {
          label: '节点数',
          value: 10,
        },
        {
          label: '单节点GPU(卡数)',
          value: 5,
        },
        {
          label: '单节点CPU(核)',
          value: 5,
        },
        {
          label: '单节点内存(GiB)',
          value: 256,
        },
      ],
    },
    {
      title: '模型配置',
      column: 2,
      items: [
        {
          label: '名称',
          value: 'DS-671B',
        },
        {
          label: '公司',
          value: (
            <>
              <IconLlmDs size={16} />
              DS
            </>
          ),
        },
      ],
    },
    {
      title: '模型配置2',
      column: 2,
      items: [
        {
          label: '名称',
          value: 'QWen-70B',
        },
        {
          label: '公司',
          value: (
            <>
              <IconLlmQwen size={16} />
              Ali
            </>
          ),
        },
      ],
    },
  ];
  return <InfoDescription data={detailData} column={3} titleStyle={{ fontSize: '14px' }} />;
};

export default BasicDemo;
