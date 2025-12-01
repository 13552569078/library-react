import React, { useState } from 'react';
import { IconUp, IconDown } from '@arco-design/web-react/icon';
import ProcessFlow, { ProcessStep } from './ProcessFlow';
import classNames from 'classnames';
import './index.scss';

export interface ExpandableProcessFlowProps {
  /**
   * 流程标题
   */
  title: string;
  /**
   * 流程描述
   */
  description: string;
  /**
   * 展开/收起按钮文字
   */
  toggleText?: string;
  /**
   * 流程步骤数据
   */
  steps: ProcessStep[];
  /**
   * 默认是否展开
   */
  defaultExpanded?: boolean;
  /**
   * 自定义容器样式类名
   */
  className?: string;
  /**
   * 自定义头部样式类名
   */
  headerClassName?: string;
  flowWrapperClassName?: string;
  /**
   * 自定义流程区域样式类名
   */
  flowClassName?: string;
  seperatorClassName?: string;
  /**
   * 展开状态变化回调
   */
  onExpandChange?: (expanded: boolean) => void;
}

/**
 * 可展开收起的流程组件
 *
 * 特性：
 * - 包含标题和描述的头部区域
 * - 可展开收起的流程图
 * - 自定义展开按钮文字
 * - 支持默认展开状态
 * - 平滑的展开收起动画
 *
 * @example
 * ```tsx
 * const steps = [
 *   {
 *     icon: <IconStorage />,
 *     title: '数据准备',
 *     description: '清洗外部或选择数据集'
 *   }
 * ];
 *
 * <ExpandableProcessFlow
 *   title="大模型训练"
 *   description="基于领域数据或场景数据进一步调优，使得大模型的输出更符合业务需求"
 *   toggleText="模型训练流程"
 *   steps={steps}
 *   defaultExpanded={false}
 * />
 * ```
 */
const ExpandableProcessFlow: React.FC<ExpandableProcessFlowProps> = ({
  title,
  description,
  toggleText = '查看流程',
  steps,
  defaultExpanded = false,
  className = '',
  headerClassName = '',
  flowWrapperClassName = '',
  flowClassName = '',
  seperatorClassName = '',
  onExpandChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleToggle = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    onExpandChange?.(newExpanded);
  };

  return (
    <div className={`aa-expandable-process-flow ${className}`}>
      {/* 头部区域 */}
      <div className={`${headerClassName}`}>
        <div className="flow-header flex items-end justify-between">
          {/* 左侧标题和描述 */}
          <div className="header-left flex-1 pr-6">
            <h2 className="title mb-2 text-xl font-semibold text-gray-900">{title}</h2>
            <p className="desc text-sm leading-relaxed text-[#334155]">{description}</p>
          </div>

          {/* 右侧展开按钮 */}
          <div className="header-right flex-shrink-0">
            <button
              onClick={handleToggle}
              className="expand-icon flex items-center gap-2 text-sm leading-relaxed transition-colors duration-200"
            >
              <span>{toggleText}</span>
              {isExpanded ? <IconUp className="h-4 w-4" /> : <IconDown className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* 流程图区域 - 可展开收起 */}
      <div
        className={classNames(
          'flow-content-wrapper overflow-hidden transition-all duration-300 ease-in-out',
          isExpanded ? 'expand max-h-96 opacity-100' : 'not-expand max-h-0 opacity-0',
        )}
      >
        <div className={`flow-content mt-4 ${flowWrapperClassName}`}>
          <ProcessFlow
            steps={steps}
            bordered={false}
            className={flowClassName}
            seperatorClassName={seperatorClassName}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpandableProcessFlow;
