import React, { memo } from 'react';
import { Button, Tooltip } from 'antd';
import IconView from '../../components/IconView';
import './index.less';

export type UndoRedoProps = {
  handleUndo: () => void;
  handleRedo: () => void;
  pastStates: any[];
  futureStates: any[];
};

export default memo(({ handleUndo, handleRedo, pastStates, futureStates }: UndoRedoProps) => {
  return (
    <div className='fai-reactflow-undoredo'>
      <Tooltip title='撤销'>
        <Button
          type='text'
          icon={<IconView type='icon-undo'  className="icon" />}
          onClick={handleUndo}
          disabled={!pastStates?.length}
        />
      </Tooltip>
      <Tooltip title='重做'>
        <Button
          type='text'
          icon={<IconView type='icon-redo' className="icon" />}
          onClick={handleRedo}
          disabled={!futureStates?.length}
        />
      </Tooltip>
    </div>
  );
})
