---
title: DotStatus 状态展示
order: 4
group:
  title: 数据展示
  path: /components
---

# DotStatus 状态展示

封装的通用状态展示组件。

## 代码演示

### 内置状态

<code src="./demo/basic.tsx"></code>

### 自定义

<code src="./demo/custom.tsx"></code>

## API

### DotStatus

| 参数      | 说明             | 类型                           | 默认值              |
| --------- | ---------------- | ------------------------------ | ------------------- |
| status    | 内置状态名称     | `keyof typeof StatusConfigMap` | -                   |
| text      | 自定义状态名称   | `string`                       | 未知                |
| color     | 状态颜色         | `string`                       | var(--color-text-6) |
| showText  | 是否显示状态名称 | `boolean`                      | true                |
| className | 类名             | `string`                       | -                   |

> status 配置项优于 text & color 配置项

### StatusConfigMap

```ts
export const StatusConfigMap = {
  Pending: { text: '排队中', color: ColorEnum.primarySix },
  Running: { text: '构建中', color: ColorEnum.primarySix },
  Succeeded: { text: '构建成功', color: ColorEnum.successSix },
  Failed: { text: '构建失败', color: ColorEnum.dangerSix },
  Terminating: { text: '终止中', color: ColorEnum.warningSix },
  Terminated: { text: '已终止', color: ColorEnum.textFour },

  Healthy: { text: '正常', color: ColorEnum.successSix },
  Unhealthy: { text: '异常', color: ColorEnum.dangerSix },
  Unknown: { text: '未知', color: ColorEnum.textFour },

  Uploading: { text: '上传中', color: ColorEnum.primarySix },
  Error: { text: '上传失败', color: ColorEnum.dangerSix },
  Done: { text: '上传成功', color: ColorEnum.successSix },

  Init: { text: '启动中', color: ColorEnum.primarySix },
  PartialSucceeded: { text: '运行失败', color: ColorEnum.dangerSix },

  Creating: { text: '创建中', color: ColorEnum.primarySix },
  Deploying: { text: '上线中', color: ColorEnum.primarySix },
  Undeploying: { text: '下线中', color: ColorEnum.textFour },
  Undeploy: { text: '已下线', color: ColorEnum.textFour },

  ImportFinished: { text: '导入成功', color: ColorEnum.successSix },
  ImportFailed: { text: '导入失败', color: ColorEnum.dangerSix },
  Importing: { text: '导入中', color: ColorEnum.primarySix },
  Published: { text: '已发布', color: ColorEnum.successSix },
};
```

### ColorEnum 供参考，未导出

```ts
enum ColorEnum {
  primarySix = 'rgb(var(--primary-6))',
  successSix = 'rgb(var(--success-6))',
  dangerSix = 'rgb(var(--danger-6))',
  textFour = 'var(--color-text-6)',
  warningSix = 'rgb(var(--warning-6))',
}
```
