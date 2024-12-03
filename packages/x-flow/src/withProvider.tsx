import { ReactFlowProvider } from '@xyflow/react';
import { ConfigProvider } from 'antd';
import React, { useMemo } from 'react';
import { ConfigContext } from './models/context';
import { TNodeGroup, TNodeItem } from './types';
interface ProviderProps<T> {
  configProvider?: any;
  widgets?: any;
  methods?: any;
  nodeSelector?: any;
  settings?: (TNodeGroup | TNodeItem)[];
  [key: string]: any;
}

export default function withProvider<T>(
  Element: any,
  defaultWidgets?: any
): React.ComponentType<T> {
  return (props: ProviderProps<T>) => {
    const {
      configProvider,
      widgets,
      methods,
      nodeSelector,
      settings,
      ...restProps
    } = props;

    const settingMap = useMemo(() => {
      const obj: Record<string, any> = {};
      settings?.forEach((node: any) => {
        if (node.type !== '_group') {
          obj[node.type] = node;
        } else {
          node.items.forEach((item: any) => {
            obj[item.type] = item;
          });
        }
      });
      return obj;
    }, [settings]);

    const configContext = {
      methods,
      nodeSelector,
      settings,
      settingMap,
      widgets: {
        ...defaultWidgets,
        ...widgets,
      },
    };

    return (
      <ConfigProvider {...configProvider}>
        <ConfigContext.Provider value={configContext}>
          <ReactFlowProvider>
            <Element {...restProps} settings={settings} />
          </ReactFlowProvider>
        </ConfigContext.Provider>
      </ConfigProvider>
    );
  };
}
