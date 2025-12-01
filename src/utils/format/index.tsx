export function formatFileSize(bytes: number) {
  if (bytes >= 1073741824) {
    // 1GB = 1024^3 bytes
    return (bytes / 1073741824).toFixed(2) + 'GB';
  } else if (bytes >= 1048576) {
    // 1MB = 1024^2 bytes
    return (bytes / 1048576).toFixed(2) + 'MB';
  } else {
    // 小于1MB
    return (bytes / 1024).toFixed(2) + 'KB';
  }
}

// 将秒数格式化为 x天x小时x分钟
export function formatSeconds(sec?: number | string | null) {
  const total = Math.max(0, Math.floor(Number(sec) || 0));
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);

  const res = [
    { num: days, unit: '天' },
    { num: hours, unit: '小时' },
    { num: minutes, unit: '分钟' },
  ].filter((item) => item.num > 0);

  return res.map((item) => `${item.num}${item.unit}`).join('');
}

export function formatSecondsToObject(seconds: number): {
  val: number;
  unit: 'day' | 'hour';
} {
  if (seconds <= -1) {
    return { val: -1, unit: 'day' };
  }
  const total = Math.max(0, Math.floor(Number(seconds) || 0));

  if (total >= 86400) {
    // 转为天（保留两位小数，去掉多余的 0）
    const days = +(total / 86400).toFixed(2);
    return { val: days, unit: 'day' };
  } else {
    // 转为小时
    const hours = +(total / 3600).toFixed(2);
    return { val: hours, unit: 'hour' };
  }
}
