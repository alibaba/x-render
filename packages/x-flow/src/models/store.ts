import { useTemporalStore } from '../hooks/useStore';
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
import { createStore as createZustandStore } from 'zustand';

export type XFlowProps = {
  nodes?: Node[];
  edges?: Edge[];
  layout?: 'LR' | 'TB';
};

export type XFlowStore = ReturnType<typeof createStore>;

export type XFlowNode = Node;

export type XFlowState = {
  layout?: 'LR' | 'TB';
  nodes?: XFlowNode[];
  edges?: Edge[];
  candidateNode: any;
  mousePosition: any;
  onNodesChange: OnNodesChange<XFlowNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: XFlowNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNodes: (nodes: XFlowNode[]) => void;
  addEdges: (edges: Edge[]) => void;
  setLayout: (layout: 'LR' | 'TB') => void;
  setCandidateNode: (candidateNode: any) => void;
  setMousePosition: (mousePosition: any) => void;
};

const createStore = (initProps?: Partial<XFlowProps>) => {
  const DEFAULT_PROPS: XFlowProps = {
    layout: 'LR',
    nodes: [],
    edges: []
  };

  return createZustandStore<XFlowState>()(
    temporal(
      (set, get) => ({
        ...DEFAULT_PROPS,
        initProps,
        nodes: [],
        edges: [],
        candidateNode: null,
        nodeMenus: [],
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
        setNodes: nodes => {
          // 只记录节点变化
          // useTemporalStore().record(() => {
            set({ nodes });
          // });
        },
        setEdges: edges => {
          set({ edges });
        },
        addNodes: payload => {
          const newNodes = get().nodes.concat(payload);
          // useTemporalStore().record(() => {
            set({ nodes: newNodes });
          // });
        },
        addEdges: payload => {
          set({ edges: get().edges.concat(payload) });
        },
        setNodeMenus: (nodeMenus: any) => {
          set({ nodeMenus });
        },
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
    )
  );
};

export { createStore };
