import { get, set, unset, assignIn } from 'lodash-es';
import {
  _cloneDeep,
  isArray,
  isObject,
} from '../utils/index';

const isMultiBind = (array: string[]) => isArray(array) && array.every(item => typeof item === 'string');

// Need to consider list nested controls
const transformPath = (path: string) => {
  const result: string[] = [];

  const recursion = (str: string) => {
    const index = str.indexOf('[]');
    if (index === -1) {
      result.push(str);
      return;
    }
    result.push(str.substring(0, index));
    recursion(str.substring(index+3))
  };

  recursion(path);

  if (result.length === 1) {
    return result[0];
  }
  return result;
};

// 将 formData 数据按照 bind 配置进行转换
const transformValuesToBind = (data: any, path: any, bind: false | string | string[], parentPath?: string) => {
  // 配置 bind = false，在表单提交的时候可以将数据从 formData 中移除
  if (bind === false) {
    unset(data, path);
    return;
  } 

  // bind: string
  if (typeof bind === 'string') {
    let value = get(data, path);
    const preValue = get(data, bind === 'parent' ? parentPath : bind);
    if (isObject(preValue)) {
      value = { ...preValue, ...value };
    }

    // 更新数据
    if (bind === 'root' || parentPath === '#') { // 数据绑定到根节点
      assignIn(data, value)
    } else if (bind === 'parent') { // 数据绑定到父节点
      set(data, parentPath, value);
    } else { // 数据绑定到指定节点
      set(data, bind, value);
    }

    // 移除原数据
    unset(data, path);
    return;
  } 
  
  // bind: string[], 例如：bind: ['obj.startDate', 'obj.endDate'],
  // 结果  [startDate, endDate] => {obj: { startDate, endDate }}
  if (isMultiBind(bind)) {
    const value = get(data, path);
    unset(data, path);

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        const bindPath = bind[index];
        bindPath && set(data, bindPath, item);
      });
    }
  }
};

// 按照 Bind 配置还原 formData 数据
const transformBindToValue = (data: any, path: any, bind: false | string | string[], item?:any) => {
  // bind: false 不用处理
  if (bind === false) {
    return;
  }

  // bind: string
  if (typeof bind === 'string') {
    let value = get(data, bind) ;
    const preValue = get(data, path);

    if (item?.children?.length > 0) {
      value = { ...preValue, ...value };
      let obj = null;
      if (bind === 'root' || item.parent === '#') {
        obj = data;
      } else if (bind === 'parent') {
        obj = get(data, item.parent);
      }

      item.children.forEach((item: any) => {
        const list = item.split('.');
        const key = list[list.length-1];
        if (isObject(value[key])) {
          value[key] = {
            ...value?.[key],
            ...obj?.[key]
          }
        } else if (!!obj) {
          value[key] = obj[key];
        }
      })
    } else if (isObject(preValue)) {
      value = { ...preValue, ...value };
    }
    set(data, path, value);
    unset(data, bind);
    return;
  } 
  
  // The array is converted to multiple fields.
  if (isMultiBind(bind)) {
    const value = [];
    bind.forEach(key => {
      const bindValue = get(data, key);
      // if (bindValue != undefined) {
      //   value.push(bindValue);
      // }
      value.push(bindValue);
      unset(data, key);
    });

    if (value.length > 0) {
      set(data, path, value);
    }
  }
}

// 转换表单数据
export const parseValuesToBind = (values: any, flatten: any) => {
  // console.log(values, flatten, 'parseValuesToBind');
  // No bind field exists, no processing
  if (!JSON.stringify(flatten).includes('bind')) {
    return values;
  }
  const data = _cloneDeep(values);

  const dealFieldList = (obj: any, [path, ...rest]: any, bind: any, ) => {
    if (rest.length === 1) {
      const list = get(obj, path, []);
      list.forEach((item: any, index: number) => {
        const value = get(item, rest[0]);
        if (bind === 'root') {
          list[index] = value;
          return;
        }
        transformValuesToBind(item, rest[0], bind);
      });
    }

    if (isArray(obj)) {
      obj.forEach((item: any) => dealFieldList(item, [path, ...rest], bind));
    } else if (isObject(obj)) {
      const value = get(obj, path);
      dealFieldList(value, rest, bind);
    }
  };
 
  Object.keys(flatten).forEach(key => {
    const bind = flatten[key]?.schema?.bind;
    const parentPath = flatten[key]?.parent;
    if (bind === undefined) {
      return;
    }
    const path = transformPath(key);
    isArray(path) ? dealFieldList(data, path, bind) : transformValuesToBind(data, path, bind, parentPath);
  });

  return data;
};

// 还原表单数据
export const parseBindToValues = (values: any, flatten: any) => {
  console.log(values, flatten, 'parseBindToValues');
  // No bind field exists, no processing
  if (!JSON.stringify(flatten).includes('bind')) {
    return values;
  }
  const data = _cloneDeep(values);

  const dealFieldList = (obj: any, [path, ...rest]: any, bind: any) => {
    if (rest.length === 1) {
      const list = get(obj, path, []);
      list.forEach((item: any, index: number) => {
        if (bind === 'root') {
          list[index] = { [rest[0]] : item };
          return;
        }
        transformBindToValue(item, rest[0], bind);
      });
    }

    if (isArray(obj)) {
      obj.forEach((item: any) => dealFieldList(item, [path, ...rest], bind));
    } else if (isObject(obj)) {
      const value = get(obj, path);
      dealFieldList(value, rest, bind);
    }
  };

  Object.keys(flatten).forEach(key => {
    const item = flatten[key];
    const bind = item.schema?.bind;
    if (bind === undefined) {
      return;
    }
    const path = transformPath(key);
    isArray(path) ? dealFieldList(data, path, bind) : transformBindToValue(data, path, bind, item);
  });

  return data;
};


