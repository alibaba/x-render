import React, { useEffect, useRef } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';

import { FRContext } from './models/context';
import { createStore } from './models/store';
import { validateMessagesEN, validateMessagesCN } from './models/validateMessage';

import FormCore from './form-core';
import { widgets as defaultWidgets } from './widgets';
import { FRProps } from './index.d';
import i18n from './i18next';

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
  const { configProvider, widgets, form, validateMessages, ...otherProps } = props;
  const storeRef = useRef(createStore());
  const store: any = storeRef.current;
 
  if (!form) {
    console.warn('Please provide a form instance to FormRender');
    return null;
  }

  const locale = configProvider?.locale || 'zhCN';

  useEffect(() => {
    const lang = locale === 'enUS' ? 'en' : 'zh'
    i18n.changeLanguage(lang)
  }, [locale])

  const antdLocale = locale === 'zhCN' ? zhCN : enUS
  const formValidateMessages = antdLocale?.locale?.includes('en') ? validateMessagesEN : validateMessagesCN;

  return (
    <ConfigProvider
      {...configProvider}
      locale={antdLocale}
      form={{
        validateMessages: { ...formValidateMessages, ...validateMessages },
      }}
    >
      <FRContext.Provider value={store}>
        <FormCore
          form={form}
          widgets={{ ...defaultWidgets, ...widgets }}
          {...otherProps}
        />
      </FRContext.Provider>
    </ConfigProvider>
  );
}