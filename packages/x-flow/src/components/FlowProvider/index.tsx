import StoreContext, { Provider } from '../../models/context';
import { createStore } from '../../models/store';

import type { ReactNode } from 'react';
import React, { memo, useContext, useState } from 'react';

export const FlowProvider = memo<{
  initialNodes: any[];
  initialEdges: any[];
  children: ReactNode;
}>(({ initialNodes: nodes = [], initialEdges: edges = [], children }) => {
  const [store] = useState(() =>
    createStore({
      nodes,
      edges,
    })
  );

  return <Provider value={store}>{children}</Provider>;
});

export const FlowProviderWrapper = ({
  children,
  nodes,
  edges,
}: {
  children: React.ReactNode;
  nodes: any[];
  edges: any[];
}) => {
  const isWrapped = useContext(StoreContext);

  if (isWrapped) {
    // we need to wrap it with a fragment because it's not allowed for children to be a ReactNode
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18051
    return <>{children}</>;
  }

  return (
    <FlowProvider initialNodes={nodes} initialEdges={edges}>
      {children}
    </FlowProvider>
  );
};
