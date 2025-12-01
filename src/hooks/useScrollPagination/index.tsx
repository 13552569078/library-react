import { useCallback, useEffect, useRef, useState } from 'react';
import { useRequest } from 'ahooks';

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

export function useScrollPagination<T = any>(
  config: UseScrollPaginationConfig<T>,
): UseScrollPaginationReturn<T> {
  const {
    fetchData,
    mapToOption,
    pageSize = 20,
    extraParams = {},
    enabled = true,
    scrollThreshold = 10,
    supportTempItem = true,
  } = config;

  const [pageNo, setPageNo] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [options, setOptions] = useState<ScrollPaginationOption<T>[]>([]);

  // 记录临时项的引用，用于后续移除
  const tempItemsRef = useRef<Map<string | number, ScrollPaginationOption<T>>>(new Map());

  const { runAsync, loading } = useRequest(fetchData, { manual: true });

  const loadPage = useCallback(
    async (nextPage: number) => {
      if (!enabled) return;

      try {
        const res = await runAsync({
          pageNo: nextPage,
          pageSize,
          ...extraParams,
        });

        const resultData = res?.data?.result || [];
        const mapped = mapToOption
          ? resultData.map(mapToOption)
          : (resultData as ScrollPaginationOption<T>[]);

        setOptions((prev) => {
          const newList = nextPage === 1 ? mapped : [...prev, ...mapped];

          if (supportTempItem) {
            // 检查新数据中是否包含临时项，如果包含则移除临时项
            const tempItems = Array.from(tempItemsRef.current.values());
            const filteredList = newList.filter((item) => {
              const isTempItem = tempItems.some((temp) => temp.value === item.value);
              if (isTempItem) {
                // 从临时项记录中移除
                tempItemsRef.current.delete(item.value);
                return false;
              }
              return true;
            });

            // 将剩余的临时项添加到列表开头
            const remainingTempItems = Array.from(tempItemsRef.current.values());
            return [...remainingTempItems, ...filteredList];
          }

          return newList;
        });

        setPageNo(nextPage);
        setHasMore(mapped.length >= pageSize);
      } catch (err) {
        console.error('Error fetching data:', err);
        setHasMore(false);
      }
    },
    [runAsync, pageSize, extraParams, enabled, mapToOption, supportTempItem],
  );

  const onPopupScroll = useCallback(
    async (element: HTMLElement) => {
      if (!enabled || !hasMore || loading) return;

      const { scrollTop, scrollHeight, clientHeight } = element;
      const scrollBottom = scrollHeight - (scrollTop + clientHeight);

      if (scrollBottom < scrollThreshold) {
        await loadPage(pageNo + 1);
      }
    },
    [enabled, hasMore, loading, scrollThreshold, pageNo, loadPage],
  );

  const reset = useCallback(() => {
    setPageNo(1);
    setHasMore(false);
    setOptions([]);
    tempItemsRef.current.clear();
    if (enabled) {
      loadPage(1);
    }
  }, [enabled, loadPage]);

  const addTempItem = useCallback(
    (item: ScrollPaginationOption<T>) => {
      if (!supportTempItem) return;

      // 检查是否已存在该项
      const exists = options.some((opt) => opt.value === item.value);
      if (exists) return;

      // 记录临时项
      tempItemsRef.current.set(item.value, item);

      // 添加到选项列表开头
      setOptions((prev) => [item, ...prev]);
    },
    [options, supportTempItem],
  );

  const removeTempItem = useCallback(
    (value: string | number) => {
      if (!supportTempItem) return;

      tempItemsRef.current.delete(value);
      setOptions((prev) => prev.filter((opt) => opt.value !== value));
    },
    [supportTempItem],
  );

  const hasOption = useCallback(
    (value: string | number) => {
      return options.some((opt) => opt.value === value);
    },
    [options],
  );

  // 初始化加载
  useEffect(() => {
    if (enabled) {
      reset();
    }
  }, [enabled, JSON.stringify(extraParams)]);

  return {
    options,
    loading,
    hasMore,
    pageNo,
    onPopupScroll,
    reset,
    loadPage,
    addTempItem,
    removeTempItem,
    hasOption,
  };
}
