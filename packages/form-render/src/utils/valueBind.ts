import { get, set, unset } from 'lodash-es';
import {
  _cloneDeep,
  isArray,
  cleanEmpty,
  isObject,
  removeEmptyItemFromList,
  removeHiddenFromResult,
} from './index';

const isMultiBind = (binds: string[]) => isArray(binds) && binds.every(item => typeof item === 'string');




import { removeVoidFromResult } from './void';
// 提交前需要先处理formData的逻辑
export const processData = (data, flattenSchema, removeHiddenData) => {
  let _data = _cloneDeep(data);
  // 1. 去掉 hidden = true 的元素
  if (removeHiddenData) {
    _data = removeHiddenFromResult(data, flattenSchema);
  }

  // 1.5. 去掉 void 元素
  _data = removeVoidFromResult(_data);

  // 2. bind 的处理
  _data = transformDataWithBind(_data, flattenSchema);

  // 3. 去掉list里面所有的空值
  _data = removeEmptyItemFromList(_data);

  // 4. 去掉所有的 undefined
  _data = cleanEmpty(_data);
  return _data;
};

export const transformDataWithBind = (data, flattenSchema) => {
  let _data = data;
  const unbindKeys = [];
  const bindKeys = [];
  const bindArrKeys = [];

  const isMultiBind = bind =>
    Array.isArray(bind) && bind.every(item => typeof item === 'string');

  Object.keys(flattenSchema).forEach(key => {
    const bind =
      flattenSchema[key] && flattenSchema[key].schema && flattenSchema[key].schema.bind;
    const _key = key.replace('[]', '');
    if (bind === false) {
      unbindKeys.push(_key);
    } else if (typeof bind === 'string') {
      bindKeys.push({ key: _key, bind });
    } else if (isMultiBind(bind)) {
      bindArrKeys.push({ key: _key, bind });
    }
  });

  const handleBindData = formData => {
    unbindKeys.forEach(key => {
      unset(formData, key); // TODO: maybe removing upper structure
    });
    bindKeys.forEach(item => {
      const { key, bind } = item;
      let temp = get(formData, key);
      const oldVal = get(formData, bind);
      if (isObject(oldVal)) {
        temp = { ...oldVal, ...temp };
      }
      set(formData, bind, temp);
      unset(formData, key);
    });
    bindArrKeys.forEach(item => {
      const { key, bind } = item;
      const temp = get(formData, key);
      unset(formData, key);
      if (Array.isArray(temp)) {
        temp.forEach((t, i) => {
          if (bind[i]) {
            set(formData, bind[i], t);
          }
        });
      }
    });
  };
  handleBindData(_data);
  return _data;
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
