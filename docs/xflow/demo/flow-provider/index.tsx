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
  console.log("nodes", nodes);

  return (
    <aside>
      nodes数据格式：
      <pre style={{ fontSize: '12px', margin: '4px 0' }}>
        {JSON.stringify(nodes, null, 2)}
      </pre>
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
