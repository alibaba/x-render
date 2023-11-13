import { set, get, cloneDeep, has, merge, isUndefined, omitBy, mergeWith, some } from 'lodash-es';

export const _set = set;
export const _get = get;
export const _cloneDeep = cloneDeep;
export const _has = has;
export const _merge = merge;
export const _isUndefined = isUndefined;
export const _omitBy = omitBy;
export const _mergeWith = mergeWith;

// 首字母转大写
const strToUpperCase = (str: string) => {
  if (!str) {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// 首字母转小写
const strToLowerCase = (str: string) => {
  if (!str) {
    return '';
  }
  return str.charAt(0).toLowerCase() + str.slice(1);
}

export const isObject = (data: any) => {
  const str = Object.prototype.toString.call(data);
  return str.indexOf('Object') > -1;
}

export const isArray = (data: any) => {
  const str = Object.prototype.toString.call(data);
  return str.indexOf('Array') > -1;
}

export const isFunction = (data: any) => typeof data === 'function';

export function isUrl(string: string) {
  const protocolRE = /^(?:\w+:)?\/\/(\S+)$/;
  // const domainRE = /^[^\s\.]+\.\S{2,}$/;
  if (typeof string !== 'string') return false;
  return protocolRE.test(string);
}

export const isNumber = (str: string | number) => !isNaN(Number(str))

export const getArray = (arr, defaultValue = []) => {
  if (Array.isArray(arr)) return arr;
  return defaultValue;
};

export function getFormat(format) {
  let dateFormat;
  switch (format) {
    case 'date':
      dateFormat = 'YYYY-MM-DD';
      break;
    case 'time':
      dateFormat = 'HH:mm:ss';
      break;
    case 'dateTime':
      dateFormat = 'YYYY-MM-DD HH:mm:ss';
      break;
    case 'week':
      dateFormat = 'YYYY-w';
      break;
    case 'year':
      dateFormat = 'YYYY';
      break;
    case 'quarter':
      dateFormat = 'YYYY-Q';
      break;
    case 'month':
      dateFormat = 'YYYY-MM';
      break;
    default:
      // dateTime
      if (typeof format === 'string') {
        dateFormat = format;
      } else {
        dateFormat = 'YYYY-MM-DD';
      }
  }
  return dateFormat;
}

// TODO: to support case that item is not an object
export function isObjType(schema: any) {
  //return schema?.type === 'object' && schema.properties && !schema.widget;
  return schema?.type === 'object' && schema.properties;
};

export function isListType(schema: any) {
  return schema?.type === 'array' && isObjType(schema?.items) && schema?.enum === undefined;
};

export function isCheckBoxType(schema, readOnly) {
  if (readOnly) return false;
  if (schema.widget === 'checkbox') return true;
  if (schema && schema.type === 'boolean') {
    if (schema.enum) return false;
    if (schema.widget === undefined) return true;
    return false;
  }
}

export const valueRemoveUndefined = (values: any, notFilter?: boolean) => {
  const recursionArray = (list: any[]) => {
    let result = list.map(item => {
      if (isObject(item)) {
        return recursionObj(item);
      }

      if (isArray(item)) {
        return recursionArray(item);
      }
      
      return item;
    });

    // 数组会变成对象，感觉 underfined 不能剔除，会影响顺序
    // result = omitBy(result, isUndefined);

    if (Object.keys(result).length === 0) {
      return undefined;
    }
    return result;
  };
 
  const recursionObj = (_data: any) => {
    let data =  omitBy(_data, isUndefined);

    Object.keys(data).forEach(key => {
      const item = data[key];
      if (isObject(item)) {
        data[key] = recursionObj(item);
      }

      if (isArray(item)) {
        const result = recursionArray(item) || [];
        data[key] = notFilter ? result : result.filter((item: any) => item !== undefined);
      }
    });

    data = omitBy(data, isUndefined);

    if (Object.keys(data).length === 0) {
      return undefined;
    }
    return data;
  }

  return recursionObj(values) || {};
}

export const translation = (configCtx: any) => (key: string) => {
  const locale = configCtx?.locale.FormRender;
  return locale[key];
}

export const warn = (str:string, ...args: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.error('[form-render-mobile]:', str, ...args);
  }
}

export const getWidget = (widgets: any, widgetName: string, schema: any, readOnly?: boolean) => {
  let widget = widgets[strToLowerCase(widgetName)];
  if (!widget) {
    widget = widgets[strToUpperCase(widgetName)];
  }

  if (!widget) {
    widget = widgets['Html'] || widgets['html'];
    if (!readOnly) {
      warn(`Can not find widget component named ${widgetName}, please check the schema and widgets`, schema);
    }
  }

  return widget || null;
}

export const hasFuncProperty = (obj: any) => {
  return some(obj, (value) => {
    if (isFunction(value)) {
      return true;
    }
    if (isObject(value)) {
      return hasFuncProperty(value);
    }
    return false;
  });
};

