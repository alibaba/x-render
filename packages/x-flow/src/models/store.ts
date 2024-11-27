import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { temporal } from 'zundo';
import isDeepEqual from 'fast-deep-equal';
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
  candidateNode: any;
  mousePosition: any;
  onNodesChange: OnNodesChange<AppNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: AppNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNodes: (nodes: AppNode[]) => void;
  addEdges: (edges: Edge[]) => void;
  setLayout: (layout: 'LR' | 'TB') => void;
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
          // 只记录节点变化
          useTemporalStore().record(() => {
            set({ nodes });
          });
        },
        setEdges: (edges) => {
          set({ edges });
        },
        addNodes: payload => {
          const newNodes = get().nodes.concat(payload);
          set({ nodes: newNodes });
        },
        addEdges: payload => {
          set({ edges: get().edges.concat(payload) });
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
        // nodes 和 edges 是引用类型，所以使用深比较
        equality: isDeepEqual,
        // 偏函数
        partialize: (state) => {
          const { nodes, edges } = state;
          return {
            edges,
            nodes,
          };
        },
        onSave(pastState, currentState) {
          console.log('onSave', pastState, currentState);
        },
      },
    ),
  ),
);


export const useTemporalStore = () => {
  return {
    ...useStore.temporal.getState(),
    record: (callback: () => void) => {
      const temporalStore = useStore.temporal.getState();
      temporalStore.resume();
      callback();
      temporalStore.pause();
    }
  }
};

// 默认关闭时间机器
useStore.temporal.getState().pause();

export default useStore;
