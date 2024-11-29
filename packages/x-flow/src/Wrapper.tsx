import React, { useContext } from 'react';

import { XFlowProvider } from './components/XFlowProvider';
import StoreContext from './models/context';

export const Wrapper = ({
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
    <XFlowProvider initialNodes={nodes} initialEdges={edges}>
      {children}
    </XFlowProvider>
  );
};
