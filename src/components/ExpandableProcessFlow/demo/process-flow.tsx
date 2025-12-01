import React from 'react';
import ProcessFlow, { ProcessStep } from '../ProcessFlow';
import { IconStorage, IconSettings, IconSend, IconPlus } from '@arco-design/web-react/icon';
import { Space } from '@arco-design/web-react';

const ProcessFlowExample: React.FC = () => {
  // 示例1：模型训练流程
  const modelTrainingSteps: ProcessStep[] = [
    {
      icon: <IconStorage style={{ fontSize: '24px' }} />,
      title: '数据准备',
      description: '清洗外部或选择数据集，确保选择可以完善上下文的数据',
    },
    {
      icon: <IconSettings style={{ fontSize: '24px' }} />,
      title: '模型训练',
      description: '选择合适的基础模型及训练方式，通过调参优化模型效果',
    },
    {
      icon: <IconSend style={{ fontSize: '24px' }} />,
      title: '发布模型',
      description: '训练完成后，发布模型至我的模型列表，点击可查看模型详情及发布效果',
    },
  ];

  // 示例3：简化流程
  const simpleSteps: ProcessStep[] = [
    {
      icon: <IconPlus style={{ fontSize: '24px' }} />,
      title: '创建任务',
      description: '配置任务基本信息，完成镜像制作和资源配置，开始进行任务状态自动流转【运行中】',
    },
    {
      icon: <IconSend style={{ fontSize: '24px' }} />,
      title: '发布模型',
      description: '完成开发后，前往我的模型列表，点击创建模型进行发布',
    },
  ];

  return (
    <Space direction="vertical">
      <div>
        <h2 className="mb-4 text-xl font-semibold">模型训练流程</h2>
        <ProcessFlow steps={modelTrainingSteps} />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">无边框样式</h2>
        <ProcessFlow steps={modelTrainingSteps} bordered={false} className="bg-gray-50" />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">自定义样式</h2>
        <ProcessFlow
          steps={simpleSteps}
          stepClassName="bg-gradient-to-r from-green-50 to-transparent"
          className="border-2 border-green-200"
        />
      </div>
    </Space>
  );
};

export default ProcessFlowExample;
