import { isObject, isArray } from '../utils';

const transformHidden = (str: any, formData = {}, parentData = {}) => {
  if (typeof str !== 'string') {
    return !!str;
  }

  const funcBody = str.replace(/^{\s*{/g, '').replace(/}\s*}$/g, '').trim();
  const funcStr = `
    return ${funcBody
      .replace(/formData/g, JSON.stringify(formData))
      .replace(/rootValue/g, JSON.stringify(parentData))}
  `;
  try {
    const result = Function(funcStr)();
    return result;
  } catch (error) {
    return false;
  }
};

/**
 * 过滤 field.schema.hidden = true，的值
 */
export default (_values: any, flattenSchema: object) => {

  const recursiveArray = (list: any[], _path: string) => {
    return list.map(item => {
      if (isObject(item)) {
        return recursiveObj(item, _path, item);
      }
      return item;
    });
  };
  
  const recursiveObj = (obj: any, prePath?: string, parentData?: any) => {

    for (let key of Object.keys(obj)) {
      const item = obj[key];
      let path = prePath ? `${prePath}.${key}` : key;
      let schema = flattenSchema[path]?.schema;

      if (isArray(item) && !schema) {
        path = prePath ? `${prePath}.${key}[]` : `${key}[]`;
        schema = flattenSchema[path]?.schema;
      }

      // 剔除隐藏数据
      if (schema?.hidden) {
        const hidden = transformHidden(schema.hidden, _values, parentData);
        if (hidden) {
          obj[key] = undefined;
          continue;
        }
      }
      
      if (isObject(item)) {
        obj[key] = recursiveObj(item, path, parentData);
        continue;
      }
  
      if (isArray(item) && schema?.items) {
        obj[key] = recursiveArray(item, path) || [];
        continue;
      }

      obj[key] = item;
    }

    return obj;
  };
  
  return recursiveObj(_values) || {};
}