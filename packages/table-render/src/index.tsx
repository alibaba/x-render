import React, { useEffect, useRef } from 'react';
import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';

import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';
import 'dayjs/locale/zh-cn';

import { createStore } from './models/store';
import { TRContext, ConfigContext } from './models/context';

import RenderCore from './core';
import i18n from './i18next';

export default (props: any) => {
  const {
    configProvider,
    locale = 'zh-CN',
    widgets,
    methods,
    form,
    validateMessages,
    ...otherProps
  } = props;
  
  const storeRef = useRef(createStore());
  const store: any = storeRef.current;

  useEffect(() => {
    i18n.changeLanguage(locale);
    if (locale === 'en-US') {
      dayjs.locale('en');
    } else {
      dayjs.locale('zh-cn');
    }
  }, [locale]);

  const antdLocale = locale === 'zh-CN' ? zhCN : enUS;
  const configContext: any = {
    locale,
  };

  return (
    <ConfigProvider
      locale={antdLocale}
      {...configProvider}
    >
      <ConfigContext.Provider value={configContext}>
        <TRContext.Provider value={store}>
          <RenderCore {...otherProps} />
        </TRContext.Provider>
      </ConfigContext.Provider>
    </ConfigProvider>
  );
}