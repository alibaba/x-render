import React, { useEffect, useRef } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import { createStore } from './models/store';
import { FlowContext, ConfigContext } from './models/context';

export default function withProvider<T>(Element: React.ComponentType<T>, defaultNodes?: any) : React.ComponentType<T> {
  return (props: any) => {
    const {
      configProvider,
      locale = 'zh-CN',
      nodeWidges,
      methods,
      ...otherProps
    } = props;
  
    const storeRef = useRef(createStore());
    const store: any = storeRef.current;
  
    useEffect(() => {
      if (locale === 'en-US') {
        dayjs.locale('en');
        return;
      }
      dayjs.locale('zh-cn');
    }, [locale]);

    const antdLocale = locale === 'zh-CN' ? zhCN : enUS;
    const configContext = {
      locale,
      methods,
      widgets: { ...defaultNodes, ...nodeWidges },
    };
  
    const langPack: any = { 
      ...antdLocale,
      ...configProvider?.locale
    };

    return (
      <ConfigProvider
        {...configProvider}
        locale={langPack}
      >
        <ConfigContext.Provider value={configContext}>
          <FlowContext.Provider value={store}>
            <Element {...otherProps} />
          </FlowContext.Provider>
        </ConfigContext.Provider>
      </ConfigProvider>
    );
  };
}