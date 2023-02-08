import React, { useEffect, useRef } from 'react';
import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';

import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';
import 'dayjs/locale/zh-cn';

import { createStore } from './models/store';
import { FRContext, ConfigContext } from './models/context';
import { validateMessagesEN, validateMessagesCN } from './models/validateMessage';

import FormCore from './form-core';
import { widgets as defaultWidgets } from './widgets';
import i18n from './i18next';
import { FRProps } from './index.d';

export { widgets } from './widgets';
export { mapping } from './models/mapping';

export { default as useForm } from './models/useForm';
export { default as connectForm } from './form-core/connectForm';

export type {
  default as FR,
  Schema,
  FRProps,
  FormInstance,
  FormParams,
  FieldParams,
  WatchProperties,
  SchemaType,
  SchemaBase,
  ValidateParams,
  ResetParams,
  RuleItem,
  ScrollOptions,
} from './index.d';


export default (props: FRProps) => {
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

  if (!form) {
    console.warn('Please provide a form instance to FormRender');
    return null;
  }

  const antdLocale = locale === 'zh-CN' ? zhCN : enUS;
  const formValidateMessages = antdLocale?.locale?.includes('en') ? validateMessagesEN : validateMessagesCN;

  const configContext = {
    locale,
    widgets: { ...defaultWidgets, ...widgets },
    methods,
  };

  return (
    <ConfigProvider
      locale={antdLocale}
      {...configProvider}
      form={{
        validateMessages: { 
          ...formValidateMessages,
          ...validateMessages
        }
      }}
    >
      <ConfigContext.Provider value={configContext}>
        <FRContext.Provider value={store}>
          <FormCore form={form} {...otherProps} />
        </FRContext.Provider>
      </ConfigContext.Provider>
    </ConfigProvider>
  );
}