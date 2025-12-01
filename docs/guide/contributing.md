---
nav: 贡献指南
group:
  title: 其他
  order: 2
---

# 🤝 贡献指南

感谢你对 AI Arco Material 的关注！我们欢迎任何形式的贡献，包括但不限于：

- 🐛 报告 Bug
- 💡 提出新功能建议
- 📝 改进文档
- 🔧 提交代码
- 🎨 设计改进

## 📋 开发环境

### 环境要求

- **Node.js** >= 16.0.0
- **pnpm** >= 8.0.0 (推荐使用 pnpm)
- **Git** >= 2.0.0

### 快速开始

```bash
# 1. Fork 并克隆项目
git clone git@code.cestc.cn:ai-fe/library/ai-arco-material.git
cd ai-arco-material

# 2. 安装依赖
pnpm install

# 3. 启动开发服务器
pnpm dev

# 4. 构建项目
pnpm build

# 5. 运行测试
pnpm test
```

## 🏗️ 项目结构

```
ai-arco-material/
├── src/                          # 源代码
│   ├── components/               # React 组件
│   │   └── ProButton/
│   │       ├── index.tsx         # 组件实现
│   │       ├── index.module.less # 样式文件
│   │       ├── index.md          # 组件文档
│   │       └── demo/             # 演示代码
│   ├── utils/                    # 工具函数
│   ├── hooks/                    # React Hooks
│   ├── icons/                    # 图标系统
│   │   ├── svgs/                 # SVG 源文件
│   │   ├── icons/                # 生成的图标组件
│   │   └── demo/                 # 图标演示
│   └── styles/                   # 全局样式
│       ├── variables.less        # 设计令牌
│       ├── mixins.less           # 混入函数
│       └── reset.less            # 重置样式
├── types/                        # TypeScript 类型定义
├── docs/                         # 文档
├── scripts/                      # 构建脚本
└── .github/workflows/            # CI/CD 配置
```

## 🔧 开发流程

### 1. 创建分支

```bash
# 从 main 分支创建新分支
git checkout main
git pull origin main
git checkout -b feature/your-feature-name

# 分支命名规范
feature/add-new-component    # 新功能
fix/button-click-issue       # Bug 修复
docs/update-readme          # 文档更新
style/improve-button-style  # 样式改进
```

### 2. 开发规范

#### 代码规范

- 使用 **TypeScript** 编写代码
- 遵循 **ESLint** 和 **Prettier** 配置
- 组件使用 **函数式组件** + **Hooks**
- 样式使用 **CSS Modules** + **Less**

#### 提交规范

```bash
# 使用 Conventional Commits 规范
feat: 新增 ProTable 组件
fix: 修复 ProButton 点击事件问题
docs: 更新 README 文档
style: 优化按钮样式
refactor: 重构图标生成脚本
test: 添加 ProButton 单元测试
chore: 更新依赖版本
```

### 3. 组件开发

#### 创建新组件

```bash
# 1. 创建组件目录
mkdir src/components/YourComponent

# 2. 创建必要文件
touch src/components/YourComponent/index.tsx
touch src/components/YourComponent/index.module.less
touch src/components/YourComponent/index.md
mkdir src/components/YourComponent/demo
touch src/components/YourComponent/demo/basic.tsx
```

#### 组件模板

```tsx
// src/components/YourComponent/index.tsx
import React from 'react';
import classNames from 'classnames';
import styles from './index.module.less';

export interface YourComponentProps {
  /** 组件类名 */
  className?: string;
  /** 组件样式 */
  style?: React.CSSProperties;
  /** 子元素 */
  children?: React.ReactNode;
}

const YourComponent: React.FC<YourComponentProps> = ({ className, style, children, ...rest }) => {
  const cls = classNames(styles['your-component'], className);

  return (
    <div className={cls} style={style} {...rest}>
      {children}
    </div>
  );
};

export default YourComponent;
```

#### 样式规范

```less
// src/components/YourComponent/index.module.less
@import '../../styles/variables.less';
@import '../../styles/mixins.less';

.your-component {
  // 使用设计令牌
  padding: @spacing-md;
  border-radius: @border-radius-md;
  background-color: @background-color;

  // 使用混入函数
  .card-base();

  // BEM 命名规范
  &__header {
    font-weight: @font-weight-semibold;
    margin-bottom: @spacing-sm;
  }

  &__content {
    color: @text-color-secondary;
  }

  // 修饰符
  &--primary {
    background-color: @primary-color-light;
  }

  &--disabled {
    opacity: 0.6;
    pointer-events: none;
  }
}
```

### 4. 图标开发

```bash
# 1. 添加 SVG 文件到 src/icons/svgs/
cp your-icon.svg src/icons/svgs/

# 2. 运行图标生成脚本
pnpm generate:icons

# 3. 图标自动生成为 React 组件
# 可在 src/icons/icons/ 中查看生成的组件
```

### 5. 文档编写

#### 组件文档模板

```markdown
---
nav: 组件
group: 基础组件
title: YourComponent 组件名称
---

# YourComponent 组件名称

组件的简短描述。

## 何时使用

- 使用场景 1
- 使用场景 2

## 代码演示

<code src="./demo/basic.tsx">基础用法</code>

## API

### YourComponent

| 参数      | 说明     | 类型            | 默认值 |
| --------- | -------- | --------------- | ------ |
| className | 组件类名 | `string`        | -      |
| style     | 组件样式 | `CSSProperties` | -      |
| children  | 子元素   | `ReactNode`     | -      |
```

## 🧪 测试

### 运行测试

```bash
# 运行所有测试
pnpm test

# 运行特定测试文件
pnpm test ProButton

# 生成测试覆盖率报告
pnpm test:coverage
```

### 编写测试

```tsx
// src/components/YourComponent/__tests__/index.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import YourComponent from '../index';

describe('YourComponent', () => {
  it('should render correctly', () => {
    render(<YourComponent>Test Content</YourComponent>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(<YourComponent className="custom-class">Test</YourComponent>);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
```

## 📦 发布流程

### 版本发布

```bash
# 补丁版本 (1.0.0 -> 1.0.1)
pnpm release:patch

# 次要版本 (1.0.0 -> 1.1.0)
pnpm release:minor

# 主要版本 (1.0.0 -> 2.0.0)
pnpm release:major
```

### 发布检查清单

- [ ] 所有测试通过
- [ ] 文档已更新
- [ ] CHANGELOG 已更新
- [ ] 版本号符合语义化版本规范
- [ ] 构建产物正常

## 🤔 常见问题

### Q: 如何调试组件？

A: 使用 `pnpm dev` 启动开发服务器，在浏览器中实时预览和调试。

### Q: 如何添加新的设计令牌？

A: 在 `src/styles/variables.less` 中添加新的变量定义。

### Q: 如何处理样式冲突？

A: 使用 CSS Modules，确保类名的唯一性。

### Q: 如何优化包体积？

A: 确保组件支持 tree-shaking，避免引入不必要的依赖。

## 📞 获取帮助

- 📧 **邮箱**: your-email@example.com
- 💬 **讨论**: GitHub Discussions
- 🐛 **问题**: GitHub Issues
- 📖 **文档**: 项目文档站点

---

再次感谢你的贡献！🎉
