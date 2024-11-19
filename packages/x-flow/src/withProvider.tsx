import React from 'react';
import { ConfigProvider } from 'antd';
import { ReactFlowProvider } from '@xyflow/react';
import { FlowContext, ConfigContext } from './models/context';

export default function withProvider<T>(Element: React.ComponentType<T>, defaultNodeWidgets?: any) : React.ComponentType<T> {
  return (props: any) => {
    const {
      configProvider,
      nodeWidgets,
      methods,
      ...restProps
    } = props;
  
    const configContext = {
      methods,
      nodeWidgets: { 
        ...defaultNodeWidgets,
        ...nodeWidgets
      }
    };
  
    return (
      <ConfigProvider {...configProvider}>
        <ConfigContext.Provider value={configContext}>
          <FlowContext.Provider value={{}}>
            <ReactFlowProvider>
              <Element {...restProps} />
            </ReactFlowProvider>
          </FlowContext.Provider>
        </ConfigContext.Provider>
      </ConfigProvider>
    );
  }
}