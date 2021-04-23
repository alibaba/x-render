import dayjs from 'dayjs';
import {ColumnsType} from "antd/lib/table";
import {useTable} from "./hooks";
import {TableColumnType} from "antd";
import {ColumnGroupType} from "antd/lib/table";
import {ColumnsState} from "@/typing";

function stringContains(str, text) {
  return str.indexOf(text) > -1;
}

export const isObj = a => stringContains(Object.prototype.toString.call(a), 'Object');

const isApiString = str => {
  if (typeof str !== 'string') return false;
  if (str.indexOf('$api.') === 0 || str.indexOf('$func.') === 0) return true;
  return false;
};

const getApiName = str => {
  if (str.indexOf('$api.') === 0) return str.substring(5);
  if (str.indexOf('$func.') === 0) return str.substring(6);
  return '';
};

export const buildSchema = (schema, api) => {
  if (typeof schema !== 'object' || schema === null) {
    if (isApiString(schema)) {
      const apiName = getApiName(schema);
      if (api && api[apiName] && typeof api[apiName] === 'function') {
        return api[apiName];
      } else {
        return () => {
          console.error('没有找到匹配的函数');
        };
      }
    }
    return schema;
  }
  if (Array.isArray(schema)) {
    const result = [...schema];
    return result.map(item => buildSchema(item, api));
  }
  // 剩下是 result 是对象的情况
  const result = {...schema};
  const keys = Object.keys(result);
  keys.forEach(key => {
    result[key] = buildSchema(result[key], api);
  });
  return result;
};

export const getDateTime = time => dayjs(time).format('YYYY-MM-DD HH:mm');
export const getDate = time => dayjs(time).format('YYYY-MM-DD');

// 格式化千分符
export const getMoneyType = num => `¥${num}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

// 如果是函数，则解析，如果不是，直接返回值
export const parseFunctionValue = (value, params, cb) => {
  let _value = value;
  if (typeof _value === 'function') {
    _value = _value(params);
  } else {
    cb && typeof cb === 'function' && cb();
  }
  return _value;
};

/**
 * 根据 key 和 dataIndex 生成唯一 id
 *
 * @param key 用户设置的 key
 * @param dataIndex 在对象中的数据
 * @param index 序列号，理论上唯一
 */
export const genColumnKey = (key?: React.ReactText | string, index?: number): string => {
  if (key) {
    return Array.isArray(key) ? key.join('-') : key.toString();
  }
  return `${index}`;
};


/**
 * 转化 columns 到 pro 的格式 主要是 render 方法的自行实现
 *
 * @param props
 */
export function genProColumnToColumn(props: {
  columns: ColumnsType,
  columnsMap: Record<string, ColumnsState>,
}): (TableColumnType<any> & { index?: number })[] {
  const {columns, columnsMap} = props;
  return (columns.map((columnProps: any, columnsIndex: number) => {
    const {key, valueEnum, valueType = 'text', children,} = columnProps
    const columnKey = genColumnKey(key, columnsIndex);
    const config = columnsMap[columnKey] || {fixed: columnProps.fixed};

    // 这些都没有，说明是普通的表格不需要 pro 管理
    const noNeedPro = !valueEnum && !valueType && !children;
    if (noNeedPro) {
      return {
        index: columnsIndex,
        ...columnProps,
      };
    }
    const tempColumns = {
      index: columnsIndex,
      ...columnProps,
      valueEnum,
      fixed: config.fixed,
      width: columnProps.width || (columnProps.fixed ? 200 : undefined),
      ellipsis: false,
    };
    return omitUndefinedAndEmptyArr(tempColumns);
  }) as (TableColumnType<any> & {
    index?: number;
  })[])
}


const omitUndefinedAndEmptyArr = <T>(obj: T): T => {
  const newObj = {} as T;
  Object.keys(obj || {}).forEach((key) => {
    if (Array.isArray(obj[key]) && obj[key]?.length === 0) {
      return;
    }
    if (obj[key] === undefined) {
      return;
    }
    newObj[key] = obj[key];
  });
  return newObj;
};


export const columnSort = (columnsMap: Record<string, ColumnsState>) => (a: any, b: any) => {
  const {fixed: aFixed, index: aIndex} = a;
  const {fixed: bFixed, index: bIndex} = b;
  if ((aFixed === 'left' && bFixed !== 'left') || (bFixed === 'right' && aFixed !== 'right')) {
    return -2;
  }
  if ((bFixed === 'left' && aFixed !== 'left') || (aFixed === 'right' && bFixed !== 'right')) {
    return 2;
  }
  // 如果没有index，在 dataIndex 或者 key 不存在的时候他会报错
  const aKey = a.key || `${aIndex}`;
  const bKey = b.key || `${bIndex}`;
  if (columnsMap[aKey]?.order || columnsMap[bKey]?.order) {
    return (columnsMap[aKey]?.order || 0) - (columnsMap[bKey]?.order || 0);
  }
  return (a.index || 0) - (b.index || 0);
};

// 复制fast-deep-equal包的equal函数
// tools/form-render_v0.x/lib/base/utils.js:68 也有一个deepEqual函数，替换？
function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }


    if ((a instanceof Map) && (b instanceof Map)) {
      if (a.size !== b.size) return false;
      for (i of a.entries())
        if (!b.has(i[0])) return false;
      for (i of a.entries())
        if (!equal(i[1], b.get(i[0]))) return false;
      return true;
    }

    if ((a instanceof Set) && (b instanceof Set)) {
      if (a.size !== b.size) return false;
      for (i of a.entries())
        if (!b.has(i[0])) return false;
      return true;
    }

    if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      // @ts-ignore
      length = a.length;
      // @ts-ignore
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (a[i] !== b[i]) return false;
      return true;
    }


    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      var key = keys[i];

      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a !== a && b !== b;
};

export const isDeepEqual: (a: any, b: any) => boolean = equal
