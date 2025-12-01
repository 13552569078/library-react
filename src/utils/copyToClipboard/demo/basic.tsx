import React, { useState } from 'react';
import {
  Button,
  Input,
  Card,
  Space,
  Typography,
  Tag,
  Message,
  Alert,
} from '@arco-design/web-react';
import {
  IconCopy,
  IconCheck,
  IconClose,
  IconCode,
  IconLink,
  IconUser,
} from '@arco-design/web-react/icon';
import { copyToClipboard, isCopySupported, CopyResult } from '../index';

const { Text, Paragraph } = Typography;
const { TextArea } = Input;

const CopyToClipboardDemo: React.FC = () => {
  const [customText, setCustomText] = useState('这是自定义的文本内容');
  const [lastResult, setLastResult] = useState<CopyResult | null>(null);
  const [isSupported] = useState(isCopySupported());

  // 处理复制操作
  const handleCopy = async (text: string, description?: string) => {
    try {
      const result = await copyToClipboard(text);
      setLastResult(result);

      if (description) {
        console.log(`${description}:`, result);
      }
    } catch (error) {
      console.error('复制失败:', error);
      Message.error('复制失败，请重试');
    }
  };

  // 预设的复制内容
  const presetTexts = [
    {
      label: '简单文本',
      text: 'Hello World!',
      icon: <IconUser />,
      description: '复制简单文本',
    },
    {
      label: '代码片段',
      text: `import { copyToClipboard } from 'ai-arco-material';

const handleCopy = async () => {
  const result = await copyToClipboard('Hello World!');
  console.log(result);
};`,
      icon: <IconCode />,
      description: '复制代码片段',
    },
    {
      label: 'URL 链接',
      text: 'https://arco.design/react/components/button',
      icon: <IconLink />,
      description: '复制链接地址',
    },
    {
      label: '长文本',
      text: `这是一段很长的文本内容，用来测试复制功能对长文本的处理能力。
包含多行内容，特殊字符：!@#$%^&*()_+-={}[]|\\:";'<>?,./
以及中文、English、数字123456789等各种字符类型。
这样可以全面测试复制功能的兼容性和稳定性。`,
      icon: <IconCopy />,
      description: '复制长文本',
    },
  ];

  // 渲染复制结果状态
  const renderResultStatus = (result: CopyResult) => {
    const statusConfig = {
      clipboard: { color: 'green', text: 'Clipboard API' },
      execCommand: { color: 'orange', text: 'ExecCommand' },
      failed: { color: 'red', text: '复制失败' },
    };

    const config = statusConfig[result.method];

    return (
      <Space>
        {result.success ? (
          <IconCheck style={{ color: '#00b42a' }} />
        ) : (
          <IconClose style={{ color: '#f53f3f' }} />
        )}
        <Text>{result.message}</Text>
        <Tag color={config.color}>{config.text}</Tag>
      </Space>
    );
  };

  return (
    <div>
      {/* 环境支持检测 */}
      <Alert
        type={isSupported ? 'success' : 'warning'}
        content={
          isSupported ? '当前环境支持复制功能' : '当前环境不支持复制功能，某些功能可能无法正常工作'
        }
        style={{ marginBottom: 16 }}
      />

      {/* 基础用法 */}
      <Card title="基础用法" style={{ marginBottom: 16 }}>
        <Space wrap>
          {presetTexts.map((item, index) => (
            <Button
              key={index}
              icon={item.icon}
              onClick={() => handleCopy(item.text, item.description)}
            >
              复制{item.label}
            </Button>
          ))}
        </Space>
      </Card>

      {/* 自定义文本复制 */}
      <Card title="自定义文本复制" style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Text>输入要复制的文本：</Text>
            <TextArea
              value={customText}
              onChange={setCustomText}
              placeholder="请输入要复制的文本内容"
              autoSize={{ minRows: 3, maxRows: 6 }}
              style={{ marginTop: 8 }}
            />
          </div>
          <Button
            type="primary"
            icon={<IconCopy />}
            onClick={() => handleCopy(customText, '自定义文本')}
            disabled={!customText.trim()}
          >
            复制文本
          </Button>
        </Space>
      </Card>

      {/* 复制结果展示 */}
      {lastResult && (
        <Card title="最近复制结果" style={{ marginBottom: 16 }}>
          {renderResultStatus(lastResult)}
        </Card>
      )}
    </div>
  );
};

export default CopyToClipboardDemo;
