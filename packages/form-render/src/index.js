import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import React from 'react';
import FRCore from './form-render-core/src';
import { widgets as defaultWidgets } from './widgets/antd';

export {
  connectForm,
  createWidget,
  mapping,
  useForm,
} from './form-render-core/src';

export { defaultWidgets as widgets };
const FR = ({ widgets, configProvider, ...rest }) => {
  return (
    <ConfigProvider locale={zhCN} {...configProvider}>
      <FRCore widgets={{ ...defaultWidgets, ...widgets }} {...rest} />
    </ConfigProvider>
  );
};

export default FR;
