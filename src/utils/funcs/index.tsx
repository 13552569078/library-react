import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';

// 过滤函数：移除 undefined、null、空数组
export const filterParams = <T extends object>(params: T): Partial<T> => {
  return omitBy(params, (value) => {
    // 1. 过滤 undefined 和 null（使用 isNil）
    if (isNil(value)) return true;

    // 2. 过滤空数组（使用 isEmpty 且判断是数组）
    if (Array.isArray(value) && isEmpty(value)) return true;

    // 其他情况保留属性
    return false;
  });
};

const HEX = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const HEX_LETTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
export function getId(count: number = 12) {
  let str = '';
  str += HEX_LETTERS[(Math.random() * 26) | 0];
  let num = count - 1;
  while (num--) str += HEX[(Math.random() * 62) | 0];
  return str;
}

export function downloadFile(content: BlobPart, filename: string) {
  const a = document.createElement('a');
  const blob = content instanceof Blob ? content : new Blob([content]);
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}
