import React from "react";
import XFlow, { XFlowProvider } from '@xrenders/xflow';
import settings from './setting';

const App = () => {
  const nodes = [
    {
      id: '1',
      type: 'Start',
      data: {},
      position: {
        x: 40,
        y: 240,
      },
    },
    {
      id: '2',
      type: 'End',
      data: {},
      position: {
        x: 500,
        y: 240,
      },
    },
  ];

  const edges = [{ source: '1', target: '2', id: '234123' }];

  return (
    <div style={{ height: '600px' }}>
      <XFlow
        initialValues={{ nodes, edges }}
        settings={settings}
        nodeSelector={{
          showSearch: true,
        }}
      />
    </div>
  );
};

export default () => {
  return (
    <XFlowProvider>
      <App />
    </XFlowProvider>
  );
};
