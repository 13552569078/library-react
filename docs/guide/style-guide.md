---
nav: 样式开发规范
group:
  title: 基础
  order: 3
---

# 样式开发规范

## 📋 样式方案选择

### 推荐方案：CSS Modules + Less

我们推荐使用 **CSS Modules + Less** 的组合方案，原因如下：

| 特性         | CSS Modules + Less  | 普通 CSS/Less   | Styled Components  |
| ------------ | ------------------- | --------------- | ------------------ |
| **样式隔离** | ✅ 自动类名哈希     | ❌ 全局污染风险 | ✅ 组件级隔离      |
| **开发体验** | ✅ 智能提示         | ⚠️ 无类型检查   | ✅ TypeScript 支持 |
| **构建体积** | ✅ 可 tree-shaking  | ✅ 静态分析     | ⚠️ 运行时开销      |
| **学习成本** | ✅ 低，类似传统 CSS | ✅ 最低         | ⚠️ 需要学习 API    |
| **调试友好** | ✅ 源码映射清晰     | ✅ 直观         | ⚠️ 动态生成类名    |
| **团队协作** | ✅ 标准化命名       | ❌ 命名冲突     | ✅ 组件化          |

## 🏗️ 目录结构规范

```
src/
├── components/
│   └── ProButton/
│       ├── index.tsx          # 组件主文件
│       ├── index.module.less  # 样式文件
│       ├── index.md           # 文档
│       └── demo/
│           └── basic.tsx      # 演示代码
├── styles/                    # 全局样式
│   ├── variables.less         # 变量定义
│   ├── mixins.less           # 混入函数
│   ├── reset.less            # 重置样式
│   └── themes/               # 主题文件
│       ├── default.less
│       └── dark.less
└── types/                     # 类型定义
    ├── global.d.ts           # 全局类型
    ├── css-modules.d.ts      # CSS 模块类型
    └── components.d.ts       # 组件类型
```

## 📝 命名规范

### 文件命名

- **组件样式文件**: `index.module.less`
- **全局样式文件**: `variables.less`, `mixins.less`
- **主题文件**: `default.less`, `dark.less`

### CSS 类名规范

使用 **BEM (Block Element Modifier)** 命名规范：

```less
// ✅ 推荐
.pro-button {
  // Block: 组件根元素

  &__content {
    // Element: 子元素
  }

  &--primary {
    // Modifier: 状态修饰符
  }

  &--large {
    // Modifier: 尺寸修饰符
  }
}

// ❌ 避免
.ProButton {
} // 避免 PascalCase
.pro_button {
} // 避免下划线
.proButton {
} // 避免 camelCase
```

### 变量命名

```less
// 颜色变量
@primary-color: #165dff;
@success-color: #00b42a;
@warning-color: #ff7d00;
@error-color: #f53f3f;

// 尺寸变量
@border-radius-small: 4px;
@border-radius-medium: 6px;
@border-radius-large: 8px;

// 间距变量
@spacing-xs: 4px;
@spacing-sm: 8px;
@spacing-md: 16px;
@spacing-lg: 24px;
@spacing-xl: 32px;
```

## 🎨 样式编写规范

### 1. 组件样式结构

```less
// src/components/ProButton/index.module.less
@import '../../styles/variables.less';
@import '../../styles/mixins.less';

.pro-button {
  // 1. 定位属性
  position: relative;
  display: inline-flex;

  // 2. 盒模型属性
  padding: @spacing-sm @spacing-md;
  margin: 0;
  border: 1px solid @border-color;
  border-radius: @border-radius-medium;

  // 3. 文本属性
  font-size: @font-size-medium;
  font-weight: 500;
  line-height: 1.5;
  text-align: center;

  // 4. 视觉属性
  background: @background-color;
  color: @text-color;
  box-shadow: @box-shadow-light;

  // 5. 动画属性
  transition: all 0.2s ease;
  cursor: pointer;

  // 6. 伪类
  &:hover {
    background: @background-color-hover;
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  // 7. 子元素
  &__icon {
    margin-right: @spacing-xs;
    font-size: 1em;
  }

  &__content {
    flex: 1;
  }

  // 8. 修饰符
  &--primary {
    background: @primary-color;
    color: white;
    border-color: @primary-color;

    &:hover {
      background: @primary-color-hover;
    }
  }

  &--large {
    padding: @spacing-md @spacing-lg;
    font-size: @font-size-large;
  }

  &--loading {
    pointer-events: none;

    .pro-button__icon {
      animation: spin 1s linear infinite;
    }
  }
}

// 动画定义
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

### 2. 组件中使用样式

```tsx
// src/components/ProButton/index.tsx
import React from 'react';
import classNames from 'classnames';
import styles from './index.module.less';

export interface ProButtonProps {
  type?: 'default' | 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const ProButton: React.FC<ProButtonProps> = ({
  type = 'default',
  size = 'medium',
  loading = false,
  disabled = false,
  icon,
  children,
  className,
  onClick,
}) => {
  const buttonClass = classNames(
    styles['pro-button'],
    styles[`pro-button--${type}`],
    styles[`pro-button--${size}`],
    {
      [styles['pro-button--loading']]: loading,
      [styles['pro-button--disabled']]: disabled,
    },
    className,
  );

  return (
    <button className={buttonClass} disabled={disabled || loading} onClick={onClick}>
      {(icon || loading) && (
        <span className={styles['pro-button__icon']}>{loading ? <LoadingIcon /> : icon}</span>
      )}
      {children && <span className={styles['pro-button__content']}>{children}</span>}
    </button>
  );
};

export default ProButton;
```

## 🔧 工具配置

### 1. 安装依赖

```bash
# CSS Modules 和 Less 支持
pnpm add -D less
pnpm add classnames
pnpm add -D @types/classnames

# PostCSS 插件（可选）
pnpm add -D autoprefixer
pnpm add -D postcss-preset-env
```

### 2. TypeScript 配置

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/styles/*": ["src/styles/*"]
    }
  }
}
```

## 📚 最佳实践

### 1. 样式组织

- **组件样式**: 使用 CSS Modules，避免全局污染
- **全局样式**: 放在 `src/styles/` 目录，包括变量、混入、重置样式
- **主题样式**: 支持多主题切换，使用 CSS 变量

### 2. 性能优化

- **按需加载**: 只导入使用的样式
- **样式复用**: 使用 Less 混入避免重复代码
- **压缩优化**: 生产环境自动压缩 CSS

### 3. 维护性

- **统一变量**: 使用设计令牌管理颜色、尺寸等
- **文档化**: 为复杂样式添加注释
- **测试**: 使用视觉回归测试确保样式一致性

## 🎯 迁移指南

### 从内联样式迁移

```tsx
// ❌ 之前：内联样式
const Button = () => (
  <button
    style={{
      padding: '8px 16px',
      background: '#165dff',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
    }}
  >
    按钮
  </button>
);

// ✅ 现在：CSS Modules
const Button = () => <button className={styles['pro-button']}>按钮</button>;
```

### 样式文件示例

```less
// src/components/Button/index.module.less
.pro-button {
  padding: 8px 16px;
  background: #165dff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #0e4ba8;
  }
}
```
