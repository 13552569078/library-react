import { useState, useCallback } from 'react';

const useLoading = <T extends (...args: any[]) => Promise<any>>(
  handler: T,
): { loading: boolean; wrapperHandler: (...args: Parameters<T>) => ReturnType<T> } => {
  const [loading, setLoading] = useState(false);

  const wrapperHandler = useCallback(
    // @ts-ignore
    async (...args: Parameters<T>): ReturnType<T> => {
      setLoading(true);
      let result: ReturnType<T>;
      try {
        result = await handler(...args);
      } finally {
        setLoading(false);
      }
      return result;
    },
    [handler],
  );

  return { loading, wrapperHandler };
};

export { useLoading };
