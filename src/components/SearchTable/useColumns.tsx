import React, { useMemo } from 'react';
import EllipsisPopover from '../EllipsisPopover';
import { Tooltip } from '@arco-design/web-react';
import { IconCopy } from '@arco-design/web-react/icon';
import { copyToClipboard } from '../../utils/copyToClipboard';

export default function useColumns({ columns }: { columns: any[] }) {
  const processedColumns = useMemo(() => {
    return columns?.map((col) => {
      const newCol = { ...col };

      if (col.isLink) {
        newCol.render = (value: any, record: Record<string, any>) => {
          return (
            <EllipsisPopover
              value={value}
              isLink={record.hasAccess}
              handleLink={() => {
                if (col.targetUrl && record.id && record.hasAccess) {
                  col.clickLink?.(`${col.targetUrl}?id=${record.id}`);
                }
              }}
              wrapperClassName="col-link"
            />
          );
        };
      } else if (col.isCopy) {
        newCol.render = (value: string) => {
          return (
            <div className="col-copy">
              <div className="copy-text">
                <EllipsisPopover value={value} />
              </div>
              <Tooltip content="复制">
                <IconCopy
                  className="copy-icon"
                  onClick={() => {
                    copyToClipboard(value);
                  }}
                />
              </Tooltip>
            </div>
          );
        };
      } else {
        if (!col.render) {
          newCol.render = (value: any) => <EllipsisPopover value={value} />;
        }
      }

      if (col.filters) {
        const filterDropdownProps = col.filterDropdownProps || {};
        newCol.filterDropdownProps = {
          triggerProps: {
            updateOnScroll: true,
            popupAlign: {
              bottom: 4,
            },
          },
          ...filterDropdownProps,
        };
      }

      return newCol;
    });
  }, [columns]);

  return { processedColumns };
}
