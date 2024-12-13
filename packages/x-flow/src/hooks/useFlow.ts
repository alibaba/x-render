import { Edge } from '@xyflow/react';
import { useMemoizedFn } from 'ahooks';
import { useMemo } from 'react';
import { FlowNode } from '../models/store';
import { useStoreApi } from './useStore';

export const useFlow = () => {
  const storeApi = useStoreApi();
  const instance = storeApi.getState();

  const getNodes = useMemoizedFn(() => storeApi.getState().nodes);
  const getEdges = useMemoizedFn(() => storeApi.getState().edges);
  const setNodes = useMemoizedFn((nodes: FlowNode[]) => {
    storeApi.getState().setNodes(nodes);
  });
  const addNodes = useMemoizedFn((nodes: FlowNode[]) => {
    storeApi.getState().addNodes(nodes);
  });
  const setEdges = useMemoizedFn((edges: Edge[]) => {
    storeApi.getState().setEdges(edges);
  });
  const addEdges = useMemoizedFn((edges: Edge[]) => {
    storeApi.getState().addEdges(edges);
  });

  return useMemo(
    () => ({
      setNodes,
      addNodes,
      setEdges,
      addEdges,
      getNodes,
      getEdges,
    }),
    [instance]
  );
};
