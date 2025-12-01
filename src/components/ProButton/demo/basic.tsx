import React from 'react';
import { Space, Message, Divider } from '@arco-design/web-react';
import { IconPlus, IconDownload, IconDelete, IconEdit } from '@arco-design/web-react/icon';
import ProButton from '../index';

const BasicDemo: React.FC = () => {
  // 模拟异步操作
  const handleAsyncOperation = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    Message.success('操作成功！');
  };

  // 模拟 API 调用
  const handleApiCall = async () => {
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          Math.random() > 0.3 ? resolve('success') : reject(new Error('网络错误'));
        }, 1500);
      });
      Message.success('数据获取成功！');
    } catch (error) {
      Message.error('操作失败，请重试');
    }
  };

  // 模拟文件上传
  const handleUpload = async () => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    Message.success('文件上传完成！');
  };

  return (
    <div>
      <h3>基础用法</h3>
      <Space>
        <ProButton>默认按钮</ProButton>
        <ProButton type="primary">主要按钮</ProButton>
        <ProButton type="secondary">次要按钮</ProButton>
        <ProButton type="outline">线框按钮</ProButton>
        <ProButton type="dashed">虚线按钮</ProButton>
        <ProButton type="text">文本按钮</ProButton>
      </Space>

      <Divider />

      <h3>不同尺寸</h3>
      <Space>
        <ProButton size="mini">迷你按钮</ProButton>
        <ProButton size="small">小型按钮</ProButton>
        <ProButton size="default">默认按钮</ProButton>
        <ProButton size="large">大型按钮</ProButton>
      </Space>

      <Divider />

      <h3>按钮状态</h3>
      <Space>
        <ProButton status="warning">警告按钮</ProButton>
        <ProButton status="danger">危险按钮</ProButton>
        <ProButton status="success">成功按钮</ProButton>
        <ProButton disabled>禁用按钮</ProButton>
      </Space>

      <Divider />

      <h3>带图标</h3>
      <Space>
        <ProButton icon={<IconPlus />} type="primary">
          新增
        </ProButton>
        <ProButton icon={<IconEdit />} type="outline">
          编辑
        </ProButton>
        <ProButton icon={<IconDelete />} status="danger">
          删除
        </ProButton>
        <ProButton icon={<IconDownload />} iconOnly />
      </Space>

      <Divider />

      <h3>异步操作</h3>
      <Space>
        <ProButton
          type="primary"
          onClick={handleAsyncOperation}
          loadingText="处理中..."
        >
          异步操作
        </ProButton>

        <ProButton
          type="outline"
          onClick={handleApiCall}
          loadingText="获取中..."
        >
          API 调用
        </ProButton>

        <ProButton
          icon={<IconDownload />}
          onClick={handleUpload}
          loadingText="上传中..."
        >
          文件上传
        </ProButton>
      </Space>

      <Divider />

      <h3>按钮形状</h3>
      <Space>
        <ProButton shape="square" icon={<IconPlus />} />
        <ProButton shape="round" type="primary">圆角按钮</ProButton>
        <ProButton shape="circle" icon={<IconEdit />} type="outline" />
      </Space>

      <Divider />

      <h3>长按钮</h3>
      <div style={{ width: '300px' }}>
        <ProButton
          long
          type="primary"
          onClick={handleAsyncOperation}
          loadingText="提交中..."
        >
          提交表单
        </ProButton>
      </div>
    </div>
  );
};

export default BasicDemo;