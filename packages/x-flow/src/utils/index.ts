import { customAlphabet } from 'nanoid';
import tinycolor from 'tinycolor2';
export const uuid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 16);
export const uuid4 = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 4);

import {
  has as _has,
  cloneDeep,
  get,
  isMatch,
  isNil,
  isUndefined,
  merge,
  mergeWith,
  omitBy,
  set,
  some,
} from 'lodash-es';

export const _set = set;
export const _get = get;
export const _cloneDeep = cloneDeep;
// export const _has = has;
export { _has };
export const _merge = merge;
export const _mergeWith = mergeWith;
export const _isUndefined = isUndefined;
export const _omitBy = omitBy;
export const _some = some;
export const _isMatch = isMatch;

export const isObject = (data: any) => {
  const str = Object.prototype.toString.call(data);
  return str.indexOf('Object') > -1;
};

export const isArray = (data: any) => {
  const str = Object.prototype.toString.call(data);
  return str.indexOf('Array') > -1;
};

export const isFunction = (data: any) => typeof data === 'function';

export function isUrl(string: string) {
  const protocolRE = /^(?:\w+:)?\/\/(\S+)$/;
  // const domainRE = /^[^\s\.]+\.\S{2,}$/;
  if (typeof string !== 'string') return false;
  return protocolRE.test(string);
}

export const isNumber = (str: string | number) => !isNaN(Number(str));

export const getArray = (arr, defaultValue = []) => {
  if (Array.isArray(arr)) return arr;
  return defaultValue;
};

export function getFormat(format) {
  let dateFormat;
  switch (format) {
    case 'date':
      dateFormat = 'YYYY-MM-DD';
      break;
    case 'time':
      dateFormat = 'HH:mm:ss';
      break;
    case 'dateTime':
      dateFormat = 'YYYY-MM-DD HH:mm:ss';
      break;
    case 'week':
      dateFormat = 'YYYY-w';
      break;
    case 'year':
      dateFormat = 'YYYY';
      break;
    case 'quarter':
      dateFormat = 'YYYY-Q';
      break;
    case 'month':
      dateFormat = 'YYYY-MM';
      break;
    default:
      // dateTime
      if (typeof format === 'string') {
        dateFormat = format;
      } else {
        dateFormat = 'YYYY-MM-DD';
      }
  }
  return dateFormat;
}

// TODO: to support case that item is not an object
export function isObjType(schema: any) {
  //return schema?.type === 'object' && schema.properties && !schema.widget;
  return (
    schema?.type === 'object' &&
    schema?.properties &&
    schema?.widgetType !== 'field'
  );
}

export function isListType(schema: any) {
  return (
    schema?.type === 'array' &&
    isObjType(schema?.items) &&
    schema?.enum === undefined
  );
}

export function isCheckBoxType(schema: any, readOnly: boolean) {
  if (readOnly) return false;
  if (schema.widget === 'checkbox') return true;
  if (schema && schema.type === 'boolean') {
    if (schema.enum) return false;
    if (schema.widget === undefined) return true;
    return false;
  }
}

export const translation = (configCtx: any) => (key: string) => {
  const locale = configCtx?.locale.FormRender;
  return locale[key];
};

export const hasFuncProperty = (obj: any) => {
  return _some(obj, value => {
    if (isFunction(value)) {
      return true;
    }
    if (isObject(value)) {
      return hasFuncProperty(value);
    }
    return false;
  });
};

/**
 * 安全地获取对象的值，如果值为 null 或 undefined，则返回 defaultValue。
 *
 * @param {Object} object - 要获取值的对象。
 * @param {string|Array} path - 要获取的路径，可以是字符串或数组。
 * @param {*} [defaultValue] - 如果值为 null 或 undefined，则返回 defaultValue。
 * @returns {*} - 返回获取的值，或者默认值。
 */
export const safeGet = (object: any, path: string, defaultValue: any) => {
  return get(object, path, defaultValue) ?? defaultValue;
};

export const isMac = () => {
  return navigator.userAgent.toUpperCase().includes('MAC');
};

const specialKeysNameMap: Record<string, string | undefined> = {
  ctrl: '⌘',
  alt: '⌥',
};

export const getKeyboardKeyNameBySystem = (key: string) => {
  if (isMac()) return specialKeysNameMap[key] || key;

  return key;
};

export const capitalize = (string: string) => {
  if (typeof string !== 'string' || string.length === 0) {
    return string;
  }
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
};

export const transformNodes = (nodes: any[]) => {
  return nodes?.map(item => {
    const { type, data, ...rest } = item;

    if (type === 'Switch' || type === 'Parallel') {
      return {
        type: 'custom',
        data: {
          ...data,
          _nodeType: type,
          ...(data?.list?.length && {
            list: (data?.list || [])?.map(n => {
              if (n?._id) {
                return n;
              } else {
                return { ...n, _id: `id_${uuid()}` };
              }
            }),
          }),
        },
        ...rest,
      };
    } else {
      return {
        type: 'custom',
        data: {
          ...data,
          _nodeType: type,
        },
        ...rest,
      };
    }
  });
};

export const transformSwitchNodes = (nodes: any[]) => {
  return (nodes || [])?.map(item => {
    if (item?.type === 'Switch' || item?.type === 'Parallel') {
      const { list, ...rest } = item?.data;
      return {
        ...item,
        data: {
          ...rest,
          list: (list || [])?.map(item => {
            if (item?._id) {
              return item;
            } else {
              return { ...item, _id: `id_${uuid()}` };
            }
          }),
        },
      };
    } else {
      return item;
    }
  });
};

// 废弃：
// export const getAntdVersion = () => {
//   const majorVersion = parseInt(antdVersion?.split('.')?.[0], 10);
//   if (majorVersion >= 5) {
//     return 'V5';
//   } else if (majorVersion === 4) {
//     return 'V4';
//   } else {
//     return 'V4';
//   }
// };

// 安全的JSON.stringify
export function safeJsonStringify(obj: Object) {
  const seen = new WeakSet();

  function replacer(key, value) {
    // 循环引用
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return '[Circular]';
      }
      seen.add(value);
    }

    // React
    if (value && typeof value === 'object' && value._owner) {
      return '[React Element]';
    }

    // BigInt
    if (typeof value === 'bigint') {
      return value.toString();
    }

    // 其他无法序列化的类型
    if (typeof value === 'function') {
      return `[Function: ${value.name || 'anonymous'}]`;
    }

    return value;
  }

  try {
    return JSON.stringify(obj, replacer, 2);
  } catch (error) {
    console.error('json.stringify error', error);
    return null;
  }
}

export * from './flow';

// 内置节点状态
export const NODE_STATUS = {
  success: {
    color: '#52c41a',
    name: '成功',
  },
  error: {
    color: '#ff4d4f',
    name: '失败',
  },
  warning: {
    color: '#faad14',
    name: '告警',
  },
};

export const transformNodeStatus = (statusList = []) => {
  const obj: Record<string, any> = {};
  statusList?.forEach(
    (status: { name: string; color: string; value: string }) => {
      if (isTruthy(status?.value) && status?.color)
        obj[status.value] = {
          color: status.color,
          name: status?.name,
        };
    }
  );

  return {
    ...NODE_STATUS,
    ...obj,
  };
};

// 处理颜色值
export function getTransparentColor(colorInput: string, alpha: number) {
  const color = tinycolor(colorInput);
  const alphaNum = Number(alpha);
  if (!color.isValid()) {
    return;
  }
  color.setAlpha(alphaNum);
  // 返回 RGBA 格式的颜色字符串
  return color.toRgbString();
}

export function isTruthy(value: any) {
  if (isNil(value)) {
    return false;
  }

  if (isNumber(value) && value === 0) {
    return true;
  }
  return Boolean(value);
}
