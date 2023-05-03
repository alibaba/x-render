import FormCore from './form-core';
import withProvider from './withProvider';

export * as widgets from './widgets';

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
} from './type';

export default withProvider(FormCore);