import serializeUtil from './serialize';

export function isUrl(string) {
  const protocolRE = /^(?:\w+:)?\/\/(\S+)$/;
  // const domainRE = /^[^\s\.]+\.\S{2,}$/;
  if (typeof string !== 'string') return false;
  return protocolRE.test(string);
}

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

/**
 * @description 使用serialize-javascript进行序列化，替代JSON.stringify()
 * @description 组件rules里面会存储一些validator函数，如果用JSON.stringify提交给接口会丢失
 * @param {*} obj 传入需要序列化的值
 * @returns 序列化后的值
 */
export function serialize(obj) {
  return serializeUtil(obj, {
    ignoreUndefined: true,
  });
}

/**
 * @description 序列化成编辑器需要的展示格式
 * @param {*} obj  传入需要序列化的值
 * @return {*}  序列化后的值
 */
export function serializeToDraft(obj) {
  return serializeUtil(obj, {
    space: 2,
    ignoreUndefined: true,
  });
}

/**
 * @description 对serialize-javascript序列化后的值进行反序列化化
 * @param {*} serializedJavascript 反序列化后的值
 * @returns
 */
export function deserialize(serializedJavascript) {
  return new Function('return ' + serializedJavascript)();
}
