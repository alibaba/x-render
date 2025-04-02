import React, { useState } from 'react';
import XFlow from '@xrenders/xflow';
import { AdvancedSettingWidget } from './customWidget';
import setting from './setting';
import { Button, Switch } from 'antd';

export default () => {
  const [readOnly, setReadonly] = useState(false);

  const nodes = [
    {
      id: 'start',
      type: 'Start',
      data: {
        title: '开始',
      },
      position: {
        x: 200,
        y: 200,
      }
    },
    {
      id: '1',
      type: 'LLM',
      data: {
        name: '高级节点',
        formType: 'simple',
        simpleInput: '',
        complexConfig: {
          field1: '',
          field2: '',
        },
        conditions: []
      },
      position: {
        x: 500,
        y: 200,
      }
    },
    {
      id: '2',
      type: 'End',
      data: {},
      position: {
        x: 800,
        y: 200,
      }
    }
  ];

  const edges = [
    { source: 'start', target: '1', id: 'e0' },
    { source: '1', target: '2', id: 'e1' }
  ];

  return (
    <div style={{ height: '600px' }}>
      <div style={{ marginBottom: '16px' }}>
        <span> 查看只读状态 <Switch checked={readOnly} onChange={setReadonly} /></span>
      </div>
      <XFlow
        initialValues={{ nodes, edges }}
        settings={setting}
        widgets={{ AdvancedSettingWidget }}
        readOnly={readOnly}
        style={{ marginTop: '20px' }}
        globalConfig={{
          nodePanel: {
            onClose: (nodeID) => {
              console.log("关闭节点",nodeID)
            }
          }
        }}
      />
    </div>
  );
};
