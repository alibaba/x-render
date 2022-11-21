import { cloneDeep } from 'lodash-es';
import { dataToKeys } from './utils';

// a.b => a.b
// $volid_1.b => b
// $void_1 => undefined
export function getRealDataPath(path) {
  if (typeof path !== 'string') {
    throw Error(`id ${id} is not a string!!! Something wrong here`);
  }

  if (path.match(/[$]void_[^.]+$/)) {
    return undefined;
  }

  return path.replace(/[$]void_[^.]+./g, '');
}

export function getRealDataFlatten(flatten) {
  // 处理 $void_xxx
  const flatten2 = { ...flatten };
  for (let key of Object.keys(flatten2)) {
    const newKey = key.replace(/[$]void_[^.]+\b[.]?/g, '');
    if (newKey !== key) {
      const oldValue = flatten2[key];
      delete flatten2[key];
      if (newKey !== '') {
        flatten2[newKey] = oldValue;
      }
    }
  }
  return flatten2;
}

export function removeVoidFromResult(data) {
  const result = cloneDeep(data);
  const keys = dataToKeys(result);
  keys.forEach(key => {
    if (key.match(/[$]void_[^.]+$/)) {
      delete result[key];
    }
  });
  return result;
}
