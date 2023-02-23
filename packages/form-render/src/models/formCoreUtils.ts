
import { isObject, isArray, _get, _has, isFunction } from '../utils';

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

export const immediateWatch = (watch: any, values: any) => {
  if (Object.keys(watch || {})?.length === 0) {
    return;
  }

  Object.keys(watch).forEach(path => {
    const value = _get(values, path);
    const watchItem = watch[path];

    if (watchItem?.immediate && isFunction(watchItem?.handler)) {
      try {
        watchItem.handler(value);
      } catch (error) {
        console.log(`${path}对应的watch函数执行报错：`, error);
      }
    }
  });
};

export const valuesWatch = (_changedValues: any, allValues: any, watch: any) => {
  if (Object.keys(watch || {})?.length === 0) {
    return;
  }

  const changedValues = {
    '#': allValues,
    ..._changedValues
  };

  Object.keys(watch).forEach(path => {
    if (!_has(changedValues, path)) {
      return;
    }
    const value = _get(changedValues, path);

    const watchItem = watch[path];
    

    if (isFunction(watchItem)) {
      try {
        watchItem(value);
      } catch (error) {
        console.log(`${path}对应的watch函数执行报错：`, error);
      }
    } 
    
    if (isFunction(watchItem?.handler)) {
      try {
        watchItem.handler(value);
      } catch (error) {
        console.log(`${path}对应的watch函数执行报错：`, error);
      }
    }
  });
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

export function yymmdd(timeStamp) {
  const date_ob = new Date(Number(timeStamp));
  const adjustZero = num => ('0' + num).slice(-2);
  let day = adjustZero(date_ob.getDate());
  let month = adjustZero(date_ob.getMonth());
  let year = date_ob.getFullYear();
  let hours = adjustZero(date_ob.getHours());
  let minutes = adjustZero(date_ob.getMinutes());
  let seconds = adjustZero(date_ob.getSeconds());
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function msToTime(duration) {
  let seconds: any = Math.floor((duration / 1000) % 60);
  let minutes: any = Math.floor((duration / (1000 * 60)) % 60);
  let hours: any = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  return hours + ':' + minutes + ':' + seconds;
}

export const getSessionItem = (key: string) => {
  return Number(sessionStorage.getItem(key) || 0);
}

export const setSessionItem = (key: string, data: any) => {
  sessionStorage.setItem(key, data +'');
}

