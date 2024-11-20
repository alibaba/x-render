import type { FC } from 'react';
import React, { memo, useEffect, useMemo, useRef, useState, useContext } from 'react';
import { useEventListener, useMemoizedFn } from 'ahooks';
import produce, { setAutoFreeze } from 'immer';
import { debounce } from 'lodash';
import { useShallow } from 'zustand/react/shallow';
import {
  Background,
  BackgroundVariant,
  MarkerType,
  ReactFlow,
  useReactFlow,
  useStoreApi,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useEventEmitterContextContext } from './models/event-emitter';
import CandidateNode from './components/CandidateNode';
import CustomEdge from './components/CustomEdge';
import PanelContainer from './components/PanelContainer';

import CustomNodeComponent from './components/CustomNode';
import Operator from './operator';
import useStore, { useUndoRedo } from './models/store';
import XFlowProps from './types';
import { capitalize, uuid, transformNodes } from './utils';
import autoLayoutNodes from './utils/autoLayoutNodes';

import './index.less';

const CustomNode = memo(CustomNodeComponent);
const edgeTypes = { buttonedge: memo(CustomEdge) };

/***
 *
 * XFlow 入口
 *
 */
const FlowEditor: FC<XFlowProps> = memo((props) => {
  const { initialValues, settings } = props;
  const workflowContainerRef = useRef<HTMLDivElement>(null);
  const store = useStoreApi();
  const { updateEdge, addNodes, addEdges, zoomTo } = useReactFlow();
  const { undo, redo, record } = useUndoRedo(false);
  const {
    layout,
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setNodes,
    setEdges,
    setLayout,
    setCandidateNode,
    setMousePosition,
  } = useStore(
    useShallow((state) => ({
      nodes: state.nodes,
      edges: state.edges,
      layout: state.layout,
      setLayout: state.setLayout,
      setNodes: state.setNodes,
      setEdges: state.setEdges,
      setMousePosition: state.setMousePosition,
      setCandidateNode: state.setCandidateNode,
      onNodesChange: state.onNodesChange,
      onEdgesChange: state.onEdgesChange,
      onConnect: state.onConnect,
    })),
  );

  const [activeNode, setActiveNode] = useState<any>(null);

  useEffect(() => {
    zoomTo(0.8);
    setAutoFreeze(false);
    return () => {
      setAutoFreeze(true);
    };
  }, []);

  useEffect(() => {
    setLayout(props.layout);
    setNodes(transformNodes(initialValues?.nodes));
    setEdges(initialValues?.edges);
  }, []);

  useEventListener('keydown', (e) => {
    if ((e.key === 'd' || e.key === 'D') && (e.ctrlKey || e.metaKey))
      e.preventDefault();
    if ((e.key === 'z' || e.key === 'Z') && (e.ctrlKey || e.metaKey))
      e.preventDefault();
    if ((e.key === 'y' || e.key === 'Y') && (e.ctrlKey || e.metaKey))
      e.preventDefault();
    if ((e.key === 's' || e.key === 'S') && (e.ctrlKey || e.metaKey))
      e.preventDefault();
  });

  useEventListener('mousemove', (e) => {
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
  });

  const { eventEmitter } = useEventEmitterContextContext();
  eventEmitter?.useSubscription((v: any) => {
    // 整理节点
    if (v.type === 'auto-layout-nodes') {
      const newNodes: any = autoLayoutNodes(store.getState().nodes, edges);
      setNodes(newNodes);
    }

    if (v.type === 'deleteNode') {
      setActiveNode(null);
    }
  });


  // 新增节点
  const handleAddNode = (data: any) => {
    const newNode = {
      id: uuid(),
      type: 'custom',
      data,
      position: {
        x: 0,
        y: 0,
      },
    };
    setCandidateNode(newNode);
    // record(() => {
    //   addNodes(newNode);
    //   addEdges({
    //     id: uuid(),
    //     source: '1',
    //     target: newNode.id,
    //   });
    // });
  };

  // 插入节点
  const handleInsertNode = () => {
    const newNode = {
      id: uuid(),
      data: { label: 'new node' },
      position: {
        x: 0,
        y: 0,
      },
    };
    record(() => {
      addNodes(newNode);
      addEdges({
        id: uuid(),
        source: '2',
        target: newNode.id,
      });
      const targetEdge = edges.find((edge) => edge.source === '2');
      updateEdge(targetEdge?.id as string, {
        source: newNode.id,
      });
    });
  };

  // edge 移入/移出效果
  const getUpdateEdgeConfig = useMemoizedFn((edge: any, color: string) => {
    const newEdges = produce(edges, (draft) => {
      const currEdge: any = draft.find((e) => e.id === edge.id);
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
      if (node.id === activeNode.name) {
        node.data = {
          ...node?.data,
          ...data,
        };
        break;
      }
    }
    setNodes([...nodes]);
  }, 200);

    
  const nodeTypes = useMemo(() => {
    return {
      custom: (props: any) => {
        const { data, ...rest } = props;
        const { _nodeType, ...restData } = data || {};
        return (
          <CustomNode 
            {...rest} 
            data={{...restData}} 
            type={_nodeType}
            layout={layout}
            onClick={setActiveNode}
          />
        );
      }
    };
  }, [layout]);

    // const edgeTypes = { buttonedge: (edgeProps: any) => <CustomEdge layout={layout} {...edgeProps} /> };
    const { icon, description } = settings.find(
        (item) => item.type?.toLowerCase() === activeNode?.node?.toLowerCase(),
      ) || {};

    // const NodeEditor = useMemo(() => {
    //   return configCtx.widgets[capitalize(`${activeNode?.type}Panel`)] || <div>1</div>;
    // }, [activeNode?.id]);

    console.log(nodes, '23123123nodes', edges)

    return (
      <div id='xflow-container' ref={workflowContainerRef}>
        <Operator handleRedo={undo} handleUndo={redo} addNode={handleAddNode} />
        <CandidateNode />
        <ReactFlow
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          nodes={nodes}
          edges={edges}
          minZoom={0.3}
          defaultEdgeOptions={{
            type: 'buttonedge',
            style: {
              strokeWidth: 1.5, // 线粗细
            },
            markerEnd: {
              type: MarkerType.ArrowClosed, // 箭头
            },
          }}
          onConnect={onConnect}
          // onNodesChange={(changes) => {
          //   const recordTypes = new Set(['add', 'remove']);
          //   changes.forEach((change) => {
          //     if (recordTypes.has(change.type)) {
          //       record(() => {
          //         onNodesChange([change]);
          //       });
          //     } else {
          //       onNodesChange([change]);
          //     }
          //   });
          // }}
          onNodesChange={(changes) => {
            const recordTypes = new Set(['add', 'remove']);
            changes.forEach((change) => {
              console.log(
                '🚀 ~ file: main.tsx:226 ~ changes.forEach ~ change:',
                change,
              );

              const removeChanges = changes.filter(
                (change) => change.type === 'remove',
              );

              if (removeChanges.length > 0) {
                removeChanges.forEach((change) => {
                  eventEmitter?.emit({ type: 'deleteNode', payload: change });
                });
              }
              if (recordTypes.has(change.type)) {
                record(() => {
                  onNodesChange([change]);
                });
              } else {
                onNodesChange([change]);
              }
            });
          }}
          onEdgesChange={(changes) => {
            const recordTypes = new Set(['add', 'remove']);
            changes.forEach((change) => {
              if (recordTypes.has(change.type)) {
                record(() => {
                  onEdgesChange([change]);
                });
              } else {
                onEdgesChange([change]);
              }
            });
          }}
          onEdgeMouseEnter={(_, edge: any) => {
            getUpdateEdgeConfig(edge, '#2970ff');
          }}
          onEdgeMouseLeave={(_, edge) => {
            getUpdateEdgeConfig(edge, '#c9c9c9');
          }}
        >
          <Background
            gap={[16, 16]}
            size={0.6}
            color='black'
            variant={BackgroundVariant.Dots}
          />
        </ReactFlow>

        {activeNode && (
          <PanelContainer
            icon={icon}
            title={activeNode?.name}
            nodeType={activeNode?.node}
            description={description}
            onClose={() => setActiveNode(null)}
            node={activeNode}
          >
            {/* <NodeEditor 
              data={activeNode}
              onChange={handleNodeValueChange}
            /> */}
          </PanelContainer>
        )}
      </div>
    );
  },
);

export default FlowEditor;
