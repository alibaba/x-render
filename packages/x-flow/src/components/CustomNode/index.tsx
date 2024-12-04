import { Handle, Position, useReactFlow } from '@xyflow/react';
import classNames from 'classnames';
import produce from 'immer';
import React, { memo, useContext, useState } from 'react';
import { shallow } from 'zustand/shallow';
import { useStore } from '../../hooks/useStore';
import { ConfigContext } from '../../models/context';
import { capitalize, uuid } from '../../utils';
import './index.less';
import SourceHandle from './sourceHandle';

const generateRandomArray = (x: number, type?: string) => {
  const randomArray = [];
  for (let i = 0; i < x; i++) {
    const id = `id_${i}`;
    if (type === 'Switch') {
      if (i === 0) {
        randomArray.push({ id, switchTitle: 'IF' });
      } else if (i === x - 1) {
        randomArray.push({ id, switchTitle: 'ELSE' });
      } else {
        randomArray.push({ id, switchTitle: 'ELIF' });
      }
    } else {
      randomArray.push({ id });
    }
  }
  return randomArray;
};

export default memo((props: any) => {
  const { id, type, data, layout, isConnectable, selected, onClick } = props;
  const { widgets, settingMap } = useContext(ConfigContext);
  const NodeWidget =
    widgets[`${capitalize(type)}Node`] || widgets['CommonNode'];
  const [isHovered, setIsHovered] = useState(false);
  const reactflow = useReactFlow();
  const { edges, nodes, setNodes, setEdges, mousePosition } = useStore(
    (state: any) => ({
      nodes: state.nodes,
      edges: state.edges,
      mousePosition: state.mousePosition,
      setNodes: state.setNodes,
      setEdges: state.setEdges,
      onEdgesChange: state.onEdgesChange,
    }),
    shallow
  );
  // data中的switchData的长度，即：if和if else 的数量,条件数量
  const switchDataLength =
    data?.switchData?.length >= 1 ? Number(data?.switchData?.length + 1) : 2;
  const nodeHeight = 45; // 每次增长的节点高度
  // 1.switch节点 if,else数量
  const sourceHandleNum =
    type === 'Switch'
      ? generateRandomArray(switchDataLength, 'Switch')
      : generateRandomArray(1);
  const nodeMinHeight =
    type === 'Switch' ? Number(switchDataLength * nodeHeight) : undefined;

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
        nodeMinHeight={nodeMinHeight}
      />
      {!settingMap?.[type]?.sourceHandleHidden && (
        <>
          {(sourceHandleNum || [])?.map((item, key) => (
            <SourceHandle
              position={sourcePosition}
              isConnectable={isConnectable}
              selected={selected}
              isHovered={isHovered}
              handleAddNode={handleAddNode}
              id={item?.id}
              style={
                item?.switchTitle
                  ? key === 0
                    ? { top: 40 }
                    : { top: 40 * key + 40 }
                  : {}
              }
              switchTitle={item?.switchTitle}
            />
          ))}
        </>
      )}
    </div>
  );
});
