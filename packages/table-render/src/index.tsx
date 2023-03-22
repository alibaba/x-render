import React, { useEffect } from 'react';
import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';
import 'dayjs/locale/zh-cn';
import locales from './locales';

import RenderCore from './core';
import { TableRenderProps } from './types';
export type {
  TableRenderProps,
  ProColumnsType,
  SearchProps,
} from './types';

const TableRender = React.forwardRef((props: TableRenderProps, ref) => {
  const {
    configProvider,
    locale = 'zh-CN',
    ...otherProps
  } = props;

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
      <RenderCore {...otherProps} tableRef={ref} />
    </ConfigProvider>
  );
});

export default TableRender;