import React from 'react';
import XFlow from '@xrenders/xflow';
import settings from './setting';
import customWidget from './customWidget';

export default () => {
  const nodes = [
    {
      id: '1',
      type: 'Start',
      data: {
        inputVal:'我是自定义组件'
      },
      position: {
        x: 40,
        y: 240,
      }
    },
    {
      id: '2',
      type: 'End',
      data: {},
      position: {
        x: 500,
        y: 240,
      }
    }
  ];

  const edges = [
    { source: '1', target: '2', id: '234123' }
  ]

  return (
    <div style={{ height: '600px' }}>
      <XFlow
        initialValues={{ nodes, edges }}
        settings={settings}
        nodeSelector={{
          showSearch: true,
        }}
        widgets={{ customWidget }}
      />
    </div>
  );
}
