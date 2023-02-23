import FormCore from './form-core';
import withProvider from './withProvider';

export { widgets } from './widgets';
export { mapping } from './models/mapping';

export { default as useForm } from './models/useForm';
export { default as connectForm } from './form-core/connectForm';
export { default as SearchForm } from './derivative/SearchForm';

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