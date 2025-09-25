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
import { debounce, get, isFunction } from 'lodash';
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
import { useStore, useStoreApi } from './hooks/useStore';
import { useFlow } from './hooks/useFlow';

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
  const { settingMap, globalConfig, readOnly } = useContext(ConfigContext);
  const [openPanel, setOpenPanel] = useState<boolean>(true);
  const [openLogPanel, setOpenLogPanel] = useState<boolean>(true);
  const { onNodeClick, onEdgeClick, zoomOnScroll = true, panOnScroll = false, preventScrolling = true, connectionLineComponent } = props;
  const nodeEditorRef = useRef(null);
  const { copyNode, pasteNodeSimple } = useFlow();
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

  useEventListener('keydown', e => {
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
      if(openPanel){
      }else{
        const selectedNode = nodes?.find(node => node.selected);
        if (selectedNode) {
          const nodeType:string = get(selectedNode,'data._nodeType','') as any
          const disabledCopy = get(settingMap,[nodeType,'disabledCopy'],false)
          if(!disabledCopy){
            copyNode(selectedNode.id);
            e.preventDefault();
          }else{
            message.warning('该节点在配置中已禁止被复制！')
          }
        }
      }

    }
    else if ((e.key === 'v' || e.key === 'V') && (e.ctrlKey || e.metaKey)) {
      if(openPanel){
      }else{
        pasteNodeSimple();
        e.preventDefault();
      }
    }
    else if (copyNodes.length > 0) {
      // 只在有复制节点时才检查其他操作
      const { copyTimeoutId } = storeApi.getState();
      if (copyTimeoutId) {
        clearTimeout(copyTimeoutId);
        storeApi.setState({
          copyTimeoutId: null,
          isAddingNode: false,
        });
      }
    }
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

  // 监听点击事件，当用户点击其他地方时清除复制状态
  useEventListener(
    'click',
    e => {
      // 如果点击的不是节点或候选节点，清除复制状态
      const target = e.target as HTMLElement;
      const isClickingNode = target.closest('.xflow-node-container') || target.closest('.candidate-node');

      if (!isClickingNode) {
        const { copyTimeoutId, copyNodes } = storeApi.getState();
        if (copyTimeoutId && copyNodes?.length > 0) {
          clearTimeout(copyTimeoutId);
          storeApi.setState({
            copyTimeoutId: null,
            isAddingNode: false,
          });
        }
      }
    },
    {
      target: workflowContainerRef.current,
      enable: copyNodes?.length > 0,
    }
  );

  const { eventEmitter } = useEventEmitterContextContext();
  eventEmitter?.useSubscription((v: any) => {
    // 整理画布
    if (v.type === 'auto-layout-nodes') {
      const newNodes: any = autoLayoutNodes(
        storeApi.getState().nodes,
        edges,
        layout
      );
      setNodes(newNodes, false);
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

  // 插入节点
  // const handleInsertNode = () => {
  //   const newNode = {
  //     id: uuid(),
  //     data: { label: 'new node' },
  //     position: {
  //       x: 0,
  //       y: 0,
  //     },
  //   };
  //   addNodes(newNode);
  //   addEdges({
  //     id: uuid(),
  //     source: '2',
  //     target: newNode.id,
  //   });
  //   const targetEdge = edges.find(edge => edge.source === '2');
  //   updateEdge(targetEdge?.id as string, {
  //     source: newNode.id,
  //   });
  // };

  // edge 移入/移出效果
  const getUpdateEdgeConfig = useMemoizedFn((edge: any, color: string) => {
    const newEdges = produce(edges, draft => {
      const currEdge: any = draft.find(e => e.id === edge.id);
      currEdge.style = {
        ...edge.style,
        stroke: color,
      };
      currEdge.markerEnd = {
        ...edge?.markerEnd,
        color,
      };
    });
    setEdges(newEdges);
  });

  const handleNodeValueChange = debounce((data: any) => {
    for (let node of nodes) {
      if (node.id === data.id) {
        node.data = {
          ...node?.data,
          ...data?.values,
        };
        break;
      }
    }
    setNodes([...nodes], false);
  }, 200);

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
            onDelete={(delId)=>{
              setActiveNode(null);// 删除节点并关闭弹窗
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
        activeNode={activeNode}
        onChange={setActiveNode}
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
  const panelonClose = globalConfig?.nodePanel?.onClose;

  return (
    <div id="xflow-container" ref={workflowContainerRef}>
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
        defaultEdgeOptions={{
          type: 'buttonedge',
          style: {
            strokeWidth: 1.5, // 线粗细
          },
          markerEnd: {
            type: MarkerType.ArrowClosed, // 箭头
            width: 18,
            height: 18,
          },
          deletable: deletable, //默认连线属性受此项控制
        }}
        onBeforeDelete={async (elements) => {
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
            message.warning(`${blockedNodes.map(n => n.data?.title || n.id).join(', ')}节点不允许删除！`);
            return false;
          }
          return true
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
          if(!edge.style.stroke || edge.style.stroke === '#c9c9c9'){
            getUpdateEdgeConfig(edge, '#2970ff');
          }
        }}
        onEdgeMouseLeave={(_, edge) => {
          if(['#2970ff',"#c9c9c9"].includes(edge.style.stroke)){
            getUpdateEdgeConfig(edge, '#c9c9c9');
          }
        }}
        onNodesDelete={() => {
           setActiveNode(null);
        }}
        onNodeClick={(event, node) => {
          onNodeClick && onNodeClick(event, node);
        }}
        deleteKeyCode={globalConfig?.deleteKeyCode}
        onEdgeClick={(event,edge)=>{
          onEdgeClick && onEdgeClick(event,edge)
        }}
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
            onClose={async () => {
              // 面板关闭校验表单
              const result = await nodeEditorRef?.current?.validateForm();
              if (!result) {
                return;
              }
              setOpenPanel(false);

              // 如果日志面板关闭
              if (!isTruthy(activeNode?._status) || !openLogPanel) {
                setActiveNode(null);
              }
              if (isFunction(panelonClose)) {
                panelonClose(activeNode?.id);
              }
            }}
            node={activeNode}
            data={activeNode?.values}
            openLogPanel={openLogPanel}
          >
            {NodeEditorWrap}
          </PanelContainer>
        )}
        {isTruthy(activeNode?._status) && openLogPanel && (
          <PanelStatusLogContainer
            id={activeNode?.id}
            nodeType={activeNode?._nodeType}
            onClose={() => {
              setOpenLogPanel(false);
              !openPanel && setActiveNode(null);
            }}
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
