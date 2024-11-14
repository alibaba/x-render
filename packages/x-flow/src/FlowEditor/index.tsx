import React, { memo } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { WorkflowContextProvider } from './context';
import FlowEditor from './main';

const WorkflowContainer = (props: any) => {
  const { initialState, nodeMenus } = props;
  
  return (
    <WorkflowContextProvider>
      <ReactFlowProvider>
        <FlowEditor
          nodes={initialState?.nodes}
          edges={initialState?.edges}
          nodeMenus={nodeMenus}
        />
      </ReactFlowProvider>
    </WorkflowContextProvider>
  );
};

export default memo(WorkflowContainer)
