import { Edge, useReactFlow } from '@xyflow/react';
import { useMemoizedFn } from 'ahooks';
import { useMemo } from 'react';
import { FlowNode } from '../models/store';
import { useStoreApi } from './useStore';

// useFlow 维护原则
// 1. 尽量复用 reactflow 已有的方法，不要重复造轮子
// 2. 非必要不暴露新的方法和状态
export const useFlow = () => {
  const storeApi = useStoreApi();
  const instance = storeApi.getState();
  const {
    zoomIn,
    zoomOut,
    zoomTo,
    getZoom,
    setViewport,
    getViewport,
    fitView,
    setCenter,
    fitBounds,
    toObject,
    getNodes,
    getEdges,
    screenToFlowPosition,
    flowToScreenPosition
  } = useReactFlow();
  const setNodes = useMemoizedFn((nodes: FlowNode[]) => {
    storeApi.getState().setNodes(nodes);
  });
  const addNodes = useMemoizedFn((nodes: FlowNode[], isVanilla = true) => {
    storeApi.getState().addNodes(nodes, isVanilla);
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
      toObject,
      zoomIn,
      zoomOut,
      zoomTo,
      getZoom,
      setViewport,
      getViewport,
      fitView,
      setCenter,
      fitBounds,
      screenToFlowPosition,
      flowToScreenPosition
    }),
    [instance]
  );
};
