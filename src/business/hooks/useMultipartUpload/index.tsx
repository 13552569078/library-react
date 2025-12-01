import { useEffect, useRef, useCallback } from 'react';
import type { CancelTokenSource } from 'axios';
import createChunksWorker from './createChunksWorker';
import { createCancelToken, requestApi } from './utils';
import { isRequestSuccess } from '../../utils';
import { getId as uuid } from '../../../utils';

type PartItemType = { partNumber: number; eTag: string };
type PresignedURL = { partNumber: number; url: string };

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

export function useMultipartUploader(
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
  opts?: UseMultipartUploaderOptions,
) {
  const { autoCancelOnUnmount = true } = opts || {};

  // 按文件 key 记录其每个分片的 CancelTokenSource，便于取消
  const cancelTokenSourcesRef = useRef<Record<string, CancelTokenSource[]>>({});

  // 取消指定文件的所有分片上传
  const cancelUploadChunks = useCallback((fileKey: string) => {
    cancelTokenSourcesRef.current[fileKey]?.forEach((src) => src?.cancel('用户取消了上传'));
  }, []);

  // 取消所有上传任务
  const cancelAllUploads = useCallback(() => {
    const map = cancelTokenSourcesRef.current || {};
    Object.keys(map).forEach((fileKey) => {
      map[fileKey]?.forEach((src) => {
        src?.cancel?.('组件卸载，取消上传');
      });
      delete map[fileKey];
    });
    cancelTokenSourcesRef.current = {};
  }, []);

  // 自动取消：组件卸载时批量取消
  useEffect(() => {
    return () => {
      if (autoCancelOnUnmount) {
        cancelAllUploads();
      }
    };
  }, []);

  // 通过 Web Worker 对文件进行切片，并在结束后安全回收 worker
  const getFileChunks = (file: File) => {
    const { worker } = createChunksWorker();

    return new Promise<any[]>((resolve, reject) => {
      const timer: any = null;

      const cleanup = () => {
        if (timer) clearTimeout(timer);
        (worker as any)?.terminate?.();
      };

      worker.onmessage = (e: MessageEvent) => {
        const data = (e && (e as any).data) || {};
        if (data?.type === 'chunks') {
          cleanup();
          resolve(data.chunks || []);
        } else if (data?.type === 'error') {
          cleanup();
          reject(new Error(data?.message || 'Worker 切片失败'));
        }
      };

      worker.onerror = (err) => {
        cleanup();
        reject(err);
      };

      // 启动切片
      worker.postMessage({ file });
    });
  };

  const uploadChunks = async ({
    multipartInfo,
    params,
    chunks,
    fileKey,
  }: {
    multipartInfo: MultipartInfo;
    chunks: any[];
    fileKey: string;
    params: UploadFileParams;
  }) => {
    const { abortURL, presignedURLs } = multipartInfo;
    const { onProgress, file } = params;
    const urlMap = presignedURLs.reduce((acc, { partNumber, url }) => {
      acc[partNumber] = url;
      return acc;
    }, {} as Record<number, string>);

    // 上传所有分片并汇总进度
    const parts: PartItemType[] = [];
    const chunkLoaded = new Array(chunks.length).fill(0);

    try {
      const requestList = chunks.map((chunk, index) => {
        const cancelTokenSource = createCancelToken();
        if (!cancelTokenSourcesRef.current[fileKey]) {
          cancelTokenSourcesRef.current[fileKey] = [];
        }
        cancelTokenSourcesRef.current[fileKey][index] = cancelTokenSource;

        // 上传单个分片
        return requestApi(
          {
            url: urlMap[index + 1],
            method: 'PUT',
            data: chunk.file,
            cancelToken: cancelTokenSource.token,
            onUploadProgress: (pe) => {
              if (file.size === 0) {
                onProgress?.(100);
                return;
              }

              chunkLoaded[index] = pe.loaded || 0;
              const totalLoaded = chunkLoaded.reduce((s, l) => s + l, 0);
              const percent = Math.round((totalLoaded / file.size) * 100);
              onProgress?.(percent);
            },
          },
          cancelTokenSource,
        ).then((res) => {
          if (res && res.eTag) {
            parts.push({ partNumber: index + 1, eTag: res.eTag });
          } else {
            throw new Error(`分片 ${index + 1} 上传失败`);
          }
        });
      });
      // 等待所有分片上传完成
      await Promise.all(requestList);

      // 针对空文件，onUploadProgress 可能从未触发，确保上传完成时通知 100%
      if (file.size === 0) {
        onProgress?.(100);
      }
      return parts.sort((a, b) => a.partNumber - b.partNumber);
    } catch {
      // 取消所有分片上传
      if (fileKey) cancelUploadChunks(fileKey);
      await requestApi({ url: abortURL, method: 'DELETE' });
      throw new Error('文件上传失败');
    }
  };

  const uploadFile = async (params: UploadFileParams) => {
    const { file, fileKey: inputKey, onCreated, onSuccess, onError, uploadParams } = params;

    const fileKey = inputKey || uuid();

    try {
      // 1. 使用 Worker 切片
      const chunks = await getFileChunks(file);

      // 2. 获取分片上传地址
      const multipartInfo: MultipartInfo = await createMultipartUpload({
        ...uploadParams,
        partCount: chunks.length,
      });
      onCreated?.(multipartInfo);
      const { uploadID } = multipartInfo;

      // 3. 上传所有分片
      const parts = await uploadChunks({
        multipartInfo,
        chunks,
        fileKey,
        params,
      });

      // 4. 完成分片上传
      const completeRes = await completeMultipartUpload({
        ...uploadParams,
        parts: parts,
        uploadID,
        objectPath: multipartInfo.objectPath,
      });

      if (completeRes?.code === 'Success' || isRequestSuccess(completeRes as any)) {
        onSuccess?.(completeRes);
        // 成功后清理 token
        delete cancelTokenSourcesRef.current[fileKey];
        return completeRes;
      }

      throw new Error('上传完成但服务器返回异常状态');
    } catch (err: any) {
      // 失败则尝试取消并通知服务端中止
      try {
        cancelUploadChunks(fileKey);
      } catch {}

      onError?.(err);
      throw err;
    }
  };

  return {
    uploadFile,
    cancelUploadChunks,
  };
}
