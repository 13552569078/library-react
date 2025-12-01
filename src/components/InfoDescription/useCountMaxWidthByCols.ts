import { useLayoutEffect, useRef, useState } from 'react';
import type { IData } from '.';

export default function useCountMaxWidthByCols({
  autoLabelWidth,
  colon,
  column,
  data,
}: {
  autoLabelWidth: boolean;
  colon: boolean;
  column: number;
  data: Omit<IData, 'data'>[];
}) {
  // 按列数分类统计：key=列数，value=该列数下每一列的最大label宽度数组
  const [widthMapByCols, setWidthMapByCols] = useState<Record<number, number[]>>({});
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useLayoutEffect(() => {
    if (!autoLabelWidth) return;

    // 准备离屏 canvas
    const canvas = canvasRef.current || (canvasRef.current = document.createElement('canvas'));
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 与展示一致的字体设定（字重400，14px）
    ctx.font =
      'normal 400 14px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Microsoft YaHei",system-ui';
    const nextMap: Record<number, number[]> = {};

    data?.forEach((group) => {
      const cols = group.column ?? column;
      if (!nextMap[cols]) nextMap[cols] = Array(cols).fill(0);

      group.items?.forEach((it, idx) => {
        const colIdx = idx % cols;
        const text = `${it.label}${colon ? '：' : ''}`; // 中文全角冒号
        const w = ctx.measureText(text).width;
        if (w > nextMap[cols][colIdx]) {
          nextMap[cols][colIdx] = w;
        }
      });
    });

    // 向上取整并增加缓冲宽度，避免截断和折行
    Object.keys(nextMap).forEach((k) => {
      const key = Number(k);
      nextMap[key] = nextMap[key].map((v) => Math.ceil(v) + 8); // 增加8px缓冲
    });

    setWidthMapByCols(nextMap);
  }, [data, autoLabelWidth, colon, column]);

  return { widthMapByCols };
}
