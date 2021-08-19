import {
  removeEmptyItemFromList,
  cleanEmpty,
  removeHiddenFromResult,
} from './utils';
import { unset, get, set } from 'lodash-es';
import { isObject, clone } from './utils';
// 提交前需要先处理formData的逻辑
export const processData = (data, flatten, removeHiddenData) => {
  // 1. bind 的处理
  let _data = transformDataWithBind(data, flatten);

  // 2. 去掉list里面所有的空值
  _data = removeEmptyItemFromList(_data);

  // 3. 去掉 hidden = true 的元素
  if (removeHiddenData) {
    _data = removeHiddenFromResult(_data, flatten);
  }

  // 4. 去掉所有的 undefined
  _data = cleanEmpty(_data);

  return _data;
};

export const transformDataWithBind = (data, flatten) => {
  let _data = clone(data);
  const unbindKeys = [];
  const bindKeys = [];
  const bindArrKeys = [];

  const isMultiBind = bind =>
    Array.isArray(bind) && bind.every(item => typeof item === 'string');

  Object.keys(flatten).forEach(key => {
    const bind =
      flatten[key] && flatten[key].schema && flatten[key].schema.bind;
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
      unset(formData, key); // TODO: 光remove了一个key，如果遇到remove了那个key上层的object为空了，object是不是也要去掉。。。不过感觉是伪需求
    });
    bindKeys.forEach(item => {
      const { key, bind } = item;
      let temp = get(formData, key);
      // 如果已经有值了，要和原来的值合并，而不是覆盖
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

// 反向，外部赋值formData，bind的字段要转换后赋值给formData
// 思路是一个个bind的字段反向转换 dataPath <=> bindPath
export const transformDataWithBind2 = (data, flatten) => {
  let _data = clone(data);

  const bindKeys = [];
  const bindArrKeys = [];

  const isMultiBind = bind =>
    Array.isArray(bind) && bind.every(item => typeof item === 'string');

  Object.keys(flatten).forEach(key => {
    const bind =
      flatten[key] && flatten[key].schema && flatten[key].schema.bind;
    const _key = key.replace('[]', '');
    if (typeof bind === 'string') {
      bindKeys.push({ key: _key, bind });
    } else if (isMultiBind(bind)) {
      bindArrKeys.push({ key: _key, bind });
    }
  });

  const handleBindData2 = newData => {
    bindKeys.forEach(item => {
      const { key, bind } = item;
      let temp = get(newData, bind);
      // 如果已经有值了，要和原来的值合并，而不是覆盖
      const oldVal = get(newData, key);
      if (isObject(oldVal)) {
        temp = { ...oldVal, ...temp };
      }
      set(newData, key, temp);
      unset(newData, bind);
    });
    bindArrKeys.forEach(item => {
      const { key, bind } = item;
      const temp = [];
      bind.forEach(b => {
        const bindValue = get(newData, b);
        if (bindValue !== undefined) {
          temp.push(bindValue);
        }
        unset(newData, b);
      });
      if (temp.length > 0) {
        set(newData, key, temp);
      }
    });
  };
  handleBindData2(_data);
  return _data;
};
