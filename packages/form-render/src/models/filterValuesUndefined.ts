import { isUndefined, omitBy } from 'lodash-es';
import { isObject, isArray } from '../utils';

export default (values: any, notFilter?: boolean) => {
  const recursiveArray = (list: any[]) => {
    const result = (list || []).map(item => {
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
 
  const recursiveObj = (obj: any, filter = true) => {
    let result = {};

    for (let key of Object.keys(obj)) {
      const item = obj[key];
      if (isObject(item)) {
        result[key] = recursiveObj(item);
        continue;
      }
      if (isArray(item)) {
        const data = recursiveArray(item);
        if (notFilter) {
          result[key] = data;
        } else {
          result[key] = (data || []).filter((item: any) => item !== undefined);
        }
        continue;
      }
      if (item !== undefined) {
        result[key] = item;
      }
    }

    result = omitBy(result, isUndefined);
    if (Object.keys(result).length === 0 && filter) {
      return undefined;
    }

    return result;
  };
 
  return recursiveObj(values) || {};
};