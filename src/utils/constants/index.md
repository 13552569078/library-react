# constants 常用常量

## API

```typescript
// 是否在CCloud中
export const isInCCloud = !!(window as any).SERVER_FLAGS?.basePath;

// 是否在微前端中
export const isWujie = !!(window as any).$wujie;
```
