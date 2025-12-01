# funcs 工具函数

## 特性

- **filterParams**: 移除 undefined、null、空数组
- **getId**: 返回唯一 id，简单算法
- **downloadFile**: 下载 Blob 数据为文件

## API

```typescript
export const filterParams = <T extends object>(params: T): Partial<T>

export function getId(count: number = 12): string

export function downloadFile(content: BlobPart, filename: string): void
```
