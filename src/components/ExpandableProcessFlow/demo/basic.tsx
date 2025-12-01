import React from 'react';
import ExpandableProcessFlow from '../index';
import { ProcessStep } from '../ProcessFlow';
import {
  IconStorage,
  IconSettings,
  IconSend,
  IconCode,
  IconPlus,
} from '@arco-design/web-react/icon';
import { Space } from '@arco-design/web-react';

const BasicDemo: React.FC = () => {
  // 示例1：大模型训练流程
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

  // 示例2：任务创建流程
  const taskCreationSteps: ProcessStep[] = [
    {
      icon: <IconPlus style={{ fontSize: '24px' }} />,
      title: '创建任务',
      description: '配置任务基本信息，完成镜像制作和资源配置',
    },
    {
      icon: <IconSettings style={{ fontSize: '24px' }} />,
      title: '启动任务',
      description: '完成镜像制作任务启动后自动启动开发环境运行',
    },
    {
      icon: <IconCode style={{ fontSize: '24px' }} />,
      title: '打开工作台',
      description: '任务运行后点击打开按钮，进入开发环境进行开发',
    },
    {
      icon: <IconSend style={{ fontSize: '24px' }} />,
      title: '发布模型',
      description: '完成开发后，前往我的模型列表，点击创建模型进行发布',
    },
  ];

  const handleExpandChange = (expanded: boolean) => {
    console.log('流程展开状态:', expanded);
  };

  return (
    <Space direction="vertical">
      <ExpandableProcessFlow
        title="大模型训练"
        description="基于领域数据或场景数据进一步调优，使得大模型的输出更符合业务需求，提升模型在特定场景下的表现效果"
        toggleText="模型训练流程"
        steps={modelTrainingSteps}
        defaultExpanded={false}
        onExpandChange={handleExpandChange}
      />
      <ExpandableProcessFlow
        title="任务创建与管理"
        description="从任务创建到模型发布的完整流程，包括环境配置、开发调试、模型训练等关键步骤"
        toggleText="任务创建流程"
        steps={taskCreationSteps}
        defaultExpanded={true}
        onExpandChange={handleExpandChange}
      />
      <ExpandableProcessFlow
        title="自定义样式示例"
        description="展示如何通过自定义样式类名来改变组件的外观和风格"
        toggleText="查看详细流程"
        steps={modelTrainingSteps}
        defaultExpanded={false}
        className="bg-transparent"
        headerClassName="bg-blue-100"
        flowClassName="bg-white"
        onExpandChange={handleExpandChange}
      />
    </Space>
  );
};

export default BasicDemo;
