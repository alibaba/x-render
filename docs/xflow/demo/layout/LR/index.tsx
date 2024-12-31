import XFlow from '@xrenders/xflow';
import { settings,nodes,edges } from './setting';
import React from 'react';

export default () => {

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
