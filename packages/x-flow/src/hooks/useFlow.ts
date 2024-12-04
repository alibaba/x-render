import { useMemo } from 'react';
import { useMemoizedFn } from 'ahooks';
import { useStoreApi } from './useStore';
import { useTemporalStore } from './useTemporalStore';
import { FlowNode } from '../models/store';
import { Edge } from '@xyflow/react';

export const useFlow = () => {
  const storeApi = useStoreApi();
  const instance = storeApi.getState();
  const temporalStore = useTemporalStore();

  const getNodes = useMemoizedFn(() => storeApi.getState().nodes);
  const getEdges = useMemoizedFn(() => storeApi.getState().edges);
  const setNodes = useMemoizedFn((nodes: FlowNode[]) => {
    temporalStore.record(() => {
      storeApi.getState().setNodes(nodes);
    })
  })
  const addNodes = useMemoizedFn((nodes: FlowNode[]) => {
    temporalStore.record(() => {
      storeApi.getState().addNodes(nodes);
    })
  })
  const setEdges = useMemoizedFn((edges: Edge[]) => {
    storeApi.getState().setEdges(edges);
  })
  const addEdges = useMemoizedFn((edges: Edge[]) => {
    storeApi.getState().addEdges(edges);
  })

  return useMemo(() => ({
    setNodes,
    addNodes,
    setEdges,
    addEdges,
    getNodes,
    getEdges,
  }), [instance]);
};
