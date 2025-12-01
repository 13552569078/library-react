import React, { useState } from 'react';
import { Button, Card, Form, Input, Space } from '@arco-design/web-react';
import { isRequestSuccess, LoginLogoBase64Png } from '../../utils';
import './index.scss';

const LoginCard = (props: {
  title: string;
  logo?: string;
  login: (info: Record<string, any>) => Promise<{ statusCode: number }>;
  targetUrl: string | (() => Promise<string>);
  go: (url: string) => void;
}) => {
  const { login, targetUrl, title, go, logo } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // 获取重定向URL
  const getRedirectPath = async () => {
    const params = new URLSearchParams(location.search);
    const redirectUri = params.get('redirect_uri');
    if (redirectUri) {
      try {
        const url = new URL(redirectUri);
        // 只返回路径部分，不包括域名
        return url.pathname + url.search + url.hash;
      } catch (e) {
        console.error('Invalid redirect URL:', e);
      }
    }

    if (typeof targetUrl === 'string') {
      return targetUrl;
    } else {
      const url = await targetUrl();
      return url;
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const res = await login(values);
      console.log('登录结果', res);
      if (isRequestSuccess(res)) {
        // 重定向到之前的页面或默认页面
        const redirectPath = await getRedirectPath();
        go(redirectPath);
      }
    } catch (error) {
      console.error('登录失败:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      className="aa-login-card"
      bordered={false}
      style={{
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        padding: '20px 2px',
      }}
    >
      {/* Logo 和标题部分 */}
      <Header title={title} logo={logo} />

      {/* 表单部分 */}
      <Form form={form} requiredSymbol={false} layout="vertical" onSubmit={handleSubmit}>
        <Form.Item
          label={<div className="label-username">用户名</div>}
          field="account"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item
          label={<div className="label-password">密码</div>}
          field="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            long
            htmlType="submit"
            className="submit-btn"
            loading={loading}
            disabled={loading}
          >
            {loading ? '登录中...' : '登录'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginCard;

function Header({ title, logo }: { title?: string; logo?: string }) {
  return (
    <div className="card-header">
      <Space className="">
        <img className="" src={logo || LoginLogoBase64Png} />
        <div className="separator"></div>
        <div className="product-title">{title}</div>
      </Space>
    </div>
  );
}
