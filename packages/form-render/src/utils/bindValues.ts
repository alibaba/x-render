import { get, set, unset } from 'lodash-es';
import {
  _cloneDeep,
  isArray,
  isObject,
} from './index';

const isMultiBind = (binds: string[]) => isArray(binds) && binds.every(item => typeof item === 'string');

export const parseValuesWithBind = (_values: any, flattenSchema: any) => {
  const values = _values;

  Object.keys(flattenSchema).forEach(_key => {
    const bindPath = flattenSchema[_key]?.schema?.bind;
    const key = _key.replace('[]', '');

    if (bindPath === false) {
      unset(values, key); 
    } else if (typeof bindPath === 'string') {
      let temp = get(values, key);
      const current = get(values, bindPath);
      if (isObject(current)) {
        temp = { ...current, ...temp };
      }
      set(values, bindPath, temp);
      unset(values, key);
    } else if (isMultiBind(bindPath)) {
     
      const temp = get(values, key);
      unset(values, key);
      if (Array.isArray(temp)) {
        temp.forEach((value, index) => {
          if (bindPath[index]) {
            set(values, bindPath[index], value);
          }
        });
      }
    }
  });

  return values;
};

export const transformValueBind = (_values: any, flattenSchema: any) => {
  const values = _cloneDeep(_values);
  Object.keys(flattenSchema).forEach(_key => {
    const bindPath = flattenSchema[_key]?.schema?.bind;
    const key = _key.replace('[]', '');

    if (typeof bindPath === 'string') {
      let temp = get(values, bindPath);
      // 如果已经有值了，要和原来的值合并，而不是覆盖
      const current = get(values, key);
      if (isObject(current)) {
        temp = { ...current, ...temp };
      }
      set(values, key, temp);
      unset(values, bindPath);
    } else if (isMultiBind(bindPath)) {
      const bindValueList = [];
      bindPath.forEach((itemPath: string) => {
        const value = get(values, itemPath);
        if (value !== undefined) {
          bindValueList.push(value);
        }
        unset(values, itemPath);
      });

      if (bindValueList.length > 0) {
        set(values, key, bindValueList);
      }
    }
  });

  return values;
};
