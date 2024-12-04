import { useContext, useMemo } from 'react';
import StoreContext from '../models/context';
import { FlowNode, FlowState } from '../models/store';

import { Edge } from '@xyflow/react';
import { useStoreWithEqualityFn } from 'zustand/traditional';

const useStore = <T = unknown>(
  selector: (state: FlowState) => T,
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
  NodeType extends FlowNode = FlowNode,
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

export { useStore, useStoreApi };
