import XFlow from '@xrenders/xflow';
import settings from './setting';
import React from 'react'

export default () => {
  const nodes = [
    {
      type: 'Start',

      id: '1',
      position: {
        x: -40,
        y: 217.02097759552555,
      },
    },
    {
      type: 'End',
      position:{
      "x": 733,
      "y": 70
    },
      id: '2',
    },
    {
      id: 'qga2pm66shrcn0ir',
      position: {
        "x": 320,
        "y": 228
      },
      type: 'Parallel',
      data: {
        list: [
          {
            value: '并行事件1',
          },
          {
            value: '并行事件2',
          },
        ],
      },
    },
    {
      id: 'z0ps4v0c8xkvuu5c',
      position: {
        "x": 640,
        "y": 461
      },
      type: 'Code',
    },
  ];

  const edges = [
    {
      source: '1',
      target: 'qga2pm66shrcn0ir',
      id: 'xy-edge__1-qga2pm66shrcn0ir',
    },
    {
      source: 'qga2pm66shrcn0ir',
      sourceHandle: 'id_0',
      target: '2',
      id: 'xy-edge__qga2pm66shrcn0irid_0-2',
    },
    {
      source: 'qga2pm66shrcn0ir',
      sourceHandle: 'id_1',
      target: 'z0ps4v0c8xkvuu5c',
      id: 'xy-edge__qga2pm66shrcn0irid_1-z0ps4v0c8xkvuu5c',
    },
    {
      source: 'z0ps4v0c8xkvuu5c',
      target: '2',
      id: 'xy-edge__z0ps4v0c8xkvuu5c-2',
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
      />
    </div>
  );
};
