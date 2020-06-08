import { clone, isFunction } from './utils';

// 获取当前字段默认值
function getDefaultValue({ default: def, enum: enums = [], type }) {
  const defaultValue = {
    array: [],
    boolean: false,
    integer: '',
    null: null,
    number: '',
    object: {},
    string: '',
    range: null,
  };

  if (isFunction(def)) {
    return defaultValue[type];
  }
  if (isFunction(enums)) {
    if (type === 'array') {
      return [];
    }
    if (type === 'string' || type === 'number') {
      return '';
    }
  }

  // 如果设置默认值，优先从默认值中获取
  if (typeof def !== 'undefined') {
    return def;
  }
  // array且enum的情况，为多选框，默认值[]
  if (type === 'array' && enums.length) {
    return [];
  }
  // 如果enum是表达式，不处理
  // 如果设置枚举值，其次从枚举值中获取
  if (Array.isArray(enums) && enums[0] && typeof enums[0] !== 'undefined') {
    return enums[0];
  }
  // 最后使用对应基础类型的默认值
  return defaultValue[type];
}

function resolve(schema, data, options = {}) {
  const {
    // 类型
    type,
    // 对象子集
    properties,
    // 数组子集
    items,
    // 必选值，对象的子集
    default: def,
    required = [],
    'ui:widget': widget,
  } = schema;
  const {
    // 按照required规则做数据补全
    checkRequired = false,
  } = options;
  // 当前值
  let value = getDefaultValue(schema);

  try {
    // 使用clone(data) 但确保key顺序正确
    if (typeof data !== 'undefined') {
      Object.keys(value).forEach(key => {
        value[key] = clone(data)[key];
      });
    }
  } catch (error) {
    value = clone(data); // clone(data) 有时候业务方传的data的key的顺序是错的，导致了渲染顺序错误，所以这个只是兜底
  }

  if (type === 'object') {
    // 如果自定义组件
    if (widget) {
      if (def && typeof def === 'object') {
        return def;
      }
      return value;
    }
    const subs = properties || {};
    const ret = {};
    Object.keys(subs).forEach(name => {
      const checkAndPass =
        checkRequired && [].concat(required).indexOf(name) !== -1;
      if (!checkRequired || checkAndPass) {
        ret[name] = resolve(subs[name], value[name], options);
      }
    });
    return ret;
  }
  if (type === 'array') {
    // 如果没有value且default有值，用default
    if (def && Array.isArray(def) && !value) {
      return def;
    }
    // 如果自定义组件
    if (widget) return value;

    const subs = [].concat(items || []);
    const ret = [];
    value.forEach &&
      value.forEach((item, idx) => {
        ret[idx] = resolve(subs[idx] || subs[0], item, options);
      });
    return ret;
  }
  return value;
}

export default resolve;
