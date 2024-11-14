import FlowEditor from './FlowEditor';
import withProvider from './withProvider';
import * as defaultNodes from './nodes';
export { default as useForm } from './models/useForm';


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
  WidgetProps,
} from './type';

export default withProvider(FlowEditor, defaultNodes);
