import type { Edge } from "@xyflow/react";
import { shallow } from 'zustand/shallow';

import { useStore } from './useStore';
import type { FlowState } from '../models/store';

const nodesSelector = (state: FlowState) => state.edges;

/**
 * Hook for getting the current edges from the store.
 *
 * @public
 * @returns An array of edges
 */
export function useEdges<EdgeType extends Edge = Edge>(): Edge[] {
  const nodes = useStore(nodesSelector, shallow) as EdgeType[];

  return nodes;
}
