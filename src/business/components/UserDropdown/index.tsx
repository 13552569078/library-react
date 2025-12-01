import React from 'react';
import { Dropdown, Menu } from '@arco-design/web-react';
import { IconUser } from '@arco-design/web-react/icon';
import './index.scss';

export default function UserDropdown({
  userInfo,
  logout,
  accountCallback,
}: {
  userInfo: Record<string, any>;
  logout: () => void;
  accountCallback: () => void;
}) {
  const onClickUserDropdown = (action: string) => {
    switch (action) {
      case 'logout':
        logout();
        break;
      case 'account':
        accountCallback();
        break;
      default:
        break;
    }
  };
  return (
    <Dropdown
      droplist={
        <Menu className="aa-user-dropdown-menu" onClickMenuItem={onClickUserDropdown}>
          <Menu.Item key="user" className="menu-name">
            <div className="name-left">
              <div className="name-avatar">
                <IconUser />
              </div>
              <span className="name-value">{userInfo?.name}</span>
            </div>
            <div className="name-right">{userInfo?.roles?.[0]?.name}</div>
          </Menu.Item>
          {userInfo?.organization?.id !== '' && (
            <Menu.Item key="org" className="menu-org">
              组织：{userInfo?.organization?.name}
            </Menu.Item>
          )}

          <Menu.Item key="account">我的账号</Menu.Item>
          <Menu.Item key="logout">退出登录</Menu.Item>
        </Menu>
      }
      position="bl"
      triggerProps={{
        className: 'aa-user-dropdown-popup',
      }}
    >
      <div className="aa-user-dropdown-avatar">
        <IconUser />
      </div>
    </Dropdown>
  );
}
