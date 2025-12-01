# Icons 图标库

一个强大且易用的 SVG 图标库，支持自动生成 React 组件和完整的 TypeScript 类型定义。

## ✨ 特性

- 🎨 **基于 SVG** - 矢量图标，支持任意大小和颜色
- 🔧 **TypeScript 支持** - 完整的类型定义
- 📦 **按需导入** - 支持 tree-shaking，只打包使用的图标
- 🎯 **统一 API** - 所有图标使用相同的 props 接口
- 🔄 **自动生成** - 从 SVG 文件自动生成 React 组件
- 🎪 **可视化管理** - 提供图标展示页面，支持搜索和复制

## 📖 图标展示

<code src="./demo/ArcoIconDemo.tsx"></code>

## 📖 代码演示

### 基础用法

<code src="./demo/basic.tsx"></code>

### 不同尺寸

<code src="./demo/sizes.tsx"></code>

### 自定义样式

<code src="./demo/custom-style.tsx"></code>

### 事件处理

<code src="./demo/event-handling.tsx"></code>

### 直接使用 Icon

<code src="./demo/icon.tsx"></code>

## 📋 API

### Icon Props

所有图标组件都支持以下 props：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 图标大小 | `number \| string` | `16` |
| color | 图标颜色，不是所有 icon 都支持自定义颜色 | `string` | `'currentColor'` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `React.CSSProperties` | - |
| onClick | 点击事件 | `(event: React.MouseEvent<SVGElement>) => void` | - |

### 使用示例

```tsx
import { IconFileApk } from '@zhj92/arco-material';

// 基础使用
<IconFileApk />

// 自定义大小和颜色
<IconFileApk size={24} color="#165dff" />

// 添加点击事件
<IconFileApk onClick={() => console.log('clicked')} />

// 自定义样式
<IconFileApk style={{ cursor: 'pointer' }} />
```

## 🔧 图标管理

### 快速添加新图标

只需三步即可添加新图标：

```bash
# 1️⃣ 添加 SVG 文件到指定目录
cp your-icon.svg src/icons/svgs/

# 2️⃣ 自动生成 React 组件
npm run generate:icons

# 3️⃣ 立即可用！
import { IconYourIcon } from '@zhj92/arco-material';
```

### 📝 SVG 文件规范

为了确保图标质量和一致性，请遵循以下规范：

| 要求     | 说明                             | 示例                    |
| -------- | -------------------------------- | ----------------------- |
| **颜色** | 使用 `currentColor` 支持动态颜色 | `stroke="currentColor"` |
| **尺寸** | 设置标准 `viewBox`               | `viewBox="0 0 16 16"`   |
| **命名** | 使用 kebab-case 格式             | `user-profile.svg`      |
| **优化** | 保持路径简洁，避免复杂结构       | 使用 SVGO 优化          |

### 📄 标准 SVG 模板

```svg
<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M8 2L8 14M2 8L14 8"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
</svg>
```

### 🚀 自动化流程

图标生成脚本提供智能化处理：

- ✅ **自动扫描** - 检测 `src/icons/svgs/` 目录下的所有 SVG 文件
- ✅ **智能命名** - 将 `kebab-case` 转换为 `PascalCase` 组件名
- ✅ **组件生成** - 自动生成 TypeScript React 组件
- ✅ **导出更新** - 自动更新导出文件和类型定义
- ✅ **质量检查** - 验证 SVG 格式和最佳实践
- ✅ **元数据生成** - 为图标展示页面生成元数据

### 📦 批量添加图标

支持一次性添加多个图标：

```bash
# 复制多个 SVG 文件
cp *.svg src/icons/svgs/

# 一键生成所有组件
npm run generate:icons

# 🎉 所有图标立即可用！
```

## 💡 最佳实践

### 🎯 图标命名规范

| ✅ 推荐              | ❌ 避免              | 说明            |
| -------------------- | -------------------- | --------------- |
| `user-profile.svg`   | `icon1.svg`          | 使用描述性名称  |
| `arrow-left.svg`     | `arrowLeft.svg`      | 使用 kebab-case |
| `search-outline.svg` | `search outline.svg` | 避免空格        |

### 🎨 设计规范

- **统一风格** - 保持一致的设计语言和视觉风格
- **线条粗细** - 使用统一的 `stroke-width`（推荐 1.5）
- **清晰度** - 确保在 16px 小尺寸下依然清晰可辨
- **无障碍** - 遵循 WCAG 无障碍设计原则

### ⚡ 性能优化

```tsx
// ✅ 推荐：按需导入
import { IconFileApk, IconFileAudio } from '@zhj92/arco-material';

// ❌ 避免：全量导入
import * as Icons from '@zhj92/arco-material';

// ✅ 推荐：合理的图标大小
<IconFileApk size={16} />  // 小图标
<IconFileApk size={24} />  // 中等图标
<IconFileApk size={32} />  // 大图标

// ❌ 避免：过大的图标
<IconFileApk size={128} /> // 影响性能
```

### 🔄 开发工作流

1. **设计阶段** - 使用设计工具创建 SVG 图标
2. **优化阶段** - 使用 SVGO 等工具优化文件大小
3. **添加阶段** - 将 SVG 文件放入 `src/icons/svgs/`
4. **生成阶段** - 运行 `npm run generate:icons`
5. **测试阶段** - 在图标展示页面验证效果
6. **使用阶段** - 在项目中导入使用
