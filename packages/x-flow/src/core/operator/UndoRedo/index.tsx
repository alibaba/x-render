import React, { memo } from 'react';
import { RiArrowGoBackLine, RiArrowGoForwardFill } from '@remixicon/react'
import { Button, Tooltip } from 'antd';
import IconView from '../../../components/IconView';
import './index.less';

export type UndoRedoProps = {
  handleUndo: () => void; 
  handleRedo: () => void;
};

export default memo(({ handleUndo, handleRedo }: UndoRedoProps) => {
  return (
    <div className='fai-reactflow-undoredo'>
      <Tooltip title='撤销'>
        <Button 
          type='text' 
          icon={<IconView type='icon-undo' style={{ fontSize: 18, color: '#667085' }} />}
          onClick={handleUndo}
        />
      </Tooltip>
      <Tooltip title='重做'>
        <Button 
          type='text' 
          icon={<IconView type='icon-redo' style={{ fontSize: 18, color: '#667085' }} />}
          onClick={handleRedo}
        />
      </Tooltip>
    </div>
  );
})