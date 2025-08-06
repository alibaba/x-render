import { generateCopyNodes, transformNodes, uuid } from '../utils';
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Edge,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
} from '@xyflow/react';
import isDeepEqual from 'fast-deep-equal';
import { temporal } from 'zundo';
import { createWithEqualityFn } from 'zustand/traditional';

export type FlowProps = {
  nodes?: Node[];
  edges?: Edge[];
  panOnDrag?: boolean;
  layout?: 'LR' | 'TB';
};

export type FlowStore = ReturnType<typeof createStore>;

export type FlowNode = Node;

export type FlowState = {
  layout?: 'LR' | 'TB';
  nodes?: FlowNode[];
  edges?: Edge[];
  copyNodes: FlowNode[];
  copyEdges: Edge[];
  panOnDrag?: boolean;
  isAddingNode?: boolean;
  candidateNode: any;
  mousePosition: any;
  copyTimeoutId: NodeJS.Timeout | null; // 添加超时定时器ID
  onNodesChange: OnNodesChange<FlowNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: FlowNode[], isTransform?: boolean) => void;
  setEdges: (edges: Edge[]) => void;
  addNodes: (nodes: FlowNode[]| FlowNode, isTransform?: boolean) => void;
  addEdges: (edges: Edge[] | Edge) => void;
  setLayout: (layout: 'LR' | 'TB') => void;
  setIsAddingNode: (payload: boolean) => void;
  setCandidateNode: (candidateNode: any) => void;
  setMousePosition: (mousePosition: any) => void;
  setCopyTimeoutId: (timeoutId: NodeJS.Timeout | null) => void; // 添加设置超时定时器的方法
};

const createStore = (initProps?: Partial<FlowProps>) => {
  const DEFAULT_PROPS: FlowProps = {
    layout: 'LR',
    panOnDrag: true,
    nodes: [],
    edges: []
  };

  return createWithEqualityFn<FlowState>()(
    temporal(
      (set, get) => ({
        ...DEFAULT_PROPS,
        ...initProps,
        copyNodes: [],
        copyEdges: [],
        isAddingNode: false,
        candidateNode: null,
        copyTimeoutId: null, // 添加超时定时器ID初始值
        // nodeMenus: [],
        mousePosition: { pageX: 0, pageY: 0, elementX: 0, elementY: 0 },
        onNodesChange: changes => {
          set({
            nodes: applyNodeChanges(changes, get().nodes),
          });
        },
        onEdgesChange: changes => {
          set({
            edges: applyEdgeChanges(changes, get().edges),
          });
        },
        onConnect: connection => {
          set({
            edges: addEdge(connection, get().edges),
          });
        },
        setNodes: (nodes) => {
          set({ nodes: transformNodes(nodes) });
        },
        setEdges: edges => {
          set({ edges });
        },
        addNodes: (payload, isTransform = true) => {
          const newNodes = get().nodes.concat(transformNodes(Array.isArray(payload) ? payload : [payload]));
          set({ nodes: newNodes });
        },
        addEdges: payload => {
          set({ edges: get().edges.concat(payload) });
        },
        // setNodeMenus: (nodeMenus: any) => {
        //   set({ nodeMenus });
        // },
        setIsAddingNode: payload => {
          set({ isAddingNode: payload });
        },
        setCandidateNode: candidateNode => {
          set({ candidateNode });
        },
        setMousePosition: (mousePosition: any) => {
          set({ mousePosition });
        },
        setCopyTimeoutId: (timeoutId: NodeJS.Timeout | null) => {
          set({ copyTimeoutId: timeoutId });
        },
        setLayout: (layout: 'LR' | 'TB') => {
          if (!layout) {
            return;
          }
          set({ layout });
        }
      }),
      {
        // nodes 和 edges 是引用类型，所以使用深比较
        equality: isDeepEqual,
        // 偏函数
        partialize: state => {
          const { nodes, edges } = state;
          return {
            edges,
            nodes,
          };
        },
        onSave(pastState, currentState) {
          // console.log('onSave', pastState, currentState);
        },
      }
    ),
    Object.is
  );
};

export { createStore };
