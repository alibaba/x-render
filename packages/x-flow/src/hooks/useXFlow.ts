import { useMemo } from 'react';
import { useStoreApi } from '../hooks/useStore';

export const useXFlow = () => {
  const store = useStoreApi();

  const instance = store.getState();

  return useMemo(() => ({
    ...instance,
    // TODO: 扩展 useXFlow 的方法
  }), [instance]);
};
