import React, { useEffect, useRef } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import { createStore } from './models/store';
import { FlowContext, ConfigContext } from './models/context';

export default function withProvider<T>(Element: React.ComponentType<T>, defaultNodeWidgets?: any) : React.ComponentType<T> {
  return (props: any) => {
    const {
      configProvider,
      locale = 'zh-CN',
      nodeWidgets,
      methods,
      ...restProps
    } = props;
  
    const storeRef = useRef(createStore());
    const store: any = storeRef.current;
  
    useEffect(() => {
      dayjs.locale(locale === 'en-US' ? 'en': 'zh-cn');
    }, [locale]);

    const antdLocale = locale === 'zh-CN' ? zhCN : enUS;
    const configContext = {
      locale,
      methods,
      nodeWidgets: { ...defaultNodeWidgets, ...nodeWidgets },
    };
  
    const languagePackage = { 
      ...antdLocale,
      ...configProvider?.locale
    };

    return (
      <ConfigProvider
        {...configProvider}
        locale={languagePackage}
      >
        <ConfigContext.Provider value={configContext}>
          <FlowContext.Provider value={store}>
            <ReactFlowProvider>
              <Element {...restProps} />
            </ReactFlowProvider>
          </FlowContext.Provider>
        </ConfigContext.Provider>
      </ConfigProvider>
    );
  }
}