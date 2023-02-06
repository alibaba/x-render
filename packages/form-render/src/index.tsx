import React, { useRef } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

import { FRContext } from './models/context';
import { createStore } from './models/store';
import { validateMessagesEN, validateMessagesCN } from './models/validateMessage';

import FormCore from './form-core';
import { widgets as defaultWidgets } from './widgets';
import { FRProps } from './index.d';

export { widgets } from './widgets';
export { mapping } from './models/mapping';

export { default as useForm } from './models/useForm';
export { default as connectForm }  from './form-core/connectForm';

export type  { 
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

  const locale = configProvider?.locale || zhCN;
  const formValidateMessages = locale?.locale?.includes('en_') ? validateMessagesEN : validateMessagesCN;

  return (
    <ConfigProvider
      {...configProvider}
      locale={locale}
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