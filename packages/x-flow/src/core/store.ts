import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { temporal } from 'zundo';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Edge,
  Node,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
} from '@xyflow/react';
import _ from "lodash";

export type AppNode = Node;

export type AppState = {
  layout: 'LR' | 'TB',
  nodes: AppNode[];
  edges: Edge[];
  nodeMenus: any[];
  candidateNode: any;
  mousePosition: any;
  onNodesChange: OnNodesChange<AppNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: AppNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  setLayout: (layout: 'LR' | 'TB') => void;
  setNodeMenus: (nodeMenus: any[]) => void;
  setCandidateNode: (candidateNode: any) => void;
  setMousePosition: (mousePosition: any) => void;
};

// 这是我们的 useStore hook，我们可以在我们的组件中使用它来获取 store 并调用动作
// 注意：immer 使用方式是 create()(immer(() => ({})))
const useStore = create<AppState>()(
  immer(
    temporal(
      (set, get) => ({
        layout: 'LR',
        nodes: [],
        edges: [],
        candidateNode: null,
        nodeMenus: [],
        mousePosition: { pageX: 0, pageY: 0, elementX: 0, elementY: 0 },
        onNodesChange: (changes) => {
          set({
            nodes: applyNodeChanges(changes, get().nodes),
          });
        },
        onEdgesChange: (changes) => {
          set({
            edges: applyEdgeChanges(changes, get().edges),
          });
        },
        onConnect: (connection) => {
          set({
            edges: addEdge(connection, get().edges),
          });
        },
        setNodes: (nodes) => {
          set({ nodes });
        },
        setEdges: (edges) => {
          set({ edges });
        },
        setNodeMenus: (nodeMenus: any) => {
          set({ nodeMenus });
        },
        setCandidateNode: (candidateNode) => {
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
        }
      }),
      {
        // 偏函数
        partialize: (state) => {
          const { nodes, edges } = state;
          return {
            edges,
            nodes,
          };
        },
      },
    ),
  ),
);


export const useUndoRedo = (isTracking = true) => {
  const temporalStore = useStore.temporal.getState();
  if (temporalStore.isTracking) {
    // 暂停时间旅行机器，
    temporalStore.pause();
  }

  return {
    ...temporalStore,
    record: (callback: () => void) => {
      temporalStore.resume();
      callback();
      temporalStore.pause();
    }
  }
};

export default useStore;