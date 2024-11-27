import React, { memo, useState } from 'react';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { BezierEdge, EdgeLabelRenderer, getBezierPath, useReactFlow } from '@xyflow/react';
import { useShallow } from 'zustand/react/shallow';
import produce from 'immer';
import { uuid } from '../../utils';
import useStore from '../../models/store';
import NodeSelectPopover from '../NodesPopover';
import './index.less';

export default memo((edge: any) => {
  const {
    id,
    selected,
    sourceX,
    sourceY,
    targetX,
    targetY,
    source,
    target,
  } = edge;

  const reactflow = useReactFlow();
  const [isHovered, setIsHovered] = useState(false);
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    mousePosition,
    onEdgesChange,
    layout,
  } = useStore(
    useShallow((state: any) => ({
      layout: state.layout,
      nodes: state.nodes,
      edges: state.edges,
      mousePosition: state.mousePosition,
      setNodes: state.setNodes,
      setEdges: state.setEdges,
      onEdgesChange: state.onEdgesChange
    }))
  );

  const handleAddNode = (data: any) => {
    const { screenToFlowPosition } = reactflow;
    const { x, y } = screenToFlowPosition({ x: mousePosition.pageX, y: mousePosition.pageY });


    const targetId = uuid();
    const newNodes = produce(nodes, (draft: any) => {
      draft.push({
        id: targetId,
        type: 'custom',
        data,
        position: { x, y }
      });
    });

    const newEdges = produce(edges, (draft: any) => {
      draft.push(...[
        {
          id: uuid(),
          source,
          target: targetId,
        },
        {
          id: uuid(),
          source: targetId,
          target,
        }
    ])

    });
   
    setNodes(newNodes);
    setEdges(newEdges);
    onEdgesChange([{ id, type: 'remove' }]);
  };

  let edgeExtra: any = {
    sourceX: edge.sourceX - 15,
    targetX: edge.targetX + 15
  }
  if (layout === 'TB') {
    edgeExtra = {
      sourceY: edge.sourceY - 15,
      targetY: edge.targetY + 13
    }
  }
  
  return (
    <g
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <BezierEdge
        {...edge}
        {...edgeExtra}
        edgePath={edgePath}
        label={
          isHovered && <EdgeLabelRenderer>
            <div
              className='custom-edge-line'
              style={{
                transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              }}
            >
              <div className='line-content'>
                <div className='line-icon-box' onClick={() => onEdgesChange([{ id, type: 'remove' }])}>
                    <CloseOutlined style={{ color: '#fff', fontSize: 10 }} />
                  </div>
                <NodeSelectPopover placement='right' addNode={handleAddNode}>
                  <div className='line-icon-box'>
                    <PlusOutlined style={{ color: '#fff', fontSize: 10 }} />
                  </div>
                </NodeSelectPopover>
              </div>
            </div>
          </EdgeLabelRenderer>
        }
      />
    </g>
  );
})