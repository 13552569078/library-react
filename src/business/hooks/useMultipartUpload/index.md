---
title: useMultipartUpload 分片上传
group:
  title: hooks
  path: /businesses
  order: 10
---

# useMultipartUpload 分片上传

封装的通过 WebWorker 分片上传，依赖于 API：`/compute/api/v1/file/createMultipartUpload` 和 `/compute/api/v1/file/completeMultipartUpload`。

## 代码演示

```ts
const {
  uploadFile,
  cancelUploadChunks
} = useMultipartUploader(
  createMultipartUpload: (params: {
    fileName?: string;
    fsID?: string;
    objectPath?: string;
    projectID?: string;
    partCount: number;
  }) => Promise<MultipartInfo>,
  completeMultipartUpload: (params: {
    fsID?: string;
    objectPath?: string;
    projectID?: string;
    parts?: { eTag: string; partNumber: number }[];
    uploadID: string;
  }) => Promise<{ code?: string; statusCode?: number; [x: string]: any }>,
  opts?: UseMultipartUploaderOptions
);
```

## API

#### 1. `uploadFile` 上传文件，接口定义为：

```ts
const uploadFile = async (params: UploadFileParams): Promise<{ code?: string; statusCode?: number; [x: string]: any }>
```

#### 2. `cancelUploadChunks` 取消上传，接口定义为：

```ts
const cancelUploadChunks = (fileKey: string): void
```

## 类型定义

```ts
export type MultipartInfo = {
  uploadID: string;
  abortURL: string;
  presignedURLs: PresignedURL[];
  objectPath: string;
};

export type UploadFileParams = {
  file: File;
  fileKey?: string; // 用于取消上传的唯一 key（不传则使用 file.name+时间戳）
  onCreated?: (info: MultipartInfo) => void; // 拿到 uploadID 等
  onProgress?: (percent: number) => void; // 汇总进度（0-100）
  onSuccess?: (serverResp: any) => void;
  onError?: (err: any) => void;
  // 获取分片上传接口的入参
  uploadParams?: {
    fileName?: string;
    fsID?: string;
    objectPath?: string;
    projectID?: string;
  };
};

export type UseMultipartUploaderOptions = {
  // 组件卸载时是否自动取消所有上传，默认 true
  autoCancelOnUnmount?: boolean;
};
```
