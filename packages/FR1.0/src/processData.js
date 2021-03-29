import { removeEmptyItemFromList } from './utils';
import { unset } from 'lodash';
// 提交前需要先处理formData的逻辑
export const processData = data => {
  let _data = JSON.parse(JSON.stringify(data));
  // 1. bind = false 的处理
  const unbindKeys = Object.keys(flatten)
    .map(key => {
      const bind =
        flatten[key] && flatten[key].schema && flatten[key].schema.bind;
      if (bind === false) {
        return key;
      }
      return undefined;
    })
    .filter(key => !!key);
  const removeUnbindData = _data => {
    unbindKeys.forEach(key => {
      if (key.indexOf('[]') === -1) {
        _data = unset(_data, key); // TODO: 光remove了一个key，如果遇到remove了那个key上层的object为空了，object是不是也要去掉。。。不过感觉是伪需求
      } else {
        // const keys = key.split('[]').filter(k => !!k);
        // TODO: 贼复杂，之后写吧
      }
    });
  };
  removeUnbindData(_data);
  // 2. 去掉list里面所有的空值
  _data = removeEmptyItemFromList(_data);

  return _data;
};
