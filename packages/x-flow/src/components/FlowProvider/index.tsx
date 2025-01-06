import { ReactFlowProvider } from '@xyflow/react';
import React, { memo, ReactNode, useContext, useEffect, useState } from 'react';

import { useStore } from '../../hooks/useStore';
import StoreContext, { Provider } from '../../models/context';
import { createStore } from '../../models/store';
import { transformNodes, transformSwitchNodes } from '../../utils';

export const FlowProvider = memo<{
  initialNodes?: any[];
  initialEdges?: any[];
  children: ReactNode;
  layout?: 'LR' | 'TB';
}>(
  ({
    initialNodes: nodes = [],
    initialEdges: edges = [],
    children,
    layout = 'LR',
  }) => {
    const [store] = useState(() =>
      createStore({
        nodes,
        edges,
        layout,
      })
    );

    return (
      <ReactFlowProvider>
        <Provider value={store}>{children}</Provider>
      </ReactFlowProvider>
    );
  }
);

const InitialProvider = ({ nodes, edges, layout, children }) => {
  const { setNodes, setEdges, setLayout } = useStore(s => ({
    setNodes: s.setNodes,
    setEdges: s.setEdges,
    setLayout: s.setLayout,
  }));
  useEffect(() => {
    setNodes(nodes);
    setLayout(layout);
    setEdges(edges);
  }, []);

  // we need to wrap it with a fragment because it's not allowed for children to be a ReactNode
  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18051
  return <>{children}</>;
};

export const FlowProviderWrapper = ({
  children,
  nodes,
  edges,
  layout,
}: {
  children: React.ReactNode;
  nodes: any[];
  edges: any[];
  layout?: 'LR' | 'TB';
}) => {
  const isWrapped = useContext(StoreContext);

  if (isWrapped) {
    return (
      <InitialProvider nodes={transformSwitchNodes(nodes)} edges={edges} layout={layout}>
        {children}
      </InitialProvider>
    );
  }

  return (
    <FlowProvider
      initialNodes={transformNodes(nodes)}
      initialEdges={edges}
      layout={layout}
    >
      {children}
    </FlowProvider>
  );
};
