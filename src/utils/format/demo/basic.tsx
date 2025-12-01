import React from 'react';
import { Space } from '@arco-design/web-react';
import { formatFileSize, formatSeconds, formatSecondsToObject } from '../index';

const FormatDemo: React.FC = () => {
  return (
    <div>
      <Space direction="vertical">
        <div>
          <div>
            <b>formatFileSize</b>
          </div>
          文件字节数：34783434，结果：<strong>{formatFileSize(34783434)}</strong>
        </div>
        <div>
          <div>
            <b>formatSeconds</b>
          </div>
          秒：36000，结果：<strong>{formatSeconds(36000)}</strong>
        </div>
        <div>
          <div>
            <b>formatSecondsToObject</b>
          </div>
          秒：36000，结果：<strong>{`${JSON.stringify(formatSecondsToObject(36000))}`}</strong>
        </div>
      </Space>
    </div>
  );
};

export default FormatDemo;
