import React, { useCallback } from 'react';
import { Dropdown, Tooltip, Link, Menu } from '@arco-design/web-react';
import { IconDown } from '@arco-design/web-react/icon';
import classNames from 'classnames';
import './index.scss';

export type ActionItem = {
  name: string;
  priority: number; // 优先级，越小优先级越高
  tips?: string; // 提示信息
  disabled?: boolean; // 是否禁用
  onClick?: () => void; // 点击事件
  [x: string]: any;
};

export interface OperationMenuProps {
  actions: ActionItem[];
  className?: string; // 可选的外部样式类名
  displayNum?: number; // 显示的操作数量
}
const OperationMenu: React.FC<OperationMenuProps> = ({
  actions,
  className,
  displayNum = 2,
}: OperationMenuProps) => {
  // 按 disabled（false 在前）-> priority（小在前）排序
  const sortedActions = actions.sort(
    (a, b) =>
      Number(a.disabled ?? false) - Number(b.disabled ?? false) ||
      (a.priority ?? 0) - (b.priority ?? 0),
  );
  const generateActionItem = useCallback(
    (item: ActionItem) => (
      <Tooltip content={item.disabled ? item.tips : ''} key={item.name}>
        <Link disabled={item.disabled ?? false} onClick={item.onClick}>
          {item.name}
        </Link>
      </Tooltip>
    ),
    [],
  );

  // 计算是否有需要显示在"更多"下拉菜单中的操作
  const hasMoreActions = sortedActions.length > displayNum;

  return (
    <div className={classNames('aa-operation-menu', `${className || ''}`)}>
      {sortedActions.slice(0, displayNum).map((action) => generateActionItem(action))}

      {hasMoreActions && (
        <Dropdown
          droplist={
            <Menu>
              {sortedActions.slice(displayNum).map((action) => (
                <Menu.Item key={action.name} disabled={action.disabled}>
                  {generateActionItem(action)}
                </Menu.Item>
              ))}
            </Menu>
          }
          position="bl"
        >
          <Link className={'has-more'}>
            更多
            <IconDown className="down-icon" />
          </Link>
        </Dropdown>
      )}
    </div>
  );
};

export default OperationMenu;
