import React from 'react';
import XFlow from '@xrenders/xflow';
import settings from './setting';

export default () => {
  const nodes = [
    { id: '1', type: 'Switch', data: { input: '开始节点', select: "b" }, position: { x: 40, y: 240 } },
  ];

  const edges = []

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
}
