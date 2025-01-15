import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import {
  BezierEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
} from '@xyflow/react';
import React, { memo, useContext, useState } from 'react';
import { shallow } from 'zustand/shallow';
import { useFlow } from '../../hooks/useFlow';
import { useStore } from '../../hooks/useStore';
import { ConfigContext } from '../../models/context';
import { uuid, uuid4 } from '../../utils';
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
    sourceHandleId,
  } = edge;

  const reactflow = useReactFlow();
  const [isHovered, setIsHovered] = useState(false);
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const { globalConfig, settingMap, readOnly } = useContext(ConfigContext);
  const hideEdgeAddBtn = globalConfig?.edge?.hideEdgeAddBtn ?? false;
  const hideEdgeDelBtn = globalConfig?.edge?.hideEdgeDelBtn ?? false;
  const deletable = globalConfig?.edge?.deletable ?? true;

  const { nodes, edges, addEdges, mousePosition, onEdgesChange, layout } =
    useStore(
      (state: any) => ({
        layout: state.layout,
        nodes: state.nodes,
        edges: state.edges,
        mousePosition: state.mousePosition,
        addEdges: state.addEdges,
        onEdgesChange: state.onEdgesChange,
      }),
      shallow
    );
  const { addNodes } = useFlow();

  const handleAddNode = (data: any) => {
    const { screenToFlowPosition } = reactflow;
    const { x, y } = screenToFlowPosition({
      x: mousePosition.pageX,
      y: mousePosition.pageY,
    });

    const targetId = uuid();
    const title = settingMap[data?._nodeType]?.title || data?._nodeType;

    const newNodes = {
      id: targetId,
      type: 'custom',
      data: {
        title: `${title}_${uuid4()}`,
        ...data,
      },
      position: { x, y },
    };

    const newEdges = [
      {
        id: uuid(),
        source,
        target: targetId,
        deletable: deletable,
        ...(sourceHandleId && { sourceHandle: sourceHandleId }),
      },
      {
        id: uuid(),
        source: targetId,
        deletable: deletable,
        target,
      },
    ];

    addNodes(newNodes as any);
    addEdges(newEdges);
    onEdgesChange([{ id, type: 'remove' }]);
  };

  let edgeExtra: any = {
    sourceX: edge.sourceX - 15,
    targetX: edge.targetX + 15,
  };
  if (layout === 'TB') {
    edgeExtra = {
      sourceY: edge.sourceY - 15,
      targetY: edge.targetY + 13,
    };
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
          isHovered && (
            <EdgeLabelRenderer>
              <div
                className="custom-edge-line"
                style={{
                  transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                }}
              >
                <div className="line-content">
                  {!hideEdgeDelBtn && !readOnly && (
                    <div
                      className="line-icon-box"
                      onClick={() => {
                        if (readOnly) {
                          return;
                        }
                        onEdgesChange([{ id, type: 'remove' }]);
                      }}
                    >
                      <CloseOutlined style={{ color: '#fff', fontSize: 10 }} />
                    </div>
                  )}
                  {!hideEdgeAddBtn && !readOnly && (
                    <NodeSelectPopover
                      placement="right"
                      addNode={handleAddNode}
                    >
                      <div className="line-icon-box">
                        <PlusOutlined style={{ color: '#fff', fontSize: 10 }} />
                      </div>
                    </NodeSelectPopover>
                  )}
                </div>
              </div>
            </EdgeLabelRenderer>
          )
        }
      />
    </g>
  );
});
