import React, { memo, useContext, useState } from 'react';
import { Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { Handle, Position } from '@xyflow/react';
import { capitalize } from '../../core/utils';
import { ConfigContext } from '../../models/context';
import './index.less';

export default memo((props: any) => {
  const { id, type, data, layout, isConnectable, selected, onClick } = props;
  const configCtx: any = useContext(ConfigContext);
  const NodeWidget = configCtx?.nodeWidgets[`${capitalize(type)}Node`];

  const [isHovered, setIsHovered] = useState(false);

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
      {capitalize(type)!== 'Start' && (
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
      {capitalize(type) !== 'End' && (
        <Handle
          type='source'
          position={sourcePosition}
          isConnectable={isConnectable}
        >
          {(selected || isHovered) && (
            <div className='xflow-node-add-box'>
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
            </div>
          )}
        </Handle>
      )}
    </div>
  );
})
