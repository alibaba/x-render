import XFlow from '@xrenders/xflow';
import settings from './setting';
import React from 'react';

export default () => {
  const nodes = [
    {
      type: 'Start',
      id: '1',
      position: { x: -35, y: 268 },
    },
    {
      type: 'Switch',
      id: '2',
      position: { x: 277.5, y: 268 },
    },
    {
      type: 'Code',
      id: '3',
      position: { x: 675, y: 123.75 },
    },
    {
      type: 'tool',
      id: '4',
      position: { x: 686.25, y: 495 },
    },
    {
      type: 'End',
      id: '5',
      position: { x: 1176.2499999999998, y: 281.25 },
    },
  ];
  const edges = [
    { source: '1', target: '2', id: 'e1-2' },
    {
      source: '2',
      target: '3',
      id: 'e2-3',
    },
    { source: '2', target: '4', id: 'e2-4' },
    {
      source: '3',
      target: '5',
      id: 'e3-5',
    },
    {
      source: '4',
      target: '5',
      id: 'e4-5',
    },
  ];

  return (
    <div style={{ height: '600px' }}>
      <XFlow
        initialValues={{ nodes, edges }}
        settings={settings}
        nodeSelector={{
          showSearch: true,
        }}
        layout="LR"
      />
    </div>
  );
};
