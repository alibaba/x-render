import React, { useEffect, useRef } from 'react';
import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';

import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';
import 'dayjs/locale/zh-cn';

import { createStore } from './models/store';
import { FRContext } from './models/context';

export default function withProvider<T>(
  Element: React.ComponentType<T>,
  defaultWidgets?: any,
): React.ComponentType<T> {
  return (props: any) => {
    const {
      configProvider,
      locale = 'zh-CN',
      widgets,
      ...rest
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

    const langPack: any = {
      ...antdLocale,
      ...configProvider?.locale,
    };

    return (
      <ConfigProvider {...configProvider} locale={langPack}>
        <FRContext.Provider value={store}>
          <Element {...rest} widgets={{ ...defaultWidgets, ...widgets }} />
        </FRContext.Provider>
      </ConfigProvider>
    );
  };
}
