import * as React from "react";

import XFlow, { FlowProvider, useNodes } from '@xrenders/xflow';
import { edges as initialEdges } from './edges';
import { nodes as initialNodes } from './nodes';
import settings from './setting';

const App = () => {
  return (
    <FlowProvider>
      <div style={{ height: '600px' }}>
        <XFlow
          initialValues={{ nodes: initialNodes, edges: initialEdges }}
          settings={settings as any[]}
          nodeSelector={{
            showSearch: true,
          }}
        />
      </div>
      <Sidebar />
    </FlowProvider>
  );
};

function Sidebar() {
  // This hook will only work if the component it's used in is a child of a
  // <FlowProvider />.
  const nodes = useNodes();

  return (
    <aside>
      {nodes?.map(node => (
        <div key={node?.id}>
          Node {node?.id} - x: {node?.position?.x?.toFixed(2)}, y:{' '}
          {node?.position?.y?.toFixed(2)}
        </div>
      ))}
    </aside>
  );
}

export default () => {
  return (
    <FlowProvider>
      <App />
    </FlowProvider>
  );
};
