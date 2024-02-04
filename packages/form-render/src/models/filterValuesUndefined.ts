import { isUndefined, omitBy } from 'lodash-es';
import { isObject, isArray } from '../utils';

export default (values: any, notFilter?: boolean) => {
  const recursiveArray = (list: any[]) => {
    let result = list.map(item => {
      if (isObject(item)) {
        return recursiveObj(item, false);
      }
      if (isArray(item)) {
        return recursiveArray(item);
      }
      return item;
    });
    if (Object.keys(result).length === 0) {
      return undefined;
    }
    return result;
  };

  const recursiveObj = (_obj: any, filter = true) => {
    if (_obj._isAMomentObject) {
      return _obj;
    }

    let obj =  omitBy(_obj, isUndefined);
    Object.keys(obj).forEach(key => {
      const item = obj[key];

      if (isObject(item)) {
        obj[key] = recursiveObj(item);
      }

      if (isArray(item)) {
        const data = recursiveArray(item);
        obj[key] = data;
        if (!notFilter && data) {
          obj[key] = data.filter((item: any) => item !== undefined);
        }
      }
    });

    obj = omitBy(obj, isUndefined);
    if (Object.keys(obj).length === 0 && filter) {
      return undefined;
    }
    return obj;
  };
 
  return recursiveObj(values) || {};
};