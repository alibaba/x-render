import type { MouseEvent } from 'react';
import React, { memo } from 'react';
import {
  RiCursorLine,
  RiFunctionAddLine,
  RiHand,
  RiStickyNoteAddLine,
} from '@remixicon/react';
import { Tooltip, Button } from 'antd';
import IconView from '../../../components/IconView';
import { useEventEmitterContextContext } from '../../../context/event-emitter';
import NodeSelectPopover from '../../../components/NodeSelectPopover';
import './index.less';

const Control = (props: any) => {
  const { addNode } = props;
  
  const addNote = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const { eventEmitter } = useEventEmitterContextContext()

  return (
    <div className='fai-reactflow-control'>
      <NodeSelectPopover addNode={addNode}>
        <Tooltip title='添加节点'>
          <Button 
            type='text' 
            icon={<IconView type='icon-add-circle' style={{ fontSize: 20 }} />} 
          />
        </Tooltip>
      </NodeSelectPopover>
      <Tooltip title='添加注释'>
        <div
          className='control-item'
          onClick={addNote}
        >
          <RiStickyNoteAddLine className='icon' />
        </div>
      </Tooltip>
      <div className='separator'></div>
      <Tooltip title='指针模式'>
        <div className='control-item'>
          <RiCursorLine className='icon' />
        </div>
      </Tooltip>
      <Tooltip title='手模式'>
        <div className='control-item'>
          <RiHand className='icon' />
        </div>
      </Tooltip>
      <div className='separator'></div>
      <Tooltip title='整理节点'>
        <Button 
          type='text'
          icon={<RiFunctionAddLine className='icon' />}
          onClick={() => {
            eventEmitter?.emit({ type: 'auto-layout-nodes' } as any)
          }}
        />
      </Tooltip>
    </div>
  )
};

export default memo(Control);
