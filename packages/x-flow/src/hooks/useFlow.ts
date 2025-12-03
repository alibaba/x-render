import { useMemo } from 'react';
import { useMemoizedFn } from 'ahooks';
import { Edge, useReactFlow } from '@xyflow/react';

import { FlowNode } from '../models/store';
import { useStoreApi } from './useStore';
import { useTemporalStore } from './useTemporalStore';
import autoLayoutNodes from '../utils/autoLayoutNodes';
import { generateCopyNodes, safeJSONParse, safeJsonStringify, uuid } from '../utils';
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
    toObject: _toObject,
    getNodes: _getNodes,
    getEdges,
    screenToFlowPosition,
    flowToScreenPosition
  } = useReactFlow();

  const { record } = useTemporalStore();

  const toObject = useMemoizedFn(() => {
    const { nodes, ...rest } = _toObject();
    return {
      ...rest,
      nodes: getNodes(nodes)
    };
  });

  const getFlowData = () => {
    const { nodes, edges } = _toObject();
    return {
      edges,
      nodes: getNodes(nodes)
    };
  };

  const setFlowData = ({ nodes, edges }) => {
    if (!!nodes) {
      setNodes(nodes);
    }

    if (!!edges) {
      setEdges(edges);
    }
  };

  const getNodes = useMemoizedFn((_nodes: any) => {
    const nodes = _nodes || _getNodes();
    const result = nodes.map((item: any) => {
      const { data, ...rest } = item;
      const { _nodeType, ...restData } = data;
      return {
        ...rest,
        data: restData,
        type: _nodeType
      }
    });
    return result;
  });

  const setNodes = useMemoizedFn((nodes: FlowNode[]) => {
    storeApi.getState().setNodes(nodes);
  });

  const addNodes = useMemoizedFn((nodes: FlowNode[]) => {
    record(() => {
      storeApi.getState().addNodes(nodes);
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

    // 清除之前的超时定时器
    if (storeApi.getState().copyTimeoutId) {
      clearTimeout(storeApi.getState().copyTimeoutId);
    }

    // 设置isAddingNode为true，开启mousemove监听
    storeApi.getState().setIsAddingNode(true);

    // 设置30秒超时，自动关闭mousemove监听
    const timeoutId = setTimeout(() => {
      storeApi.getState().setIsAddingNode(false);
      storeApi.setState({ copyTimeoutId: null });
    }, 30000);

    storeApi.setState({
      copyNodes,
      copyTimeoutId: timeoutId,
    });
  });

  const copyFLowNodes = useMemoizedFn((nodes: any[],onCopyCompleted:(nodes:any[])=>void) => {
    const copyNodes = nodes.map(node => {
      return {
        id: uuid(),
        type: node.type,
        data: {
          ...node.data,
        },
        position: { x: 0, y: 0 },
        sourceId: node.id,
        ...node
      };
    });

    navigator.clipboard.writeText(safeJsonStringify(copyNodes)).catch(err => {
      message.error('节点复制失败');
    }).then(()=>{
      message.success('节点复制成功');
      onCopyCompleted && onCopyCompleted(copyNodes)
    })
  });

  const pasteNode = useMemoizedFn((nodeId: string, data: any) => {
    if (storeApi.getState().copyNodes.length > 0) {
      // 清除超时定时器
      if (storeApi.getState().copyTimeoutId) {
        clearTimeout(storeApi.getState().copyTimeoutId);
      }

      // 关闭mousemove监听
      storeApi.getState().setIsAddingNode(false);

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
        copyTimeoutId: null,
      });
    }else{
      message.warning('请先复制节点！')
    }
  });

  const pasteFLowNodes = useMemoizedFn(async (onPasteCompleted:(nodes:any[])=>void) => {
    const text = await navigator.clipboard.readText().catch(() => null);
    const mousePosition = storeApi.getState().mousePosition;
    if (text) {
      const copyNodeData = safeJSONParse(text, []);
      const flowPos = screenToFlowPosition({
        x: mousePosition.elementX,
        y: mousePosition.elementY,
      });
      const copyNodes = copyNodeData.map((node, index) => ({
        ...node,
        id: uuid(),
        position: {
          x: flowPos.x + index * 200,
          y: flowPos.y + index * 200,
        },
      }));
      record(() => {
        storeApi.getState().addNodes(copyNodes, false);
      });
      onPasteCompleted && onPasteCompleted(copyNodes)
    }
  });

  const pasteNodeSimple = useMemoizedFn(() => {
    const mousePosition = storeApi.getState().mousePosition;
    if (storeApi.getState().copyNodes.length > 0) {
      // 清除超时定时器
      if (storeApi.getState().copyTimeoutId) {
        clearTimeout(storeApi.getState().copyTimeoutId);
      }

      // 关闭mousemove监听
      storeApi.getState().setIsAddingNode(false);

      const flowPos = screenToFlowPosition({
        x: mousePosition.elementX,
        y: mousePosition.elementY,
      });
      const copyNodes = storeApi.getState().copyNodes.map(node => ({
        ...node,
        position: {
          x: flowPos.x,
          y: flowPos.y,
        },
      }));
      record(() => {
        storeApi.getState().addNodes(copyNodes, false);
        // 将清空剪贴板的操作也加入记录，使其可撤销
        storeApi.setState({
          copyNodes: [],
          copyTimeoutId: null,
        });
      });
    } else {
      // message.warning('请先复制节点！');
    }
  });

  const deleteNode = useMemoizedFn(nodeId => {
    record(() => {
      storeApi.setState({
        edges: storeApi
          .getState()
          .edges.filter(
            edge => edge.source !== nodeId && edge.target !== nodeId
          ),
      });
    });
    record(() => {
      storeApi.setState({
        nodes: storeApi.getState().nodes.filter(node => node.id !== nodeId),
      });
    });
  });

  const runAutoLayout = useMemoizedFn(() => {
    const newNodes: any = autoLayoutNodes(
      storeApi.getState().nodes,
      storeApi.getState().edges,
      storeApi.getState().layout
    );
    setNodes(newNodes);
  });

  return useMemo(
    () => ({
      setNodes,
      addNodes,
      setEdges,
      addEdges,
      getFlowData,
      setFlowData,
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
      pasteNodeSimple,
      deleteNode,
      copyFLowNodes,
      pasteFLowNodes,
    }),
    [instance]
  );
}
