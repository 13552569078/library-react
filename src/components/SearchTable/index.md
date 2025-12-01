---
title: SearchTable 表格
order: 19
group:
  title: 数据展示
  path: /components
---

# SearchTable 表格

基于`@ccf2e/arco-material`表格组件进行封装，基础使用方式可参见[文档](http://material.ccfe.cestc.cn/docs/Components/Table/)

- 需要外层给表格设置一个正确的高度
- 表格分页器会有 sticky bottom 效果

## 代码演示

### 基础用法

<code src="./demo/basic.tsx"></code>

### 少量数据

<code src="./demo/less-data.tsx"></code>

### 自定义搜索条件

<code src="./demo/search-form.tsx"></code>

### 自动高度设置

<code src="./demo/height.tsx"></code>

### 空数据

<code src="./demo/empty.tsx"></code>

### loading

<code src="./demo/loading.tsx"></code>

### 完整示例

<code src="./demo/full.tsx"></code>

## API

### SearchTable

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| noDataTitle | 空状态标题 | `string` | 如果有搜索条件，则显示“暂无查询结果”，否则显示 noDataTitle |
| noDataDesc | 空状态描述 | `string` | - |
| searchForm | 自定义搜索 | `React.ReactNode` | - |
| addButton | 自定义添加按钮 | `React.ReactNode` | - |
| tableProps | 表格属性 | `TableProps<any>` | - |
| refresh | 刷新按钮事件回调 | `() => void` | - |
| search | 搜索框事件回调 | `(text: string) => void` | - |
| className | 类 | `string` | - |
| style | 样式 | `React.CSSProperties` | - |
| searcherPlaceholder | 搜索框 placeholder | `string` | 请输入名称/ID 搜索 |

### columns 数据类型

| 参数      | 说明               | 类型                     | 默认值 |
| --------- | ------------------ | ------------------------ | ------ |
| isCopy    | 是否显示 copy 图标 | `boolean`                | false  |
| isLink    | 是否是链接         | `boolean`                | false  |
| clickLink | 点击链接操作       | `(href: string) => void` | -      |

### data 数据

| 参数      | 说明                                     | 类型      | 默认值 |
| --------- | ---------------------------------------- | --------- | ------ |
| hasAccess | 当列设置 isLink 后，是否有权限访问该链接 | `boolean` | false  |
