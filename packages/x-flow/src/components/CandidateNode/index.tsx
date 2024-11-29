import React from 'react';
import { memo } from 'react';
import produce from 'immer';
import { useShallow } from 'zustand/react/shallow';
import { useReactFlow, useViewport } from '@xyflow/react';
import { useEventListener } from 'ahooks';
import CustomNode from '../CustomNode';
import { useStore } from '../../hooks/useStore';

const CandidateNode = () => {
  const { zoom } = useViewport();
  const reactflow = useReactFlow();

  const {
    nodes,
    candidateNode,
    mousePosition,
    addNodes,
    setCandidateNode
  } = useStore(
    useShallow((state: any) => ({
      nodes: state.nodes,
      edges: state.edges,
      candidateNode: state.candidateNode,
      mousePosition: state.mousePosition,
      addNodes: state.addNodes,
      setCandidateNode: state.setCandidateNode,
      onNodesChange: state.onNodesChange,
      onEdgesChange: state.onEdgesChange,
    }))
  );

  useEventListener('click', (ev) => {
    if (!candidateNode) {
      return;
    }
    ev.preventDefault();
    const { screenToFlowPosition } = reactflow;
    const { x, y } = screenToFlowPosition({ x: mousePosition.pageX, y: mousePosition.pageY });

    const newNodes = produce(nodes, (draft: any) => {
      draft.push({
        ...candidateNode,
        data: {
          ...candidateNode.data,
          _isCandidate: false,
        },
        position: { x, y }
      });
    });
    addNodes(newNodes);
    setCandidateNode(null);
  });

  if (!candidateNode) {
    return null
  }

  console.log(mousePosition, '=======000000')

  return (
    <div
      style={{
        left: mousePosition?.elementX,
        top: mousePosition?.elementY,
        transform: `scale(${zoom})`,
        transformOrigin: '0 0',
        position: 'absolute',
        zIndex: 10000
      }}
    >
      <CustomNode {...candidateNode as any} type={candidateNode?.data?._nodeType } />
    </div>
  );
}

export default memo(CandidateNode);
