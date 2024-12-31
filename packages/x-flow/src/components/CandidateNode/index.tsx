import { useReactFlow, useViewport } from '@xyflow/react';
import { useEventListener } from 'ahooks';
import React, { memo } from 'react';
import { shallow } from 'zustand/shallow';
import { useStore } from '../../hooks/useStore';
import CustomNode from '../CustomNode';

const CandidateNode = () => {
  const { zoom } = useViewport();
  const reactflow = useReactFlow();
  const { candidateNode, mousePosition, setIsAddingNode, setCandidateNode, addNodes } = useStore(
    (s: any) => ({
      nodes: s.nodes,
      edges: s.edges,
      addNodes: s.addNodes,
      candidateNode: s.candidateNode,
      setIsAddingNode: s.setIsAddingNode,
      mousePosition: s.mousePosition,
      setCandidateNode: s.setCandidateNode,
      onNodesChange: s.onNodesChange,
      onEdgesChange: s.onEdgesChange,
    }),
    shallow
  );

  useEventListener('click', ev => {
    if (!candidateNode) {
      return;
    }
    ev.preventDefault();
    const { screenToFlowPosition } = reactflow;
    const { x, y } = screenToFlowPosition({
      x: mousePosition.pageX,
      y: mousePosition.pageY,
    });

    const newNodes = {
      ...candidateNode,
      data: {
        ...candidateNode.data,
        _isCandidate: false,
      },
      position: { x, y },
    };
    addNodes(newNodes, false);
    setIsAddingNode(false)
    setCandidateNode(null);
  });

  if (!candidateNode) {
    return null;
  }

  return (
    <div
      style={{
        left: mousePosition?.elementX,
        top: mousePosition?.elementY,
        transform: `scale(${zoom})`,
        transformOrigin: '0 0',
        position: 'absolute',
        zIndex: 10000,
      }}
    >
      <CustomNode
        {...(candidateNode as any)}
        type={candidateNode?.data?._nodeType}
      />
    </div>
  );
};

export default memo(CandidateNode);
