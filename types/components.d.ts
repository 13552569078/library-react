// 组件相关类型定义

// 通用组件 Props
export interface BaseComponentProps {
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 子元素 */
  children?: React.ReactNode;
}

// 尺寸类型
export type ComponentSize = 'small' | 'medium' | 'large';

// 状态类型
export type ComponentStatus = 'default' | 'success' | 'warning' | 'error';

// 按钮类型
export type ButtonType = 'default' | 'primary' | 'secondary' | 'text' | 'link';

// 颜色类型
export type ThemeColor = 
  | 'primary' 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'info';

// 响应式断点
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

// 方向类型
export type Direction = 'horizontal' | 'vertical';

// 对齐方式
export type Alignment = 'left' | 'center' | 'right';

// 位置类型
export type Position = 'top' | 'bottom' | 'left' | 'right';

// 触发方式
export type TriggerType = 'hover' | 'click' | 'focus' | 'contextMenu';

// 加载状态
export interface LoadingState {
  loading: boolean;
  loadingText?: string;
}

// 分页配置
export interface PaginationConfig {
  current?: number;
  pageSize?: number;
  total?: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: boolean | ((total: number, range: [number, number]) => React.ReactNode);
}

// 表格列配置
export interface TableColumn<T = any> {
  key: string;
  title: React.ReactNode;
  dataIndex?: string;
  width?: number | string;
  fixed?: 'left' | 'right';
  align?: 'left' | 'center' | 'right';
  sorter?: boolean | ((a: T, b: T) => number);
  render?: (value: any, record: T, index: number) => React.ReactNode;
}

// 表单验证规则
export interface ValidationRule {
  required?: boolean;
  message?: string;
  pattern?: RegExp;
  min?: number;
  max?: number;
  validator?: (value: any) => boolean | Promise<boolean>;
}
