import { memo } from 'react';
// import UndoRedo from '../header/undo-redo'
import ZoomInOut from './ZoomInOut';
import UndoRedo from './UndoRedo';
import Control from './Control';

import './index.less';

export type OperatorProps = {
  handleUndo: () => void
  handleRedo: () => void
  addNode: any;
}

const Operator = ({ handleUndo, handleRedo, addNode }: OperatorProps) => {
  return (
    <div className='fai-reactflow-operator'>
      <div className='operator-section'>
        <ZoomInOut />
        <UndoRedo
          handleRedo={handleRedo} 
          handleUndo={handleUndo}
        />
        <Control addNode={addNode} />
      </div>
    </div>
  );
}

export default memo(Operator)
