
import { isObject, isArray, _get } from '../utils';


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

export const getSchemaFullPath = (path: string, schema: any) => {
  if (!path || !path.includes('.')) {
    return 'properties.' + path;
  }

  // 补全 list 类型 path 路径
  while(path.includes('[]')) {
    const index = path.indexOf('[]');
    path = path.substring(0, index) + '.items' + path.substring(index + 2);
  }

  // 补全 object 类型 path 路径
  let result = 'properties';
  (path.split('.')).forEach(item => {
    const key = result + '.' + item;
    const itemSchema = _get(schema, key, {});

    if (itemSchema?.type === 'object') {
      result = key + '.properties';
      return ;
    }
    result = key;
  });

  return result;
};