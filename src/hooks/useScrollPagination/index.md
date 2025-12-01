---
title: useScrollPagination
path: /useScrollPagination
group:
  title: 通用
  order: 1
  path: /useScrollPagination
category: '通用'
sidebar: true
---

# useScrollPagination

滚动加载数据。

## 代码演示

<code src='./demo/demo1'></code>

## API

```ts
function useScrollPagination<T = any>(
  config: UseScrollPaginationConfig<T>,
): UseScrollPaginationReturn<T>;
```

### 参数类型

#### UseScrollPaginationConfig

```ts
export interface UseScrollPaginationConfig<T = any> {
  // 获取数据的 API 函数
  fetchData: (params: ScrollPaginationParams) => Promise<ScrollPaginationResponse<T>>;
  // 数据映射函数，将 API 返回的数据转换为选项格式
  mapToOption?: (item: T) => ScrollPaginationOption<T>;
  pageSize?: number;
  // 额外的请求参数
  extraParams?: Record<string, any>;
  // 是否启用滚动加载，默认 true
  enabled?: boolean;
  // 滚动触发阈值（距离底部多少像素时触发），默认 10
  scrollThreshold?: number;
  // 是否支持临时项（用于回显不在当前分页中的数据），默认 true
  supportTempItem?: boolean;
}
```

#### UseScrollPaginationReturn

```ts
export interface UseScrollPaginationReturn<T = any> {
  options: ScrollPaginationOption<T>[];
  loading: boolean;
  hasMore: boolean;
  pageNo: number;
  onPopupScroll: (element: HTMLElement) => Promise<void>;
  // 重置数据，重新从第一页开始加载
  reset: () => void;
  // 手动加载指定页
  loadPage: (page: number) => Promise<void>;
  // 添加临时项（用于回显）
  addTempItem: (item: ScrollPaginationOption<T>) => void;
  // 移除临时项
  removeTempItem: (value: string | number) => void;
  // 检查是否存在指定值的选项
  hasOption: (value: string | number) => boolean;
}
```

#### 其他

```ts
export interface ScrollPaginationOption<T = any> {
  label: string;
  value: string | number;
  original?: T; // 保存原始数据，便于扩展
}

export interface ScrollPaginationParams {
  pageNo: number;
  pageSize: number;
  [key: string]: any;
}

export interface ScrollPaginationResponse<T = any> {
  data: {
    result: T[];
    totalCount?: number;
  };
  [key: string]: any;
}
```
