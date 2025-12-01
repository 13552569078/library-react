# storage 本地存储封装

## 特性

- **setLocalStorage**: 存储数据到 localStorage，注意：所有数据都会经过`JSON.stringify`后进行存储
- **getLocalStorage**: 获取 localStorage 数据
- **removeLocalStorage**: 删除指定存储项
- **clearLocalStorage**: 清空所有存储项

## API

```typescript
export const setLocalStorage = <T>(key: string, value: T): void

export function getLocalStorage<T>(key: string): T | null;
export function getLocalStorage<T>(key: string, defaultValue: T): T;

export const removeLocalStorage = (key: string): void

export const clearLocalStorage = (): void
```
