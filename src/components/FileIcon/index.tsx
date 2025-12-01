import React, { useMemo } from 'react';
import {
  IconFileApk,
  IconFileAudio,
  IconFileBucket,
  IconFileCsv,
  IconFileDmg,
  IconFileEpub,
  IconFileExcel,
  IconFileExe,
  IconFileFile,
  IconFileFolder,
  IconFileImage,
  IconFileJsonl,
  IconFileMd,
  IconFileOfd,
  IconFilePdf,
  IconFilePpt,
  IconFileTable,
  IconFileTorrent,
  IconFileTxt,
  IconFileVideo,
  IconFileWord,
  IconFileZip,
} from '../../icons';

export interface FileIconProps {
  type?: string;
  [x: string]: any;
}

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

const FileIcon: React.FC<FileIconProps> = ({ type, ...rest }) => {
  const Icon = useMemo(() => {
    const t = type?.trim()?.toLowerCase().replace(/^\.+/, '');
    const entry = [...FileIconMap.entries()].find((k) => k[0].includes(t!));
    return entry?.[1] ?? IconFileFile;
  }, [type]);

  return <Icon {...rest} />;
};

export default FileIcon;
