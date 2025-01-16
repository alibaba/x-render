import { Edge, useReactFlow } from '@xyflow/react';
import { useMemoizedFn } from 'ahooks';
import { useMemo } from 'react';
import { FlowNode } from '../models/store';
import { useStoreApi } from './useStore';
import { useTemporalStore } from './useTemporalStore';
import autoLayoutNodes from '../utils/autoLayoutNodes';
import { generateCopyNodes, uuid } from '../utils';
import { message } from 'antd';

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
    getNodes: _getNodes,
    getEdges,
    screenToFlowPosition,
    flowToScreenPosition
  } = useReactFlow();
  
  const { record } = useTemporalStore();

  const getNodes = useMemoizedFn(() => {
    const nodes = _getNodes();
    const result = nodes.map(item => {
      const { data, ...rest } = item;
      const { _nodeType, ...restData } = data;
      return {
        ...rest,
        data: restData
      }
    });
    return result;
  });

  const setNodes = useMemoizedFn((nodes: FlowNode[], isTransform = false) => {
    storeApi.getState().setNodes(nodes, isTransform);
  });

  const addNodes = useMemoizedFn((nodes: FlowNode[], isTransform = false) => {
    record(() => {
      storeApi.getState().addNodes(nodes, isTransform);
    })
  });

  const setEdges = useMemoizedFn((edges: Edge[]) => {
    storeApi.getState().setEdges(edges);
  });

  const addEdges = useMemoizedFn((edges: Edge[]) => {
    storeApi.getState().addEdges(edges);
  });

  const copyNode = useMemoizedFn((nodeId) => {
    const copyNodes = generateCopyNodes(
      storeApi.getState().nodes.find((node) => node.id === nodeId),
    );
    storeApi.setState({
      copyNodes,
    });
  });

  const pasteNode = useMemoizedFn((nodeId: string, data: any) => {
    if (storeApi.getState().copyNodes.length > 0) {
      const newEdges = {
        id: uuid(),
        source: nodeId,
        target: storeApi.getState().copyNodes[0].id,
        ...data
      };
      record(() => {
        storeApi.getState().addNodes(storeApi.getState().copyNodes, false);
      })
      storeApi.getState().addEdges(newEdges);
      storeApi.setState({
        copyNodes: [],
      });
    }else{
      message.warning('请先复制节点！')
    }
  });

  const deleteNode = useMemoizedFn((nodeId) => {
    record(() => {
      storeApi.setState({
        edges: storeApi.getState().edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
      });
    })
    record(() => {
      storeApi.setState({
        nodes: storeApi.getState().nodes.filter((node) => node.id !== nodeId),
      });
    })
  })

  const runAutoLayout = useMemoizedFn(() => {
    const newNodes: any = autoLayoutNodes(storeApi.getState().nodes, storeApi.getState().edges, storeApi.getState().layout);
    setNodes(newNodes, false);
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
      flowToScreenPosition,
      runAutoLayout,
      copyNode,
      pasteNode,
      deleteNode
    }),
    [instance]
  );
};
