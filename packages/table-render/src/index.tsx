import React, { useEffect } from 'react';
import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';
import 'dayjs/locale/zh-cn';
import locales from './locales';
import { StoreContext, createStore } from './core/store';
import { UseBoundStore, StoreApi } from 'zustand'

import RenderCore from './core';
import { TableContext, TableRenderProps } from './types';

export type {
  TableRenderProps,
  ProColumnsType,
  SearchProps,
  TableContext,
} from './types';

const TableRender = React.forwardRef<TableContext, TableRenderProps>((props, ref) => {
  const {
    configProvider,
    locale = 'zh-CN',
    ...otherProps
  } = props;

  const storeRef = React.useRef<UseBoundStore<StoreApi<TableRenderProps>>>();
  if (!storeRef.current) {
    storeRef.current = createStore();
  }

  useEffect(() => {
    if (locale === 'en-US') {
      dayjs.locale('en');
    } else {
      dayjs.locale('zh-cn');
    }
  }, [locale]);

  const antdLocale = locale === 'zh-CN' ? zhCN : enUS;
  if (otherProps.search && locale) {
    otherProps.search.locale = locale;
  }

  const langPack: any = {
    ...antdLocale,
    "TableRender": locales[locale],
    ...configProvider?.locale
  };

  return (
    <ConfigProvider
      {...configProvider}
      locale={langPack}
    >
      <StoreContext.Provider value={storeRef.current}>
        <RenderCore {...otherProps} tableRef={ref} />
      </StoreContext.Provider>
    </ConfigProvider>
  );
});

export default TableRender;