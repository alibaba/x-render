import { MoreOutlined } from '@ant-design/icons';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import { Dropdown, message } from "antd";

import classNames from 'classnames';
import React, { memo, useCallback, useContext, useState } from 'react';
import { shallow } from 'zustand/shallow';
import { useStore } from '../../hooks/useStore';
import { ConfigContext } from '../../models/context';
import { capitalize, uuid, uuid4 } from '../../utils';
import './index.less';
import SourceHandle from './sourceHandle';

export default memo((props: any) => {
  const { id, type, data, layout, isConnectable, selected, onClick } = props;
  const { widgets, settingMap } = useContext(ConfigContext);
  const NodeWidget =
    widgets[`${capitalize(type)}Node`] || widgets['CommonNode'];
  const [isHovered, setIsHovered] = useState(false);
  const reactflow = useReactFlow();
  const { addNodes, addEdges, copyNode, pasteNode, deleteNode, mousePosition } = useStore(
    (state: any) => ({
      nodes: state.nodes,
      edges: state.edges,
      mousePosition: state.mousePosition,
      addNodes: state.addNodes,
      addEdges: state.addEdges,
      copyNode: state.copyNode,
      pasteNode: state.pasteNode,
      deleteNode: state.deleteNode,
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

  const handleCopyNode = useCallback(() => {
    copyNode(id);
    message.success('复制成功');
  }, [copyNode]);

  const handlePasteNode = useCallback(() => {
    pasteNode(id)
  }, [pasteNode]);

  const handleDeleteNode = useCallback(() => {
    deleteNode(id)
  }, [pasteNode]);

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
      {selected && (
        <Dropdown
          menu={{
            items: [
              {
                label: '复制',
                key: ' copy',
                onClick: handleCopyNode,
              },
              {
                label: '粘贴',
                key: 'paste',
                onClick: handlePasteNode,
              },
              {
                label: '删除',
                key: 'delete',
                danger: true,
                onClick: handleDeleteNode,
              },
            ],
          }}
          trigger={['click', 'contextMenu']}
        >
          <div className="xflow-node-actions-container">
          <MoreOutlined
            style={{ transform: 'rotateZ(90deg)', fontSize: '20px' }}
          ></MoreOutlined>
        </div>
        </Dropdown>
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
