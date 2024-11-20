import React from 'react';
import { ConfigProvider } from 'antd';
import { ReactFlowProvider } from '@xyflow/react';
import { FlowContext, ConfigContext } from './models/context';

export default function withProvider<T>(Element: React.ComponentType<T>, defaultWidgets?: any) : React.ComponentType<T> {
  return (props: any) => {
    const {
      configProvider,
      widgets,
      methods,
      nodeSelector,
      settings,
      ...restProps
    } = props;
  
    const configContext = {
      methods,
      nodeSelector,
      settings,
      widgets: { 
        ...defaultWidgets,
        ...widgets
      }
    };
  
    return (
      <ConfigProvider {...configProvider}>
        <ConfigContext.Provider value={configContext}>
          <FlowContext.Provider value={{}}>
            <ReactFlowProvider>
              <Element {...restProps} settings={settings} />
            </ReactFlowProvider>
          </FlowContext.Provider>
        </ConfigContext.Provider>
      </ConfigProvider>
    );
  }
}