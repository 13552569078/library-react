---
title: FileIcon 文件图标
order: 6
group:
  title: 通用
  path: /components
---

# FileIcon 文件图标

根据文件类型显示不同的图标。

## 代码演示

### 基础用法

<code src="./demo/basic.tsx"></code>

### 添加自定义文件类型

<code src="./demo/custom.tsx"></code>

## API

### FileIcon

| 参数 | 说明 | 类型                          | 默认值      |
| ---- | ---- | ----------------------------- | ----------- |
| type | 类型 | `string \| null \| undefined` | `undefined` |

> Icon 组件支持的属性，FileIcon 组件也支持

## 文件类型映射

### 默认文件类型映射关系

```tsx
export const FileIconMap = new Map([
  [['folder'], IconFileFolder],
  [['image', 'png', 'jpg', 'jpeg', 'webp'], IconFileImage],
  [['audio', 'wav', 'mp3', 'flv', 'ogg', 'm4a', 'acc', 'webm', 'flac'], IconFileAudio],
  [['video', 'mp4', 'mpv', 'mkv', 'wmv', 'avi', 'flv'], IconFileVideo],
  [['txt', 'text'], IconFileTxt],
  [['word', 'doc', 'docx'], IconFileWord],
  [['ppt', 'pptx'], IconFilePpt],
  [['markdown', 'md'], IconFileMd],
  [['pdf'], IconFilePdf],
  [['ofd'], IconFileOfd],
  [['csv'], IconFileCsv],
  [['excel', 'xls', 'xlsx'], IconFileExcel],
  [['json', 'jsonl'], IconFileJsonl],
  [['exe'], IconFileExe],
  [['bucket'], IconFileBucket],
  [['dmg'], IconFileDmg],
  [['torrent'], IconFileTorrent],
  [['apk'], IconFileApk],
  [['epub'], IconFileEpub],
  [['zip', 'rar', '7z', 'tar', 'gz', 'bz2'], IconFileZip],
  [['table'], IconFileTable],
  [['', 'default', undefined, null], IconFileFile],
]);
```
