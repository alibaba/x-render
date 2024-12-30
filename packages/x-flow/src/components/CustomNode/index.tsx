import { Handle, Position, useReactFlow } from '@xyflow/react';
import classNames from 'classnames';
import React, { memo, useContext, useState } from 'react';
import { shallow } from 'zustand/shallow';
import { useStore } from '../../hooks/useStore';
import { ConfigContext } from '../../models/context';
import { capitalize, transformNodeStatus, uuid, uuid4 } from '../../utils';
import './index.less';
import SourceHandle from './sourceHandle';

export default memo((props: any) => {
  const { id, type, data, layout, isConnectable, selected, onClick, status } =
    props;
  const { widgets, settingMap, globalConfig } = useContext(ConfigContext);
  const NodeWidget =
    widgets[`${capitalize(type)}Node`] || widgets['CommonNode'];
  const [isHovered, setIsHovered] = useState(false);
  const reactflow = useReactFlow();
  const { addNodes, addEdges, mousePosition } = useStore(
    (state: any) => ({
      nodes: state.nodes,
      edges: state.edges,
      mousePosition: state.mousePosition,
      addNodes: state.addNodes,
      addEdges: state.addEdges,
      onEdgesChange: state.onEdgesChange,
    }),
    shallow
  );
  const isSwitchNode = type === 'Switch' || type === 'Parallel'; // 判断是否为条件节点/并行节点
  // 增加节点并进行联系
  const handleAddNode = (data: any, sourceHandle?: string) => {
    const { screenToFlowPosition } = reactflow;
    const { x, y } = screenToFlowPosition({
      x: mousePosition.pageX + 100,
      y: mousePosition.pageY + 100,
    });
    const targetId = uuid();
    const title = settingMap[data?._nodeType]?.title || data?._nodeType;

    const newNodes = {
      id: targetId,
      type: 'custom',
      data: {
        ...data,
        title: `${title}_${uuid4()}`,
      },
      position: { x, y },
    };
    const newEdges = {
      id: uuid(),
      source: id,
      target: targetId,
      ...(sourceHandle && { sourceHandle }),
    };
    addNodes(newNodes);
    addEdges(newEdges);
  };

  let targetPosition = Position.Left;
  let sourcePosition = Position.Right;
  if (layout === 'TB') {
    targetPosition = Position.Top;
    sourcePosition = Position.Bottom;
  }

  // 节点状态处理
  const statusObj = transformNodeStatus(globalConfig?.nodeView?.status || []);
  const nodeBorderColor = statusObj[status]?.color;

  return (
    <div
      className={classNames('xflow-node-container', {
        ['xflow-node-container-selected']: !!selected,
        ['xflow-node-container-tb']: layout === 'TB',
      })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ '--nodeBorderColor': nodeBorderColor }}
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
        position={sourcePosition}
        isConnectable={isConnectable}
        selected={selected}
        isHovered={isHovered}
        handleAddNode={handleAddNode}
      />
      {!settingMap?.[type]?.sourceHandleHidden && !isSwitchNode && (
        <>
          <SourceHandle
            position={sourcePosition}
            isConnectable={isConnectable}
            selected={selected}
            isHovered={isHovered}
            handleAddNode={handleAddNode}
          />
        </>
      )}
    </div>
  );
});
