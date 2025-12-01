import React from 'react';
import { Tooltip } from '@arco-design/web-react';
import { IconCopy } from '@arco-design/web-react/icon';
import { copyToClipboard } from '../../utils/copyToClipboard';
import './index.scss';

const CopyItemIcon: React.FC<{ value: string; className?: string }> = ({
  value,
  className = '',
}) => {
  return (
    <div className={`aa-copy-item ${className}`}>
      <Tooltip content="复制">
        <IconCopy
          className="icon-copy"
          onClick={() => {
            copyToClipboard(value);
          }}
        />
      </Tooltip>
    </div>
  );
};

export default CopyItemIcon;
