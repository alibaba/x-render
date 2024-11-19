import React, { memo, useContext, useState } from 'react';
import { Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import produce from 'immer';
import { useShallow } from 'zustand/react/shallow';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import useStore from '../../models/store';
import { capitalize, uuid } from '../../utils';
import { ConfigContext } from '../../models/context';
import NodeSelectPopover from '../NodeSelectPopover';
import './index.less';

export default memo((props: any) => {
  const { id, type, data, layout, isConnectable, selected, onClick } = props;
  const configCtx: any = useContext(ConfigContext);
  const NodeWidget = configCtx?.nodeWidgets[`${capitalize(type)}Node`];

  const [isHovered, setIsHovered] = useState(false);
  const reactflow = useReactFlow();
  const {
    edges,
    nodes,
    setNodes,
    setEdges,
    mousePosition,
  } = useStore(
    useShallow((state: any) => ({
      nodes: state.nodes,
      edges: state.edges,
      mousePosition: state.mousePosition,
      setNodes: state.setNodes,
      setEdges: state.setEdges,
      onEdgesChange: state.onEdgesChange
    }))
  );

  // 增加节点并进行联系
  const handleAddNode = (data: any) => {
    const { screenToFlowPosition } = reactflow;
    const { x, y } = screenToFlowPosition({ x: mousePosition.pageX + 100, y: mousePosition.pageY  + 100 });
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
      draft.push({
        id: uuid(),
        source: id,
        target: targetId,
      })
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
        ['xflow-node-container-tb']: layout === 'TB'
      })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      { (
        <Handle
          type='target'
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
      {(
        <Handle
          type='source'
          position={sourcePosition}
          isConnectable={isConnectable}
        >
          {(selected || isHovered) && (
            <div className='xflow-node-add-box'>
               <NodeSelectPopover placement='right' addNode={handleAddNode}>
                  <Tooltip 
                    title='点击添加节点'
                    arrow={false}
                    overlayInnerStyle={{
                      background: '#fff',
                      color: '#354052',
                      fontSize: '12px'
                    }}
                    >
                      <PlusOutlined style={{ color: '#fff', fontSize: 10 }}/>
                  </Tooltip>
                </NodeSelectPopover>
            </div>
          )}
        </Handle>
      )}
    </div>
  );
})
