import { useContext, useMemo } from 'react';
import StoreContext from '../models/context';
import { XFlowNode, XFlowState } from '../models/store';

import { Edge } from '@xyflow/react';
import { useStoreWithEqualityFn } from 'zustand/traditional';

const useStore = <T = unknown>(
  selector: (state: XFlowState) => T,
  equalityFn?: (a: T, b: T) => boolean
) => {
  const store = useContext(StoreContext);

  if (store === null) {
    throw new Error(
      '[XFlow]: Seems like you have not used zustand provider as an ancestor.'
    );
  }

  return useStoreWithEqualityFn(store, selector, equalityFn);
};

const useStoreApi = <
  NodeType extends XFlowNode = XFlowNode,
  EdgeType extends Edge = Edge
>() => {
  const store = useContext(StoreContext);

  if (store === null) {
    throw new Error(
      '[XFlow]: Seems like you have not used zustand provider as an ancestor.'
    );
  }
  return useMemo(
    () => ({
      getState: store.getState,
      setState: store.setState,
      subscribe: store.subscribe,
      temporal: store.temporal,
    }),
    [store]
  );
};

const useTemporalStore = () => {
  const store = useContext(StoreContext);

  if (store === null) {
    throw new Error(
      '[XFlow]: Seems like you have not used zustand provider as an ancestor.'
    );
  }

  return {
    ...store.temporal.getState(),
    record: (callback: () => void) => {
      const temporalStore = store.temporal.getState();
      temporalStore.resume();
      callback();
      temporalStore.pause();
    },
  };
};

// 默认关闭时间机器
// useStoreApi().temporal.getState();

export { useStore, useStoreApi, useTemporalStore };
