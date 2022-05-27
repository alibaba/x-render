import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import FRCore from './form-render-core/src';
import { widgets as defaultWidgets } from './widgets/antd';

export {
  connectForm,
  createWidget,
  mapping,
  useForm,
} from './form-render-core/src';
export { default as jsserialize } from './serialize';
export { deserialize, serialize, serializeToDraft } from './utils';
export { defaultWidgets as widgets };

const FR = ({ widgets, configProvider, ...rest }) => {
  return (
    <ConfigProvider locale={zhCN} {...configProvider}>
      <FRCore widgets={{ ...defaultWidgets, ...widgets }} {...rest} />
    </ConfigProvider>
  );
};

export default FR;
