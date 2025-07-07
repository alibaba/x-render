import React, { memo, useContext } from 'react';
// import UndoRedo from '../header/undo-redo'
import Control from './Control';
import UndoRedo from './UndoRedo';
import ZoomInOut from './ZoomInOut';

import { useTemporalStore } from '../hooks/useTemporalStore';
import { ConfigContext } from '../models/context';
import './index.less';

export type OperatorProps = {
  addNode: any;
  xflowRef: any;
};

const Operator = ({ addNode, xflowRef }: OperatorProps) => {
  const { undo, redo, pastStates, futureStates } = useTemporalStore();
  const { globalConfig } = useContext(ConfigContext);
  const hideUndoRedoBtns = globalConfig?.controls?.hideUndoRedoBtns ?? false;
  const hideZoomInOutBtns = globalConfig?.controls?.hideZoomInOutBtns ?? false;
  const hideControlBtns = globalConfig?.controls?.hideControlBtns ?? false;

  return (
    <div className="fai-reactflow-operator">
      <div className="operator-section">
        {!Boolean(hideZoomInOutBtns) && <ZoomInOut />}
        {!Boolean(hideUndoRedoBtns) && (
          <UndoRedo
            handleUndo={() => undo()}
            handleRedo={() => redo()}
            pastStates={pastStates}
            futureStates={futureStates}
          />
        )}
        {!Boolean(hideControlBtns) && <Control addNode={addNode} xflowRef={xflowRef} />}
      </div>
    </div>
  );
};

export default memo(Operator);
