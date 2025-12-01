# AI Arco Material

[![NPM version](https://img.shields.io/npm/v/ai-arco-material.svg?style=flat)](https://npmjs.org/package/ai-arco-material)
[![NPM downloads](http://img.shields.io/npm/dm/ai-arco-material.svg?style=flat)](https://npmjs.org/package/ai-arco-material)

一个基于 Arco Design 的现代化 React 组件库，提供丰富的组件、工具函数、Hooks 和图标系统。

## 特性

- 🎨 **现代化设计** - 基于 Arco Design 设计语言
- 📦 **开箱即用** - 丰富的组件和工具函数
- 🔧 **TypeScript** - 完整的类型定义支持
- 📱 **响应式** - 移动端友好的组件设计
- 🎯 **按需导入** - 支持 tree-shaking，减少包体积
- 🔄 **自动化** - 完整的开发和发布流程

## 安装

```bash
# 从内网 npm 安装
npm install ai-arco-material --registry=http://npm.cestc.cn
# 或
yarn add ai-arco-material --registry=http://npm.cestc.cn
# 或
pnpm add ai-arco-material --registry=http://npm.cestc.cn

# 配置 npm 源（推荐）
npm config set registry http://npm.cestc.cn
npm install ai-arco-material
```

## 快速开始

```tsx
import React from 'react';
import { ProButton, ProTable, IconAdd, copyToClipboard } from 'ai-arco-material';

function App() {
  const handleCopy = async () => {
    await copyToClipboard('Hello World!');
  };

  return (
    <div>
      <ProButton 
        type="primary" 
        icon={<IconAdd />}
        onClick={handleCopy}
      >
        复制文本
      </ProButton>
    </div>
  );
}

export default App;
```

## 组件分类

### 🧩 基础组件 (Components)

- **ProButton** - 增强按钮组件，支持异步操作
- **ProTable** - 高级表格组件，内置搜索、分页等功能
- **EmptyBox** - 空状态组件
- **RefreshButton** - 刷新按钮组件
- **EllipsisPopover** - 文本省略弹窗组件

### 🔧 工具函数 (Utils)

- **copyToClipboard** - 剪贴板复制工具
- **常量定义** - 日期格式、默认数据等

### 🪝 React Hooks

- **useInView** - 元素可见性检测
- **useTableData** - 表格数据管理

### 🎨 图标库 (Icons)

- 12+ 常用 SVG 图标
- 支持自定义颜色和大小
- 自动生成 React 组件

## 开发指南

### 环境要求

- Node.js >= 16
- pnpm >= 8 (推荐)

### 开发环境设置

```bash
# 克隆项目
git clone <repository-url>
cd ai-arco-material

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

### 项目结构

```
ai-arco-material/
├── src/                    # 源代码
│   ├── components/         # 组件
│   │   ├── ProButton/      # 按钮组件
│   │   ├── ProTable/       # 表格组件
│   │   └── ...
│   ├── utils/              # 工具函数
│   │   ├── copyToClipboard/ # 复制工具
│   │   └── ...
│   ├── hooks/              # React Hooks
│   │   ├── useInView/      # 可见性检测
│   │   └── ...
│   ├── icons/              # 图标系统
│   │   ├── svgs/           # SVG 源文件
│   │   ├── icons/          # 生成的组件
│   │   └── demo/           # 图标展示
│   └── index.ts            # 主入口
├── scripts/                # 构建脚本
├── docs/                   # 文档
└── dist/                   # 构建输出
```

## 开发工作流

### 1. 开发新组件

#### 创建组件目录

```bash
mkdir src/components/YourComponent
cd src/components/YourComponent
```

#### 创建必要文件

```bash
touch index.tsx          # 组件实现
touch index.md           # 组件文档
mkdir demo && touch demo/basic.tsx  # 演示代码
```

#### 组件模板

```tsx
// src/components/YourComponent/index.tsx
import React from 'react';

export interface YourComponentProps {
  /** 组件属性说明 */
  children?: React.ReactNode;
}

const YourComponent: React.FC<YourComponentProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default YourComponent;
```

#### 文档模板

```markdown
# YourComponent 组件名称

组件描述

## 代码演示

### 基础用法

<code src="./demo/basic.tsx"></code>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 子元素 | `ReactNode` | - |
```

#### 导出组件

```tsx
// src/components/index.ts
export { default as YourComponent } from './YourComponent';
export type { YourComponentProps } from './YourComponent';
```

### 2. 开发工具函数

#### 创建工具目录

```bash
mkdir src/utils/yourUtil
cd src/utils/yourUtil
```

#### 实现工具函数

```tsx
// src/utils/yourUtil/index.tsx
export interface YourUtilOptions {
  // 选项类型定义
}

export const yourUtil = (options: YourUtilOptions) => {
  // 实现逻辑
};
```

#### 添加文档和演示

创建 `index.md` 和 `demo/basic.tsx` 文件

#### 导出工具

```tsx
// src/utils/index.ts
export * from './yourUtil';
```

### 3. 开发 React Hooks

#### 创建 Hook 目录

```bash
mkdir src/hooks/useYourHook
cd src/hooks/useYourHook
```

#### 实现 Hook

```tsx
// src/hooks/useYourHook/index.ts
import { useState, useEffect } from 'react';

export interface UseYourHookOptions {
  // 选项类型
}

export const useYourHook = (options: UseYourHookOptions) => {
  // Hook 实现
  return {
    // 返回值
  };
};
```

### 4. 管理图标

#### 添加新图标

1. **准备 SVG 文件**
   ```bash
   # 将 SVG 文件放入 svgs 目录
   cp your-icon.svg src/icons/svgs/
   ```

2. **生成 React 组件**
   ```bash
   npm run generate:icons
   ```

3. **验证结果**
   - 新图标会出现在 `src/icons/icons/` 目录
   - 自动更新导出文件
   - 在文档中可以看到新图标

#### SVG 文件要求

- 使用 `currentColor` 支持动态颜色
- 设置合适的 `viewBox`
- 文件名使用 kebab-case 格式
- 保持图标简洁清晰

#### 批量添加图标

```bash
# 将多个 SVG 文件放入目录
cp *.svg src/icons/svgs/

# 一次性生成所有组件
npm run generate:icons
```

## 构建和发布

### 构建项目

```bash
# 生成图标组件
npm run generate:icons

# 构建项目
npm run build

# 构建文档
npm run docs:build
```

### 版本管理

目前使用手动版本管理：

1. **更新版本号**
   ```bash
   # 修改 package.json 中的 version 字段
   vim package.json
   ```

2. **构建项目**
   ```bash
   npm run build
   ```

3. **发布到 npm**
   ```bash
   npm publish
   ```

4. **创建 Git 标签**
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

### 自动化发布

我们提供了完整的自动化发布流程：

#### 使用发布脚本

```bash
# 发布补丁版本 (1.0.0 -> 1.0.1)
npm run release:patch

# 发布次要版本 (1.0.0 -> 1.1.0)
npm run release:minor

# 发布主要版本 (1.0.0 -> 2.0.0)
npm run release:major

# 默认发布补丁版本
npm run release
```

#### 发布流程

发布脚本会自动执行以下步骤：

1. **检查工作目录** - 确保没有未提交的更改
2. **生成图标组件** - 自动生成最新的图标
3. **运行测试** - 确保代码质量
4. **构建项目** - 生成 ESM 和 CJS 格式
5. **更新版本号** - 自动更新 package.json
6. **发布到 npm** - 推送到 npm 仓库
7. **推送到 Git** - 推送代码和标签

#### GitHub Actions

项目配置了 CI/CD 流程：

- **CI 流程** - 每次推送和 PR 时运行测试
- **发布流程** - 推送标签时自动发布到 npm

#### 手动发布

如果需要手动发布：

```bash
# 1. 生成图标
npm run generate:icons

# 2. 构建项目
npm run build

# 3. 更新版本
npm version patch  # 或 minor/major

# 4. 发布
npm publish

# 5. 推送标签
git push --follow-tags
```

## 开发规范

### 代码规范

- 使用 TypeScript 编写所有代码
- 遵循 ESLint 和 Prettier 配置
- 组件必须包含完整的类型定义
- 添加适当的注释和文档

### 提交规范

使用 Conventional Commits 格式：

```
feat: 添加新的组件功能
fix: 修复组件bug
docs: 更新文档
style: 代码格式调整
refactor: 重构代码
test: 添加测试
chore: 构建工具或依赖更新
```

### 文档规范

- 每个组件必须有完整的 API 文档
- 提供至少一个基础使用示例
- 包含 TypeScript 类型定义
- 添加适当的使用说明和注意事项

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 常见问题

### Q: 如何添加新图标？

A: 将 SVG 文件放入 `src/icons/svgs/` 目录，然后运行 `npm run generate:icons`

### Q: 如何自定义主题？

A: 项目基于 Arco Design，可以通过 Arco 的主题定制功能进行自定义

### Q: 如何按需导入？

A: 直接导入需要的组件：`import { ProButton } from 'ai-arco-material'`

### Q: 支持哪些浏览器？

A: 支持所有现代浏览器，IE 需要 polyfill

## 许可证

MIT License
