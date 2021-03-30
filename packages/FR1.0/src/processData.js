import { removeEmptyItemFromList, getDataPath } from './utils';
import { unset, get, set } from 'lodash';
// 提交前需要先处理formData的逻辑
export const processData = (data, flatten) => {
  let _data = JSON.parse(JSON.stringify(data));
  // 1. bind = false 的处理
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
  console.log(unbindKeys, bindKeys, bindArrKeys);

  const handleBindData = formData => {
    unbindKeys.forEach(key => {
      if (key.indexOf('[]') === -1) {
        unset(formData, key); // TODO: 光remove了一个key，如果遇到remove了那个key上层的object为空了，object是不是也要去掉。。。不过感觉是伪需求
      } else {
        // const keys = key.split('[]').filter(k => !!k);
        // TODO: 贼复杂，之后写吧
      }
    });
    bindKeys.forEach(item => {
      const { key, bind } = item;
      if (key.indexOf('[]') === -1) {
        const temp = get(formData, key);
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
    // return formData
  };
  // 2. 其他 bind

  // if (schema && schema.bind) {
  //   if (typeof schema.bind === 'string') {
  //     dataPath = getDataPath(schema.bind, dataIndex);
  //   } else if (isMultiPaths) {
  //     dataPath = schema.bind.map(b => getDataPath(b, dataIndex));
  //   }
  // }
  handleBindData(_data);
  // 3. 去掉list里面所有的空值
  _data = removeEmptyItemFromList(_data);

  return _data;
};
