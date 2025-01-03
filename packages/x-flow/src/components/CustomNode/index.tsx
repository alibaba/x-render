import { MoreOutlined } from '@ant-design/icons';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import { Dropdown, Menu, message } from 'antd';

import { ItemType } from 'antd/es/menu/interface';
import classNames from 'classnames';
import { isFunction } from 'lodash';
import React, { memo, useCallback, useContext, useMemo, useState } from 'react';
import { shallow } from 'zustand/shallow';
import { useStore } from '../../hooks/useStore';
import { ConfigContext } from '../../models/context';
import { capitalize, transformNodeStatus, uuid, uuid4 } from '../../utils';
import './index.less';
import SourceHandle from './sourceHandle';

export default memo((props: any) => {
  const { id, type, data, layout, isConnectable, selected, onClick, status } =
    props;
  const { widgets, settingMap, globalConfig, onMenuItemClick, antdVersion,readOnly } =
    useContext(ConfigContext);
  const deletable = globalConfig?.edge?.deletable ?? true;

  // const isConnectableStart = globalConfig?.handle?.isConnectableStart ?? true;
  // const isConnectableEnd = globalConfig?.handle?.isConnectableEnd ?? true;

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
      deletable,
      ...(sourceHandle && { sourceHandle }),
    };
    addNodes(newNodes, false);
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

  const handlePasteNode = useCallback(
    (data?: { sourceHandle: string }) => {
      pasteNode(id, data);
    },
    [pasteNode]
  );

  const handleDeleteNode = useCallback(() => {
    deleteNode(id);
  }, [pasteNode]);

  const defaultAction = (e, sourceHandle) => {
    if (e.key === 'copy') {
      handleCopyNode();
    } else if (e.key === 'paste') {
      handlePasteNode();
    } else if (e.key === 'delete') {
      handleDeleteNode();
    } else if (e.key.startsWith('paste-')) {
      if (sourceHandle) {
        handlePasteNode({
          sourceHandle,
        });
      } else {
        handlePasteNode();
      }
    }
  };

  const itemClick = e => {
    if (!e.key) {
      return;
    }
    const sourceHandle = e.item.props?.sourcehandle;
    if (isFunction(onMenuItemClick)) {
      const data: Record<string, string> = {
        key: e.key,
        nodeId: id,
      };
      if (type === 'Switch' && e.key.startsWith('paste-') && sourceHandle) {
        data['sourceHandle'] = sourceHandle;
      }
      onMenuItemClick(data as any, () => {
        defaultAction(e, sourceHandle);
      });
    } else {
      defaultAction(e, sourceHandle);
    }
  };

  const menuItem: ItemType[] = useMemo(() => {
    if (type === 'Switch') {
      let list = [];
      if (Array.isArray(data.list)) {
        const len = data.list.length;
        list = data.list.map((r, i) => {
          if (i === 0) {
            return {
              label: `粘贴到第${i + 1}个出口`,
              key: 'paste-' + i,
              index: i,
              id: id,
            };
          } else {
            return {
              label: `粘贴到第${i + 1}个出口`,
              key: 'paste-' + i,
              id: id,
              index: i,
              sourcehandle: r._conditionId,
            };
          }
        });
      }
      return [
        ...list,
        {
          label: `粘贴到第${list.length + 1}个出口`,
          key: 'paste-' + (list.length + 1),
          id: id,
          index: list.length + 1,
          sourcehandle: 'condition_else',
        },
      ];
    }
    return [
      {
        label: '粘贴',
        key: 'paste',
      },
    ];
  }, [type]);

  // 节点状态处理
  const statusObj = transformNodeStatus(globalConfig?.nodeView?.status || []);
  const nodeBorderColor = statusObj[status]?.color;

  const menu = (
    <Menu onClick={itemClick}>
      <Menu.Item key={'copy'}>复制</Menu.Item>
      {menuItem.map((r: any) => {
        return <Menu.Item {...r}>{r.label}</Menu.Item>;
      })}
      <Menu.Item key={'delete'} danger={true}>删除</Menu.Item>
    </Menu>
  );

  const dropdownVersionProps = useMemo(() => {
    if (antdVersion === 'V5') {
      return {
        menu: {
          items: [
            {
              label: '复制',
              key: 'copy',
            },
            ...menuItem,
            {
              label: '删除',
              key: 'delete',
              danger: true,
            },
          ],
          onClick: itemClick,
        },
      };
    }
    // V4
    return {
      overlay: menu,
    };
  }, [menuItem]);

  return (
    <div
      className={classNames('xflow-node-container', {
        ['xflow-node-container-selected']: !!selected,
        ['xflow-node-container-tb']: layout === 'TB',
      })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ '--nodeBorderColor': nodeBorderColor } as React.CSSProperties}
    >
      {!settingMap?.[type]?.targetHandleHidden && (
        <Handle
          type="target"
          position={targetPosition}
          isConnectable={isConnectable}
          // isConnectableStart={isConnectableStart}
          // isConnectableEnd={isConnectableEnd}
        />
      )}
      {selected && (
        <Dropdown disabled={readOnly} {...dropdownVersionProps} trigger={['click', 'contextMenu']}>
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
            // isConnectableStart={isConnectableStart}
            // isConnectableEnd={isConnectableEnd}
          />
        </>
      )}
    </div>
  );
});
