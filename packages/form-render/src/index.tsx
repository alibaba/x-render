import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

import FormCore from './form-core';
import { widgets as defaultWidgets } from './widgets';
import { Provider, createStore } from './form-core/models/createFormStore';
import { validateMessagesEN, validateMessagesCN } from './form-core/models/validateMessage';

export { widgets } from './widgets';
export { mapping } from './render-core/mapping';
export { connectForm, useForm } from './form-core';

export default (props: any) => {
  const { configProvider, widgets, form, schema, validateMessages, ...otherProps } = props;

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
      <Provider createStore={createStore}>
        <FormCore
          form={form}
          widgets={{ ...defaultWidgets, ...widgets }}
          {...otherProps}
          schema={schema}
        />
      </Provider>
    </ConfigProvider>
  );
}
