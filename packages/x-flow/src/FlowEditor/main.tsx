import type { FC } from 'react';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
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
import { useEventEmitterContextContext } from '../context/event-emitter';
import CandidateNode from './components/CandidateNode';
import CustomEdge from './components/CustomEdge';
import PanelContainer from './components/PanelContainer';
import './index.less';
import CustomNodeComponent from './components/CustomNode';
import Operator from './operator';
import useStore, { useUndoRedo } from './store';
import { FlowEditorProps } from './types';
import { capitalize, uuid } from './utils';
import autoLayoutNodes from './utils/autoLayoutNodes';

const edgeTypes = { buttonedge: memo(CustomEdge) };
const CustomNode = memo(CustomNodeComponent);



/***
 *
 * ReactFlow 入口
 *
 */
const FlowEditor: FC<FlowEditorProps> = memo((props) => {
  const { nodeMenus, nodes: originalNodes, edges: originalEdges } = props;




    const workflowContainerRef = useRef<HTMLDivElement>(null);
    const store = useStoreApi();
    const { updateEdge, addNodes, addEdges, zoomTo } = useReactFlow();
    const { undo, redo, record } = useUndoRedo(false);
    const {
      nodes,
      edges,
      onNodesChange,
      onEdgesChange,
      onConnect,
      setNodes,
      setEdges,
      setNodeMenus,
      setCandidateNode,
      setMousePosition,
    } = useStore(
      useShallow((state) => ({
        nodes: state.nodes,
        edges: state.edges,
        setNodes: state.setNodes,
        setEdges: state.setEdges,
        setNodeMenus: state.setNodeMenus,
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
      setNodeMenus(nodeMenus);
      setNodes(originalNodes);
      setEdges(originalEdges);
    }, [JSON.stringify(originalNodes)]);

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
        custom: (props: any) => (
          <CustomNode {...props} onClick={setActiveNode} />
        ),
      };
    }, []);
    const { icon, description } =
      nodeMenus.find(
        (item) => item.type?.toLowerCase() === activeNode?.node?.toLowerCase(),
      ) || {};

    // const NodeEditor = PanelComponentMap[capitalize(`${activeNode?.node}Setting`)];

    return (
      <div id="workflow-container" ref={workflowContainerRef}>
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
              strokeWidth: 1.2, // 线粗细
            },
            markerEnd: {
              type: MarkerType.ArrowClosed, // 箭头
            },
          }}
          onConnect={onConnect}
          onNodesChange={(changes) => {
            const recordTypes = new Set(['add', 'remove']);
            changes.forEach((change) => {
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
            color="black"
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
            {/* <NodeEditor data={activeNode} onChange={handleNodeValueChange} /> */}
          </PanelContainer>
        )}
      </div>
    );
  },
);

export default FlowEditor;
