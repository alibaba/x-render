import React, { memo, useContext } from 'react';
import { Button, Tooltip } from 'antd';
import IconView from '../../components/IconView';
import './index.less';
import { ConfigContext } from '../../models/context';

export type UndoRedoProps = {
  handleUndo: () => void;
  handleRedo: () => void;
  pastStates: any[];
  futureStates: any[];
};

export default memo(({ handleUndo, handleRedo, pastStates, futureStates }: UndoRedoProps) => {
  const { readOnly } = useContext(ConfigContext);

  if (readOnly) {
    return null;
  }

  return (
    <div className='fai-reactflow-undoredo'>
      <Tooltip title='撤销' getPopupContainer={() => document.getElementById('xflow-container') as HTMLElement}>
        <Button
          type='text'
          icon={<IconView type='icon-undo' className="icon" style={{ color: !pastStates?.length ? 'rgba(0, 0, 0, 0.25)':  '#666F83'}} />}
          onClick={handleUndo}
          disabled={!pastStates?.length}
        />
      </Tooltip>
      <Tooltip title='重做' getPopupContainer={() => document.getElementById('xflow-container') as HTMLElement}>
        <Button
          type='text'
          icon={<IconView type='icon-redo' className="icon" style={{ color: !futureStates?.length ? 'rgba(0, 0, 0, 0.25)' : '#666F83' }} />}
          onClick={handleRedo}
          disabled={!futureStates?.length}
        />
      </Tooltip>
    </div>
  );
})
