---
title: InfoDescription 信息展示
order: 9
group:
  title: 数据展示
  path: /components
---

# InfoDescription 信息展示

封装的通用按列展示信息组件。

## 代码演示

### 基础用法

<code src="./demo/basic.tsx"></code>

## API

### InfoDescription

| 参数           | 说明                                      | 类型                  | 默认值 |
| -------------- | ----------------------------------------- | --------------------- | ------ |
| className      | 类名称                                    | `string`              | -      |
| colon          | 是否显示冒号                              | `boolean`             | true   |
| column         | 显示几列                                  | `number`              | 2      |
| autoLabelWidth | 是否自动根据 data 内容计算最长 label 宽度 | `boolean`             | true   |
| loading        | 加载状态                                  | `boolean`             | false  |
| titleStyle     | 标题样式                                  | `React.CSSProperties` | -      |
| labelStyle     | 标签样式                                  | `React.CSSProperties` | -      |
| valueStyle     | 文本值样式                                | `React.CSSProperties` | -      |
| data           | 数据，类型见下面                          | `Data`                | []     |

> 所有配置项，data 中的配置会覆盖组件的配置

### Data 数据类型

```ts
{
  colon?: boolean;
  column?: number;
  title?: string;
  titleStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  valueStyle?: React.CSSProperties;
  wrapperClassName?: string;
  labelWidths?: number[]; // 每列的 label 宽度
  items: {
    label: string;
    value: React.ReactNode;
    isCopy?: boolean;
  }[];
}
```
