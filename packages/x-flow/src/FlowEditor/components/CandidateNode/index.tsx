import { memo } from 'react';
import produce from 'immer';
import { useShallow } from 'zustand/react/shallow';
import { useReactFlow, useViewport } from '@xyflow/react';
import { useEventListener } from 'ahooks';
import CustomNode from '../../../nodes';
import useStore from '../../store';

const CandidateNode = () => {
  const reactflow = useReactFlow();
  const { zoom } = useViewport();

  const {
    nodes,
    setNodes,
    candidateNode,
    mousePosition,
    setCandidateNode
  } = useStore(
    useShallow((state: any) => ({
      nodes: state.nodes,
      edges: state.edges,
      candidateNode: state.candidateNode,
      mousePosition: state.mousePosition,
      setNodes: state.setNodes,
      setEdges: state.setEdges,
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
    setNodes(newNodes);
    setCandidateNode(null);
  });

  useEventListener('contextmenu', (e) => {
    // const { candidateNode } = workflowStore.getState()
    // if (candidateNode) {
    //   e.preventDefault()
    //   workflowStore.setState({ candidateNode: undefined })
    // }
  })

  if (!candidateNode) {
    return null
  }
  
  return (
    <div
      className='absolute z-10'
      style={{
        zIndex: 100,
        left: mousePosition?.elementX,
        top: mousePosition?.elementY,
        transform: `scale(${zoom})`,
        transformOrigin: '0 0',
      }}
    >
      <CustomNode {...candidateNode as any} />
    </div>
  );
}

export default memo(CandidateNode);
