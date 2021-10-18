import FRCore from '../../form-render-core/src';
import { widgets as defaultWidgets } from './widgets/antd';
import { mapping as defaultMapping } from './mapping';

export { defaultWidgets as widgets, defaultMapping as mapping };
export { useForm, connectForm, createWidget } from '../../form-render-core/src';

const FR = (props = {}) => {
  return <FRCore {...props} />;
};

export default FR;
