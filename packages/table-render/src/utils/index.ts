import dayjs from 'dayjs';

function stringContains(str, text) {
  return str.indexOf(text) > -1;
}

export const isObj = a =>
  stringContains(Object.prototype.toString.call(a), 'Object');

const isApiString = str => {
  if (typeof str !== 'string') return false;
  if (str.indexOf('$api.') === 0 || str.indexOf('$func.') === 0) return true;
  return false;
};

const getApiName = str => {
  if (str.indexOf('$api.') === 0) return str.substring(5);
  if (str.indexOf('$func.') === 0) return str.substring(6);
  return '';
};

export const buildSchema = (schema, api) => {
  if (typeof schema !== 'object' || schema === null) {
    if (isApiString(schema)) {
      const apiName = getApiName(schema);
      if (api && api[apiName] && typeof api[apiName] === 'function') {
        return api[apiName];
      } else {
        return () => {
          console.error('没有找到匹配的函数');
        };
      }
    }
    return schema;
  }
  if (Array.isArray(schema)) {
    const result = [...schema];
    return result.map(item => buildSchema(item, api));
  }
  // 剩下是 result 是对象的情况
  const result = { ...schema };
  const keys = Object.keys(result);
  keys.forEach(key => {
    result[key] = buildSchema(result[key], api);
  });
  return result;
};

export const getDateTime = time => {
  if (!time) return null;
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss');
};
export const getDate = time => {
  if (!time) return null;
  return dayjs(time).format('YYYY-MM-DD');
};

// 格式化千分符
export const getMoneyType = (num: any) => {
  if (!num) return null;
  return `¥${num}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

// 如果是函数，则解析，如果不是，直接返回值
export const parseFunctionValue = (value, params, cb) => {
  let _value = value;
  if (typeof _value === 'function') {
    _value = _value(params);
  } else {
    cb && typeof cb === 'function' && cb();
  }
  return _value;
};





import { set, get, cloneDeep, has, merge, isUndefined, omitBy } from 'lodash-es';

export const _set = set;
export const _get = get;
export const _cloneDeep = cloneDeep;
export const _has = has;
export const _merge = merge;
export const _isUndefined = isUndefined;
export const _omitBy = omitBy;

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
  return schema?.type === 'object' && schema.properties && !schema.widget;
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

export const valueRemoveUndefined = (values: any) => {

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

    result = omitBy(result, isUndefined);

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
        data[key] = recursionArray(item);
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



