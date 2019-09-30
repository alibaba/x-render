// 克隆对象
function clone(data) {
  try {
    return JSON.parse(JSON.stringify(data));
  } catch (e) {
    return data;
  }
}

// 获取当前字段默认值
function getDefaultValue({ default: def, enum: enums = [], type }) {
  // 如果设置默认值，优先从默认值中获取
  if (typeof def !== 'undefined') {
    return def;
  }
  // array且enum的情况，为多选框，默认值[]
  if (type === 'array' && enums.length > 0) {
    return [];
  }
  // 如果设置枚举值，其次从枚举值中获取
  if (typeof enums[0] !== 'undefined') {
    return enums[0];
  }
  // 最后使用对应基础类型的默认值
  return {
    array: [],
    boolean: false,
    integer: '',
    null: null,
    number: '',
    object: {},
    string: '',
    range: null,
  }[type];
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
    required = [],
  } = schema;
  const {
    // 按照required规则做数据补全
    checkRequired = false,
  } = options;
  // 当前值
  const value =
    typeof data === 'undefined' ? getDefaultValue(schema) : clone(data);
  if (type === 'object') {
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
