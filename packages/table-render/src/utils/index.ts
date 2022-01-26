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

export const getDateTime = time => dayjs(time).format('YYYY-MM-DD HH:mm');
export const getDate = time => dayjs(time).format('YYYY-MM-DD');

// 格式化千分符
export const getMoneyType = num =>
  `¥${num}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

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
