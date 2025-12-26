import {
  Background,
  BackgroundVariant,
  MarkerType,
  ReactFlow,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useEventListener, useMemoizedFn } from 'ahooks';
import { produce, setAutoFreeze } from 'immer';
import { isFunction, isString } from 'lodash';
import type { FC } from 'react';
import React, {
  memo,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import CandidateNode from './components/CandidateNode';
import CustomEdge from './components/CustomEdge';
import PanelContainer from './components/PanelContainer';
import PanelStatusLogContainer from './components/PanelStatusLogContainer';
import { useEventEmitterContextContext } from './models/event-emitter';

import CustomNodeComponent from './components/CustomNode';
import { useFlow } from './hooks/useFlow';
import { useStore, useStoreApi } from './hooks/useStore';

import Operator from './operator';
import FlowProps from './types';
import { isTruthy, uuid, uuid4 } from './utils';
import autoLayoutNodes from './utils/autoLayoutNodes';

import { message } from 'antd';
import { shallow } from 'zustand/shallow';
import NodeEditor from './components/NodeEditor';
import NodeLogPanel from './components/NodeLogPanel';
import { useTemporalStore } from './hooks/useTemporalStore';
import './index.less';
import { ConfigContext } from './models/context';

const CustomNode = memo(CustomNodeComponent);
const edgeTypes = { buttonedge: memo(CustomEdge) };

/***
 *
 * XFlow 入口
 *
 */
const XFlow: FC<FlowProps> = memo(props => {
  const workflowContainerRef = useRef<HTMLDivElement>(null);
  const storeApi = useStoreApi();
  const { zoomTo } = useReactFlow();
  const {
    layout,
    nodes,
    edges,
    setNodes,
    setEdges,
    panOnDrag,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setCandidateNode,
    isAddingNode,
    setMousePosition,
    copyNodes,
  } = useStore(
    s => ({
      nodes: s.nodes,
      edges: s.edges,
      setNodes: s.setNodes,
      setEdges: s.setEdges,
      layout: s.layout,
      panOnDrag: s.panOnDrag,
      setMousePosition: s.setMousePosition,
      isAddingNode: s.isAddingNode,
      setCandidateNode: s.setCandidateNode,
      onNodesChange: s.onNodesChange,
      onEdgesChange: s.onEdgesChange,
      onConnect: s.onConnect,
      copyNodes: s.copyNodes,
    }),
    shallow
  );
  const { record } = useTemporalStore();
  const [activeNode, setActiveNode] = useState<any>(null);
  const { settingMap, globalConfig, readOnly, logPanel } =
    useContext(ConfigContext);
  const [openPanel, setOpenPanel] = useState<boolean>(true);
  const [openLogPanel, setOpenLogPanel] = useState<boolean>(true);
  const {
    onNodeClick,
    onEdgeClick,
    onPasteCompleted,
    onCopyCompleted,
    zoomOnScroll = true,
    panOnScroll = false,
    preventScrolling = true,
    connectionLineComponent,
  } = props;
  const nodeEditorRef = useRef(null);
  const { copyNode, pasteNodeSimple, copyFLowNodes, pasteFLowNodes } = useFlow();
  const { undo, redo } = useTemporalStore();

  useEffect(() => {
    zoomTo(0.8);
    setAutoFreeze(false);
    return () => {
      setAutoFreeze(true);
      const { copyTimeoutId } = storeApi.getState();
      if (copyTimeoutId) {
        clearTimeout(copyTimeoutId);
      }
    };
  }, []);

  const handleKeyDown = useMemoizedFn((e: KeyboardEvent) => {
    if ((e.key === 'd' || e.key === 'D') && (e.ctrlKey || e.metaKey))
      e.preventDefault();
    if ((e.key === 'z' || e.key === 'Z') && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      undo();
    }
    if ((e.key === 'y' || e.key === 'Y') && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      redo();
    }
    if ((e.key === 's' || e.key === 'S') && (e.ctrlKey || e.metaKey))
      e.preventDefault();
    if ((e.key === 'c' || e.key === 'C') && (e.ctrlKey || e.metaKey)) {
      const latestNodes = storeApi.getState().nodes;
      // let isNodeCopyEvent = false;
      // if (e.target instanceof HTMLElement) {
      //   const target = e.target as HTMLElement;

      //   if (
      //     (isString(target.tagName) &&
      //       target.tagName.toLowerCase() === 'body') ||
      //     (target.tagName.toLowerCase() === 'div' &&
      //       target.classList &&
      //       isFunction(target.classList.contains) &&
      //       (target.classList.contains('ant-drawer') ||
      //         target.classList.contains('react-flow__node') ||
      //         target.id === 'xflow-container')) ||
      //     (target.tagName.toLowerCase() === 'div' && target.className === 'react-flow__nodesselection-rect')
      //   ) {
      //     isNodeCopyEvent = true;
      //   }
      // }
      const selectedNodes = latestNodes?.filter(node => node.selected);
      if ((document.activeElement === workflowContainerRef.current || document.activeElement.className === 'react-flow__nodesselection-rect') && selectedNodes.length > 0) {
        const flag = selectedNodes.some(selectedNode => {
          const nodeType = selectedNode?.data?._nodeType;
          if (isString(nodeType) && nodeType) {
            const nodeConfig = settingMap[nodeType];
            if (nodeConfig?.disabledShortcutCopy) {
              message.warning(
                `${selectedNode.data?.title || selectedNode.id}节点不允许复制`
              );

              return true;
            }
          }
        });
        if (flag) {
          return;
        }
        //copyNode(selectedNode.id);
        // 复制节点
        e.preventDefault();
        copyFLowNodes(selectedNodes,onCopyCompleted);
      }
    } else if ((e.key === 'v' || e.key === 'V') && (e.ctrlKey || e.metaKey)) {
      if(document.activeElement === workflowContainerRef.current){
        e.preventDefault();
        //pasteNodeSimple();
        pasteFLowNodes(onPasteCompleted)
      }
    } else if (e.key === 'Escape') {
      setOpenPanel(false);
      workflowContainerRef.current?.focus();
    }
  });
  useEventListener('keydown', handleKeyDown, {
    target: workflowContainerRef,
  });

  useEventListener(
    'mousemove',
    e => {
      const containerClientRect =
        workflowContainerRef.current?.getBoundingClientRect();
      if (containerClientRect) {
        setMousePosition({
          pageX: e.clientX,
          pageY: e.clientY,
          elementX: e.clientX - containerClientRect.left,
          elementY: e.clientY - containerClientRect.top,
        });
      }
    },
    {
      target: workflowContainerRef.current,
      enable: isAddingNode,
      // enable: true, // 复制粘贴的时候需要监听鼠标位置
    }
  );

  const { eventEmitter } = useEventEmitterContextContext();
  eventEmitter?.useSubscription(async (v: any) => {
    // 整理画布
    if (v.type === 'auto-layout-nodes') {
      const newNodes: any = autoLayoutNodes(
        storeApi.getState().nodes,
        edges,
        layout
      );
      setNodes(newNodes, false);

      // 整理画布完成后执行回调
      const onAutoLayoutCompleted = globalConfig?.controls?.onAutoLayoutCompleted;
      if (onAutoLayoutCompleted) {
        await onAutoLayoutCompleted(newNodes);
      }
    }

    if (v.type === 'deleteNode') {
      setActiveNode(null);
    }
  });

  // 新增节点
  const handleAddNode = (data: any) => {
    const title = settingMap[data?._nodeType]?.title || data?._nodeType;
    const newNode = {
      id: uuid(),
      type: 'custom',
      data: {
        title: `${title}_${uuid4()}`,
        ...data,
      },
      position: {
        x: 0,
        y: 0,
      },
    };
    setCandidateNode(newNode);
  };


  const hoveredEdgeIdRef = useRef<string | null>(null);// edge 移入/移出效果

  const getUpdateEdgeConfig = useMemoizedFn((edgeId: string, color: string, shouldCheckColor = false, allowedColors?: string[]) => {
    const currentEdges = storeApi.getState().edges;
    const currEdge = currentEdges.find(e => e.id === edgeId);

    // 如果需要检查颜色，只有在允许的颜色范围内才更新
    if (shouldCheckColor && allowedColors && currEdge?.style?.stroke) {
      if (!allowedColors.includes(currEdge.style.stroke)) {
        return; // 如果是自定义颜色，不更新
      }
    }

    const newEdges = produce(currentEdges, draft => {
      const draftEdge: any = draft.find(e => e.id === edgeId);
      if (draftEdge) {
        draftEdge.style = {
          ...draftEdge.style,
          stroke: color,
        };
        draftEdge.markerEnd = {
          ...draftEdge.markerEnd,
          color,
        };
      }
    });
    setEdges(newEdges);
  });

  const nodeTypes = useMemo(() => {
    return {
      custom: (props: any) => {
        const { data, id, ...rest } = props;
        const { _nodeType, _status, ...restData } = data || {};
        const nodeSetting = settingMap[_nodeType] || {};
        const showPanel = nodeSetting?.nodePanel?.showPanel ?? true;
        return (
          <CustomNode
            {...rest}
            id={id}
            data={{ ...restData }}
            type={_nodeType}
            layout={layout}
            status={_status}
            onClick={async e => {
              if (nodeEditorRef?.current?.validateForm) {
                const result = await nodeEditorRef?.current?.validateForm();
                if (!result) {
                  message.error('请检查必填项！');
                  return;
                }
              }
              setActiveNode({
                id,
                _nodeType,
                values: { ...restData },
                _status,
              });
              if (!showPanel) {
                setOpenPanel(false);
              } else {
                setOpenPanel(true);
              }
              setOpenLogPanel(true);
            }}
            onDelete={() => {
              // 删除节点并关闭弹窗
              setActiveNode(null);
            }}
          />
        );
      },
    };
  }, [layout]);

  const NodeEditorWrap = useMemo(() => {
    return (
      <NodeEditor
        ref={nodeEditorRef}
        data={activeNode?.values}
        nodeType={activeNode?._nodeType}
        id={activeNode?.id}
      />
    );
    // JSON.stringify(activeNode)
  }, [activeNode?.id]);

  const NodeLogWrap = useMemo(() => {
    return (
      <NodeLogPanel
        data={activeNode?.values}
        // onChange={handleNodeValueChange}
        nodeType={activeNode?._nodeType}
        id={activeNode?.id}
        node={activeNode}
        onTrackCollapseChange={data => {
          if (data) {
            setActiveNode(data);
            setOpenPanel(true);
          }
        }}
      />
    );
  }, [activeNode?.id]);

  const deletable = globalConfig?.edge?.deletable ?? true;
  const strokeWidth = globalConfig?.edge?.strokeWidth ?? 1.5;
  const panelonClose = globalConfig?.nodePanel?.onClose;

  const handleClosePanel = useMemoizedFn(async () => {
    // 面板关闭校验表单
    const result = await nodeEditorRef?.current?.validateForm();
    if (!result) {
      return;
    }
    setOpenPanel(false);
    workflowContainerRef.current?.focus();

    // 如果日志面板关闭
    if (!isTruthy(activeNode?._status) || !openLogPanel) {
      setActiveNode(null);
    }
    if (isFunction(panelonClose)) {
      panelonClose(activeNode?.id);
    }
  });

  const handleCloseLogPanel = useMemoizedFn(() => {
    setOpenLogPanel(false);
    !openPanel && setActiveNode(null);
    workflowContainerRef.current?.focus();
  });

  // 点击空白处关闭抽屉
  const handlePaneClick = useMemoizedFn(() => {
    if (openPanel && activeNode) {
      handleClosePanel();
    }
    if (openLogPanel && activeNode) {
      handleCloseLogPanel();
    }
  });

  return (
    <div
      id="xflow-container"
      ref={workflowContainerRef}
      tabIndex={0}
    >
      <ReactFlow
        panOnDrag={panOnDrag}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodes={nodes}
        edges={edges}
        minZoom={0.3}
        zoomOnScroll={zoomOnScroll}
        panOnScroll={panOnScroll} // 禁用滚动平移
        preventScrolling={preventScrolling} // 允许页面滚动
        connectionLineComponent={connectionLineComponent}
        connectionRadius={100}
        defaultEdgeOptions={{
          type: 'buttonedge',
          style: {
            strokeWidth, // 线粗细
          },
          markerEnd: {
            type: MarkerType.ArrowClosed, // 箭头
            width: 18,
            height: 18,
          },
          deletable: deletable, //默认连线属性受此项控制
        }}
        onBeforeDelete={async elements => {
          if (readOnly) {
            return false;
          }
          const nodesToDelete = elements?.nodes || [];
          const blockedNodes = nodesToDelete?.filter(node => {
            const nodeConfig = settingMap[node?.data?._nodeType as string];
            return nodeConfig?.hasOwnProperty('disabledShortcutDelete')
              ? Boolean(nodeConfig?.disabledShortcutDelete)
              : false;
          });
          if (blockedNodes?.length > 0) {
            message.warning(
              `${blockedNodes
                .map(n => n.data?.title || n.id)
                .join(', ')}节点不允许删除！`
            );
            return false;
          }
          return true;
        }}
        onConnect={onConnect}
        onNodesChange={changes => {
          changes.forEach(change => {
            if (change.type === 'remove') {
              record(() => {
                onNodesChange([change]);
              });
            } else {
              onNodesChange([change]);
            }
          });
        }}
        onEdgesChange={changes => {
          changes.forEach(change => {
            if (change.type === 'remove') {
              record(() => {
                onEdgesChange([change]);
              });
            } else {
              onEdgesChange([change]);
            }
          });
        }}
        onEdgeMouseEnter={(_, edge: any) => {
          // 如果之前有 hover 的 edge，先重置它的颜色（只重置我们设置过的颜色）
          if (hoveredEdgeIdRef.current && hoveredEdgeIdRef.current !== edge.id) {
            getUpdateEdgeConfig(hoveredEdgeIdRef.current, '#c9c9c9', true, ['#2970ff', '#c9c9c9']);
          }
          hoveredEdgeIdRef.current = edge.id;
          // 设置当前 edge 为高亮色（只有当没有自定义颜色时才更新）
          const currentEdges = storeApi.getState().edges;
          const currentEdge = currentEdges.find(e => e.id === edge.id);
          const currentStroke = currentEdge?.style?.stroke;
          // 只有当没有设置颜色或是默认灰色时才设置为高亮色
          if (!currentStroke || currentStroke === '#c9c9c9') {
            getUpdateEdgeConfig(edge.id, '#2970ff');
          }
        }}
        onEdgeMouseLeave={(_, edge) => {
          if (hoveredEdgeIdRef.current === edge.id) {
            // 重置当前 edge 的颜色（只重置我们设置过的颜色）
            hoveredEdgeIdRef.current = null;
          }
          getUpdateEdgeConfig(edge.id, '#c9c9c9', true, ['#2970ff', '#c9c9c9']);
        }}
        onNodesDelete={() => {
          setActiveNode(null);
        }}
        onNodeClick={(event, node) => {
          onNodeClick && onNodeClick(event, node);
        }}
        deleteKeyCode={globalConfig?.deleteKeyCode}
        onEdgeClick={(event, edge) => {
          onEdgeClick && onEdgeClick(event, edge);
        }}
        onPaneClick={handlePaneClick}
      >
        <CandidateNode />
        <Operator addNode={handleAddNode} xflowRef={workflowContainerRef} />
        <Background
          gap={[16, 16]}
          size={0.6}
          color="black"
          variant={BackgroundVariant.Dots}
        />
        {activeNode && openPanel && (
          <PanelContainer
            id={activeNode?.id}
            nodeType={activeNode?._nodeType}
            onClose={handleClosePanel}
            node={activeNode}
            data={activeNode?.values}
            openLogPanel={openLogPanel}
          >
            {NodeEditorWrap}
          </PanelContainer>
        )}
        {isTruthy(activeNode?._status) &&
          openLogPanel &&
          Boolean(logPanel?.enable ?? true) && (
            <PanelStatusLogContainer
              id={activeNode?.id}
              nodeType={activeNode?._nodeType}
              onClose={handleCloseLogPanel}
              data={activeNode?.values}
            >
              {NodeLogWrap}
            </PanelStatusLogContainer>
          )}
      </ReactFlow>
    </div>
  );
});

export default XFlow;
