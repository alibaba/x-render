import React, { useEffect, useRef } from 'react';
import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import { useUnmount } from 'ahooks';

import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';
import locales from './locales';
import 'dayjs/locale/zh-cn';

import { createStore } from './models/store';
import { FRContext, ConfigContext } from './models/context';
import { validateMessagesEN, validateMessagesCN } from './models/validateMessage';

export default function withProvider<T>(Element: React.ComponentType<T>, defaultWidgets?: any) : React.ComponentType<T> {
  return (props: any) => {
    const {
      configProvider,
      locale = 'zh-CN',
      widgets,
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
    const formValidateMessages = locale === 'zh-CN' ? validateMessagesCN : validateMessagesEN;
    const configContext = {
      locale,
      widgets: { ...defaultWidgets, ...widgets },
      methods,
    };
  
    const langPack: any = { 
      ...antdLocale,
      'FormRender': locales[locale],
      ...configProvider?.locale
    };

    return (
      <ConfigProvider
        {...configProvider}
        locale={langPack}
      >
        <ConfigContext.Provider value={configContext}>
          <FRContext.Provider value={store}>
            <Element {...otherProps} />
          </FRContext.Provider>
        </ConfigContext.Provider>
      </ConfigProvider>
    );
  };
}