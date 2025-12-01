import React, { useMemo } from 'react';
import { IconLlmDs, IconLlmLlama, IconLlmQwen } from '../../icons';

export interface ModelIconProps {
  type: string;
  [x: string]: any;
}

export const ModelIconMap = new Map([
  [['deepseek', 'ds'], IconLlmDs],
  [['meta', 'llama'], IconLlmLlama],
  [['ali', 'alibaba', 'qwen', 'qianwen'], IconLlmQwen],
]);

const ModelIcon: React.FC<ModelIconProps> = ({ type, ...rest }) => {
  const Icon = useMemo(() => {
    const t = type?.trim()?.toLowerCase().replace(/^\.+/, '');
    const entry = [...ModelIconMap.entries()].find((k) => k[0].includes(t!));
    return entry?.[1];
  }, [type]);

  return <>{Icon ? <Icon {...rest} /> : null}</>;
};

export default ModelIcon;
