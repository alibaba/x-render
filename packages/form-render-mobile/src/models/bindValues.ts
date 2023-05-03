import { get, set, unset } from 'lodash-es';
import {
  _cloneDeep,
  isArray,
  isObject,
} from '../utils/index';

const isMultiBind = (array: string[]) => isArray(array) && array.every(item => typeof item === 'string');

// Need to consider list nested controls
const transformPath = (path: string) => {
  const result: string[] = [];

  const recursion = (str: string) => {
    const index = str.indexOf('[]');
    if (index === -1) {
      result.push(str);
      return;
    }
    result.push(str.substring(0, index));
    recursion(str.substring(index+3))
  };

  recursion(path);

  if (result.length === 1) {
    return result[0];
  }
  return result;
};

const transformValueToBind = (data: any, path: any, bind: false | string | string[]) => {
  if (bind === false) {
    unset(data, path);
    return;
  } 
  
  if (typeof bind === 'string') {
    let value = get(data, path);
    const preValue = get(data, bind);
    if (isObject(preValue)) {
      value = { ...preValue, ...value };
    }
    set(data, bind, value);
    unset(data, path);
    return;
  } 
  
  // The array is converted to multiple fields.
  if (isMultiBind(bind)) {
    const value = get(data, path);
    unset(data, path);

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        const bindPath = bind[index];
        bindPath && set(data, bindPath, item);
      });
    }
  }
}

const transformBindToValue = (data: any, path: any, bind: any) => {
  if (typeof bind === 'string') {
    let value = get(data, bind);
    const preValue = get(data, path);
    if (isObject(preValue)) {
      value = { ...preValue, ...value };
    }
    set(data, path, value);
    unset(data, bind);
    return;
  } 
  
  // The array is converted to multiple fields.
  if (isMultiBind(bind)) {
    const value = [];
    bind.forEach(key => {
      const bindValue = get(data, key);
      // if (bindValue != undefined) {
      //   value.push(bindValue);
      // }
      value.push(bindValue);
      unset(data, key);
    });

    if (value.length > 0) {
      set(data, path, value);
    }
  }
}


export const parseValuesToBind = (values: any, flatten: any) => {
  // No bind field exists, no processing
  if (!JSON.stringify(flatten).includes('bind')) {
    return values;
  }

  const data = _cloneDeep(values);

  const dealFieldList = (obj: any, [path, ...rest]: any, bind: any) => {
    if (rest.length === 1) {
      const list = get(obj, path, []);
      list.forEach((item: any, index: number) => {
        const value = get(item, rest[0]);
        if (bind === 'root') {
          list[index] = value;
          return;
        }
        transformValueToBind(item, rest[0], bind);
      });
    }

    if (isArray(obj)) {
      obj.forEach((item: any) => dealFieldList(item, [path, ...rest], bind));
    } else if (isObject(obj)) {
      const value = get(obj, path);
      dealFieldList(value, rest, bind);
    }
  };
 
  Object.keys(flatten).forEach(key => {
    const bind = flatten[key]?.schema?.bind;
    if (bind === undefined) {
      return;
    }
    const path = transformPath(key);
    isArray(path) ? dealFieldList(data, path, bind) : transformValueToBind(data, path, bind);
  });

  return data;
};

export const parseBindToValues = (values: any, flatten: any) => {
  if (!JSON.stringify(flatten).includes('bind')) {
    return values;
  }

  const data = _cloneDeep(values);
  const dealFieldList = (obj: any, [path, ...rest]: any, bind: any) => {
    if (rest.length === 1) {
      const list = get(obj, path, []);
      list.forEach((item: any, index: number) => {
        if (bind === 'root') {
          list[index] = { [rest[0]] : item };
          return;
        }
        transformBindToValue(item, rest[0], bind);
      });
    }

    if (isArray(obj)) {
      obj.forEach((item: any) => dealFieldList(item, [path, ...rest], bind));
    } else if (isObject(obj)) {
      const value = get(obj, path);
      dealFieldList(value, rest, bind);
    }
  };
 
  Object.keys(flatten).forEach(key => {
    const bind = flatten[key]?.schema?.bind;
    if (bind === undefined) {
      return;
    }
    const path = transformPath(key);

    isArray(path) ? dealFieldList(data, path, bind) : transformBindToValue(data, path, bind);
  });

  return data;
};