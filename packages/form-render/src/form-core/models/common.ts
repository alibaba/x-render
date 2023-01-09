
import { isObject, isArray } from '../../utils';

const displayTypeEnum = {
  column: 'vertical',
  row: 'horizontal',
  inline: 'inline',
};

export const transformProps =  (props: any) => {
  const {
    schema,
    beforeFinish,
    onMount,
    displayType,
    widgets,
    watch,
    removeHiddenData,
    readOnly,
    column,
    mapping,
    debugCss,
    locale,
    configProvider,
    allCollapsed,
    debounceInput,
    validateMessages,
    debug,
    id,
    labelWidth,

    form,
    onFinish,
    builtOperation,
    // labelAlign,
    // colon,
    // className,
    // style,
    // disabled,
    // scrollToFirstError,
    ...otherProps
  } = props;

  const formProps = {
    ...otherProps,
  };

  if (displayType) {
    formProps.layout = displayTypeEnum[displayType];
  }

  if (removeHiddenData !== undefined) {
    formProps.preserve = removeHiddenData;
  }

  return {
    formProps,
    schema,
    beforeFinish, // form 没有这个 api, 感觉找不到时机
    onMount,
    widgets,
    watch,
    readOnly,
    column,
    mapping,
    debugCss, // 好像没用了
    locale,
    configProvider,
    builtOperation,
    form,
    labelWidth,
    allCollapsed,
    debounceInput, // 好像没用了
    validateMessages,
    debug, // 换成 form 还有用吗？
    id,
  };
};

export const transformFieldsError = (_fieldsError: any) => {
  let fieldsError = _fieldsError;
  if (isObject(fieldsError)) {
    fieldsError = [fieldsError];
  }

  if (!(isArray(fieldsError) && fieldsError.length > 0)) {
    return;
  }

  return fieldsError.map((field: any) => ({ errors: field.error, ...field }));
};

export const valuesWatch = (changedValues: any, allValues: any, watch: any) => {
  if (Object.keys(watch || {})?.length === 0) {
    return;
  }
  const _changedValues = {
    '#': allValues,
    ...changedValues
  }

  const registerField = (watchKey: any, value: any, watch: any) => {
    const callBack = watch[watchKey];
    if (!callBack) {
      return;
    }

    if (typeof callBack === 'function') {
      try {
        callBack(value);
      } catch (error) {
        console.log(`${watchKey}对应的watch函数执行报错：`, error);
      }
    } 
    
    if (typeof callBack.handler === 'function') {
      try {
        callBack.handler(value);
      } catch (error) {
        console.log(`${watchKey}对应的watch函数执行报错：`, error);
      }
    }
  };

  Object.keys(_changedValues).forEach(key => registerField(key, _changedValues[key], watch))
};