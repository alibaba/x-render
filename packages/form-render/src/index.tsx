import React, { useEffect } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

import { widgets as defaultWidgets } from './widgets';
import FRCore from './form-core';

import { Provider, createStore } from './form-core/store/createStore';


// import schema from './schema-mock';

export { useForm } from './form-core/useForm';
export { default as connectForm } from './form-core/connect-form';
export { createWidget } from './form-core/create-widget';
export { mapping } from './render-core/mapping';
export { widgets } from './widgets';

import { validateMessagesEN, validateMessagesCN } from './form-core/validateMessage';

const Main = props => {
  const { configProvider, widgets, form, schema, validateMessages, ...otherProps } = props;

  if (!form) {
    console.warn('Please provide a form instance to FormRender');
    return null;
  }
  return (
    <ConfigProvider locale={zhCN} {...configProvider} form={{ validateMessages: { ...validateMessagesCN, ...validateMessages } }}>
      <Provider createStore={createStore}>
        <FRCore
          form={form}
          widgets={{ ...defaultWidgets, ...widgets }}
          {...otherProps}
          schema={schema}
        />
      </Provider>
      
    </ConfigProvider>
  );
};

export default Main;
