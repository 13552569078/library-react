import React from 'react';
import { IconRight } from '@arco-design/web-react/icon';
import './process-flow.scss';

export interface ProcessStep {
  /**
   * 步骤图标
   */
  icon: React.ReactNode;
  /**
   * 步骤标题
   */
  title: string;
  /**
   * 步骤描述
   */
  description: string;
  /**
   * 步骤的主题色（可选）
   */
  color?: string;
}

export interface ProcessFlowProps {
  /**
   * 流程步骤数据
   */
  steps: ProcessStep[];
  /**
   * 自定义容器样式类名
   */
  className?: string;
  /**
   * 自定义步骤项样式类名
   */
  stepClassName?: string;
  /**
   * 自定义箭头图标
   */
  arrowIcon?: React.ReactNode;
  seperatorClassName?: string;
  /**
   * 是否显示边框
   */
  bordered?: boolean;
}

/**
 * 流程组件
 *
 * 特性：
 * - 支持动态步骤数据
 * - 可自定义图标、标题、描述
 * - 响应式布局
 * - 可配置边框和样式
 */
const ProcessFlow: React.FC<ProcessFlowProps> = ({
  steps,
  className = '',
  stepClassName = '',
  seperatorClassName = '',
  arrowIcon = <IconRight className="text-[#3370FF]" />,
  bordered = true,
}) => {
  return (
    <div
      className={`
        ${bordered ? 'bordered rounded-lg border border-gray-200' : ''}
        aa-process-flow rounded-xl bg-[var(--color-bg-3)] px-5 py-4
        ${className}`}
    >
      <div className="flow-steps flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {/* 步骤项 */}
            <div
              className={`
                flow-step
                flex
                flex-1
                items-center
                gap-2
                ${stepClassName}
              `}
            >
              {/* 内容区域 */}
              <div className="step-content mr-0 min-w-0 flex-1">
                <h3 className="step-title text-base font-semibold text-[var(--color-text-1)]">
                  {step.title}
                </h3>
                <p className="step-description text-[12px] leading-relaxed text-[#6E7B8D]">
                  {step.description}
                </p>
              </div>

              {/* 图标区域 */}
              <div className="step-icon-wrapper flex-shrink-0">
                <div className="step-icon flex h-20 w-20 items-center justify-center text-blue-600">
                  {step.icon}
                </div>
              </div>
            </div>

            {/* 箭头分隔符 */}
            {index < steps.length - 1 && (
              <div
                className={`step-separator-wrapper mx-3 flex flex-shrink-0 items-center ${seperatorClassName}`}
              >
                <div className="step-separator text-2xl text-gray-400">{arrowIcon}</div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProcessFlow;
