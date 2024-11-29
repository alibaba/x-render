import { PlusOutlined } from '@ant-design/icons';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import { Tooltip } from 'antd';
import classNames from 'classnames';
import produce from 'immer';
import React, { memo, useContext, useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ConfigContext } from '../../models/context';
import { useStore } from '../../hooks/useStore';
import { capitalize, uuid } from '../../utils';
import NodeSelectPopover from '../NodesPopover';
import './index.less';

export default memo((props: any) => {
  const { id, type, data, layout, isConnectable, selected, onClick } = props;
  const { widgets, settingMap } = useContext(ConfigContext);
  const NodeWidget =
    widgets[`${capitalize(type)}Node`] || widgets['CommonNode'];
  const [isHovered, setIsHovered] = useState(false);
  const [isShowTooltip, setIsShowTooltip] = useState(false);
  const popoverRef = useRef(null);
  const [openNodeSelectPopover, setOpenNodeSelectPopover] = useState(false);

  const reactflow = useReactFlow();
  const { edges, nodes, setNodes, setEdges, mousePosition } = useStore(
    useShallow((state: any) => ({
      nodes: state.nodes,
      edges: state.edges,
      mousePosition: state.mousePosition,
      setNodes: state.setNodes,
      setEdges: state.setEdges,
      onEdgesChange: state.onEdgesChange,
    }))
  );

  // 增加节点并进行联系
  const handleAddNode = (data: any) => {
    const { screenToFlowPosition } = reactflow;
    const { x, y } = screenToFlowPosition({
      x: mousePosition.pageX + 100,
      y: mousePosition.pageY + 100,
    });
    const targetId = uuid();

    const newNodes = produce(nodes, (draft: any) => {
      draft.push({
        id: targetId,
        type: 'custom',
        data,
        position: { x, y },
      });
    });
    const newEdges = produce(edges, (draft: any) => {
      draft.push({
        id: uuid(),
        source: id,
        target: targetId,
      });
    });
    setNodes(newNodes);
    setEdges(newEdges);
  };

  let targetPosition = Position.Left;
  let sourcePosition = Position.Right;
  if (layout === 'TB') {
    targetPosition = Position.Top;
    sourcePosition = Position.Bottom;
  }

  return (
    <div
      className={classNames('xflow-node-container', {
        ['xflow-node-container-selected']: !!selected,
        ['xflow-node-container-tb']: layout === 'TB',
      })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!settingMap?.[type]?.targetHandleHidden && (
        <Handle
          type="target"
          position={targetPosition}
          isConnectable={isConnectable}
        />
      )}
      <NodeWidget
        id={id}
        type={type}
        data={data}
        onClick={() => onClick(data)}
      />
      {!settingMap?.[type]?.sourceHandleHidden && (
        <Handle
          type="source"
          position={sourcePosition}
          isConnectable={isConnectable}
          onMouseEnter={() => setIsShowTooltip(true)}
          onMouseLeave={() => setIsShowTooltip(false)}
          onClick={e => {
            e.stopPropagation();
            popoverRef?.current?.changeOpen(true);
            setIsShowTooltip(false);
            setOpenNodeSelectPopover(true);
          }}
        >
          {(selected || isHovered || openNodeSelectPopover) && (
            <div className="xflow-node-add-box">
              <NodeSelectPopover
                placement="right"
                addNode={handleAddNode}
                ref={popoverRef}
                onNodeSelectPopoverChange={(val)=>setOpenNodeSelectPopover(val)}
              >
                <Tooltip
                  title="点击添加节点"
                  arrow={false}
                  overlayInnerStyle={{
                    background: '#fff',
                    color: '#354052',
                    fontSize: '12px',
                  }}
                  open={isShowTooltip}
                >
                  <PlusOutlined style={{ color: '#fff', fontSize: 10 }} />
                </Tooltip>
              </NodeSelectPopover>
            </div>
          )}
        </Handle>
      )}
    </div>
  );
});
