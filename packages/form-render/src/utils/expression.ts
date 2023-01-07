import { get } from 'lodash-es';
import { isObject, _cloneDeep } from './index';

export const isExpression = (str: string) => {
  if (typeof str !== 'string') {
    return false;
  }
  
  const pattern = /^{\s*{(.+)}\s*}$/;
  const reg1 = /^{\s*{function\(.+}\s*}$/;

  return str.match(pattern) && !str.match(reg1);
}

export const isHasExpression = (schema: any) => {
  const result = Object.keys(schema).some((key: string) => {
    const item = schema[key];

    // 子协议不做递归确认
    if (key === 'properties') {
      return false;
    }

    if (isObject(item)) {
      return isHasExpression(item);
    }

    return isExpression(item);
  });

  return result;
};


export const parseExpression = (func: any, formData = {}, parentPath: string) => {
  const parentData = get(formData, parentPath) || {};

  if (typeof func === 'string') {
    const funcBody = func.replace(/^{\s*{/g, '').replace(/}\s*}$/g, '');

    const funcStr = `
      return ${funcBody
        .replace(/formData/g, JSON.stringify(formData))
        .replace(/rootValue/g, JSON.stringify(parentData))}
    `;

    try {
      return Function(funcStr)();
    } catch (error) {
      console.log(error, func, parentPath);
      return null; // 如果计算有错误，return null 最合适
    }
  } 
  
  return func;
}




export function getRealDataPath(path) {
  if (typeof path !== 'string') {
    throw Error(`id ${path} is not a string!!! Something wrong here`);
  }

  if (path.match(/[$]void_[^.]+$/)) {
    return undefined;
  }

  return path.replace(/[$]void_[^.]+./g, '');
}

export function getValueByPath(formData, path) {
  if (path === '#' || !path) {
    return formData || {};
  } else if (typeof path === 'string') {
    const realPath = getRealDataPath(path);
    return realPath && get(formData, realPath);
  } else {
    console.error('path has to be a string');
  }
}


export const parseAllExpression = (_schema: any, formData: any, dataPath: string) => {
  const schema = _cloneDeep(_schema);

  Object.keys(schema).forEach(key => {
    const value = schema[key];

    if (isObject(value)) {
      schema[key] = parseAllExpression(value, formData, dataPath);
    } else if (isExpression(value)) {
      schema[key] = parseExpression(value, formData, dataPath);
    } else if (
      typeof key === 'string' &&
      key.toLowerCase().indexOf('props') > -1
    ) {
      // 有可能叫 xxxProps
      const propsObj = schema[key];
      if (isObject(propsObj)) {
        Object.keys(propsObj).forEach(k => {
          schema[key][k] = parseExpression(
            propsObj[k],
            formData,
            dataPath
          );
        });
      }
    }
  });
  return schema;
};

