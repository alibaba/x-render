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
  panOnDrag?: boolean;
  candidateNode: any;
  mousePosition: any;
  onNodesChange: OnNodesChange<FlowNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: FlowNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNodes: (nodes: FlowNode[]) => void;
  addEdges: (edges: Edge[]) => void;
  setLayout: (layout: 'LR' | 'TB') => void;
  setCandidateNode: (candidateNode: any) => void;
  setMousePosition: (mousePosition: any) => void;
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
        candidateNode: null,
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
        getNodes: () => {
          return get().nodes;
        },
        setNodes: nodes => {
          set({ nodes });
        },
        setEdges: edges => {
          set({ edges });
        },
        getEdges: () => {
          return get().nodes;
        },
        addNodes: payload => {
          const newNodes = get().nodes.concat(payload);
          set({ nodes: newNodes });
        },
        addEdges: payload => {
          set({ edges: get().edges.concat(payload) });
        },
        // setNodeMenus: (nodeMenus: any) => {
        //   set({ nodeMenus });
        // },
        setCandidateNode: candidateNode => {
          set({ candidateNode });
        },
        setMousePosition: (mousePosition: any) => {
          set({ mousePosition });
        },
        setLayout: (layout: 'LR' | 'TB') => {
          if (!layout) {
            return;
          }
          set({ layout });
        },
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
          console.log('onSave', pastState, currentState);
        },
      }
    ),
    Object.is
  );
};

export { createStore };
