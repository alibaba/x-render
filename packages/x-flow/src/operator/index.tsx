import React, { memo } from 'react';
// import UndoRedo from '../header/undo-redo'
import ZoomInOut from './ZoomInOut';
import UndoRedo from './UndoRedo';
import Control from './Control';

import './index.less';
import { useTemporalStore } from '../models/store';

export type OperatorProps = {
  addNode: any;
}

const Operator = ({ addNode }: OperatorProps) => {
  const { undo, redo, pastStates, futureStates } = useTemporalStore();
  return (
    <div className='fai-reactflow-operator'>
      <div className='operator-section'>
        <ZoomInOut />
        <UndoRedo handleUndo={() => undo()} handleRedo={() => redo()} pastStates={pastStates} futureStates={futureStates} />
        <Control addNode={addNode} />
      </div>
    </div>
  );
}

export default memo(Operator)
