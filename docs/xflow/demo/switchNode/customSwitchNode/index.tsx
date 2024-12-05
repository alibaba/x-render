import XFlow from '@xrenders/xflow';
import settings from './setting';
import React from 'react';

const customWidget = ({ data, key, item }) => {
  return <p style={{ wordWrap: 'break-word' }}>{item?.value}</p>;
};

export default () => {
  const nodes = [
    {
      type: 'Switch',
      id: '2',
      position: { x: 171.25, y: 218.75 },
      data: { switchData:[{value:"条件1"}]}
    },
  ];

  const edges = [];

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
};
