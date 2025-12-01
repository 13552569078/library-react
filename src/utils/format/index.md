# format 格式化工具

## 特性

- **formatFileSize**: GB/KB/KB
- **formatSeconds**: 将秒数格式化为 x 天 x 小时 x 分钟
- **formatSecondsToObject**: 转成`{val: number, unit: string}`形式

## 代码演示

### 基础用法

<code src="./demo/basic.tsx"></code>

## API

### formatFileSize

```typescript
formatFileSize(bytes: number): string
```

**参数**

| 参数  | 说明 | 类型     | 默认值 |
| ----- | ---- | -------- | ------ |
| bytes | 字节 | `number` | -      |

### formatSeconds

```typescript
formatSeconds(sec?: number | string | null): string
```

**参数**

| 参数 | 说明 | 类型                       | 默认值 |
| ---- | ---- | -------------------------- | ------ |
| sec  | 秒   | `number \| string \| null` | -      |

### formatSecondsToObject

```typescript
formatSecondsToObject(seconds: number): {val: number; unit: 'day' | 'hour';}
```

**参数**

| 参数    | 说明 | 类型     | 默认值 |
| ------- | ---- | -------- | ------ |
| seconds | 秒   | `number` | -      |
