import { shallow } from 'zustand/shallow';

import { useStore } from '../hooks/useStore';
import type { FlowNode, FlowState } from '../models/store';

const nodesSelector = (state: FlowState) => state.nodes;

/**
 * Hook for getting the current nodes from the store.
 *
 * @public
 * @returns An array of nodes
 */
export function useNodes<NodeType extends FlowNode = FlowNode>(): NodeType[] {
  const nodes = useStore(nodesSelector, shallow) as NodeType[];

  return nodes;
}
