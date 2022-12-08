import React from 'react';
import { Form, ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

import { widgets as defaultWidgets } from './widgets';
import FRCore from './form-core';

const { useForm } = Form;

export { useForm };
export { default as connectForm } from './form-core/connect-form';
export { createWidget } from './form-core/create-widget';
export { default as mapping } from './form-core/mapping';
export { defaultWidgets as widgets };


const FR = (props) => {
  const { configProvider, ...otherProps } = props;

  return (
    <ConfigProvider 
      locale={zhCN} 
      {...configProvider}
    >
			<FRCore widgets={{ ...defaultWidgets, ...widgets }} {...otherProps} />
    </ConfigProvider>
  );
}

export default FR;





