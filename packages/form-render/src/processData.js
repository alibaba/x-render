import { removeEmptyItemFromList, getDataPath } from './utils';
import { unset, get, set } from 'lodash';
import { isObject, clone } from './utils';
// 提交前需要先处理formData的逻辑
export const processData = (data, flatten) => {
  // 1. bind 的处理
  let _data = transformDataWithBind(data, flatten);

  // 2. 去掉list里面所有的空值
  _data = removeEmptyItemFromList(_data);

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
    if (bind === false) {
      unbindKeys.push(key);
    } else if (typeof bind === 'string') {
      bindKeys.push({ key, bind });
    } else if (isMultiBind(bind)) {
      bindArrKeys.push({ key, bind });
    }
  });

  const handleBindData = formData => {
    unbindKeys.forEach(key => {
      if (key.indexOf('[]') === -1) {
        unset(formData, key); // TODO: 光remove了一个key，如果遇到remove了那个key上层的object为空了，object是不是也要去掉。。。不过感觉是伪需求
      } else {
        // const keys = key.split('[]').filter(k => !!k);
        // TODO: list里的元素要bind，贼复杂，而且基本上用不到，之后写吧
      }
    });
    bindKeys.forEach(item => {
      const { key, bind } = item;
      if (key.indexOf('[]') === -1) {
        let temp = get(formData, key);
        // 如果已经有值了，要和原来的值合并，而不是覆盖
        const oldVal = get(formData, bind);
        if (isObject(oldVal)) {
          temp = { ...oldVal, ...temp };
        }
        set(formData, bind, temp);
        unset(formData, key);
      } else {
      }
    });
    bindArrKeys.forEach(item => {
      const { key, bind } = item;
      if (key.indexOf('[]') === -1) {
        const temp = get(formData, key);
        if (Array.isArray(temp)) {
          temp.forEach((t, i) => {
            if (bind[i]) {
              set(formData, bind[i], t);
            }
          });
        }
        unset(formData, key);
      } else {
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
    if (typeof bind === 'string') {
      bindKeys.push({ key, bind });
    } else if (isMultiBind(bind)) {
      bindArrKeys.push({ key, bind });
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
        temp.push(get(newData, b));
        unset(newData, b);
      });
      set(newData, key, temp);
    });
  };
  handleBindData2(_data);
  return _data;
};
