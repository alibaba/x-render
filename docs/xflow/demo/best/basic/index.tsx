import XFlow from '@xrenders/xflow';
import { settings } from './setting';
import { nodes,edges } from './const';
import React from 'react';
import './index.less';
import showSwitchNode from './showSwitchNode';
import Header from './header';
import { Tools } from './tools';

export default () => {
  return (
    <div style={{ height: '600px',position:'relative' }}>
      <Header data={ {}} />
      <XFlow
        initialValues={{ nodes, edges }}
        settings={settings}
        nodeSelector={{
          showSearch: true,
        }}
        widgets={{ showSwitchNode }}
      />
      <Tools />
    </div>
  );
};
