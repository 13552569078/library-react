import React, { useState, useRef, useEffect } from 'react';
import { Button, Space, Avatar, Message } from '@arco-design/web-react';
import type { FormInstance } from '@arco-design/web-react/es/Form';
import dayjs from 'dayjs';
import { UserEditModal } from './components/UserEditModal';
import { PasswordModal } from './components/PasswordModal';
import { isRequestSuccess } from '../../utils';
import { UserInfo } from '../../types';
import './index.scss';

const formatPhoneNumber = (phone: string = ''): string => {
  if (!phone || phone.length !== 11) return phone;
  return `${phone.substring(0, 3)}****${phone.substring(7)}`;
};

export default function UserInfoPage({
  userInfo,
  changePassword,
  updateUser,
  updateUserCallback,
}: {
  userInfo: UserInfo;
  changePassword: (params: Record<string, any>) => Promise<{ statusCode: number }>;
  updateUser: (params: Record<string, any>) => Promise<{ statusCode: number }>;
  updateUserCallback?: (newUserInfo: Record<string, any>) => void;
}) {
  const [editVisible, setEditVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const form = useRef<FormInstance>(null);
  const passwordForm = useRef<FormInstance>(null);

  // 当用户信息更新时，同步到表单
  useEffect(() => {
    if (userInfo) {
      form.current?.setFieldsValue(userInfo);
    }
  }, [userInfo]);

  console.log('userInfo', userInfo);

  return (
    <div className="aa-user-info-page">
      <div className="info-wrapper">
        <p className="info-title">我的账号</p>

        {/* 用户信息卡片 */}
        <div className="info-section user-info">
          <div className="section-wrapper">
            <div className="section-info">
              <Avatar size={64} className="ai-avatar">
                {userInfo?.name?.[0]?.toLocaleUpperCase()}
              </Avatar>
              <div className="user">
                <div className="name">{userInfo?.name}</div>
                <div className="account">{userInfo?.account}</div>
                <div className="phone">
                  <span className="phone-label">手机号</span>
                  <span className="phone-value">{formatPhoneNumber(userInfo?.phone)}</span>
                </div>
                <div className="time">
                  <span className="time-label">注册时间</span>
                  <span className="time-value">
                    {dayjs(userInfo?.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                  </span>
                </div>
              </div>
            </div>
            <Space size="large">
              <Button onClick={() => setEditVisible(true)}>编辑</Button>
            </Space>
          </div>
        </div>

        {/* 密码卡片 */}
        <div className="info-section password-info">
          <div className="password-action">
            <div className="action-title">登录密码</div>
            <Space size="large">
              <Button onClick={() => setPasswordVisible(true)}>修改密码</Button>
            </Space>
          </div>
          <div className="password-value">
            <span className="label">密码</span>
            <span className="value">*************</span>
          </div>
        </div>

        {/* 部门信息卡片 */}
        <div className="info-section department-info">
          <div className="info-title">部门信息</div>
          <div className="department">
            <span className="label">部门</span>
            <span className="value">{userInfo?.organization?.fullOrgPath}</span>
          </div>
          <div className="role">
            <span className="label">角色</span>
            <span className="value">{userInfo?.roles?.map((item) => item.name).join('、')}</span>
          </div>
        </div>
      </div>

      {/* 模态框保留原样 */}
      <UserEditModal
        visible={editVisible}
        onOk={async (values) => {
          // console.log('接收到的用户信息:', values);
          const res = await updateUser(values);
          if (isRequestSuccess(res)) {
            // 重置表单
            Message.success('修改成功');
            // 更新全局 store 中的用户信息
            updateUserCallback?.(values);
          }
          setEditVisible(false);
        }}
        onCancel={() => setEditVisible(false)}
        formRef={form}
        initialValues={{
          account: userInfo?.account || '',
          phone: userInfo?.phone || '',
          name: userInfo?.name || '',
        }}
      />

      <PasswordModal
        visible={passwordVisible}
        onOk={async (values) => {
          // console.log('接收到的密码信息:', values);
          const res = await changePassword({
            newPassword: values.newPassword,
            oldPassword: values.oldPassword,
          });

          if (isRequestSuccess(res)) {
            // 重置表单
            passwordForm.current?.resetFields();
            Message.success('修改成功');
          }
          setPasswordVisible(false);
        }}
        onCancel={() => {
          passwordForm.current?.resetFields();
          setPasswordVisible(false);
        }}
        formRef={passwordForm}
      />
    </div>
  );
}
