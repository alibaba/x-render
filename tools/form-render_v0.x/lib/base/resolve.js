'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _utils = require('./utils');

function _typeof(obj) {
  '@babel/helpers - typeof';
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj;
    };
  }
  return _typeof(obj);
}

// 获取当前字段默认值
function getDefaultValue(schema) {
  var def = schema.default,
    _schema$enum = schema.enum,
    enums = _schema$enum === void 0 ? [] : _schema$enum,
    type = schema.type;
  var defaultValue = {
    array: [],
    boolean: false,
    integer: '',
    null: null,
    number: '',
    object: {},
    string: '',
    range: null,
  };

  if ((0, _utils.isFunction)(def)) {
    return defaultValue[type];
  }

  if ((0, _utils.isFunction)(enums)) {
    if (type === 'array') {
      return [];
    }

    if (type === 'string' || type === 'number') {
      return '';
    }
  } // 如果设置默认值，优先从默认值中获取

  if (typeof def !== 'undefined') {
    return def;
  } // array且enum的情况，为多选框，默认值[]

  if (type === 'array' && enums.length) {
    return [];
  } // 如果enum是表达式，不处理
  // 如果设置枚举值，其次从枚举值中获取

  if (Array.isArray(enums) && typeof enums[0] !== 'undefined') {
    if (schema.hasOwnProperty('default')) {
      return schema.default; // 就算default: undefined, 也用 undefined, 这样就可以清空了
    }

    return enums[0];
  } // 最后使用对应基础类型的默认值

  return defaultValue[type];
}

function resolve(schema, data) {
  var options =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var type = schema.type,
    properties = schema.properties,
    items = schema.items,
    def = schema.default,
    _schema$required = schema.required,
    required = _schema$required === void 0 ? [] : _schema$required,
    widget = schema['ui:widget'];
  var _options$checkRequire = options.checkRequired,
    checkRequired =
      _options$checkRequire === void 0 ? false : _options$checkRequire;
  var value =
    typeof data === 'undefined'
      ? getDefaultValue(schema)
      : (0, _utils.clone)(data);

  if (type === 'object') {
    // 如果自定义组件
    if (widget) {
      if (def && _typeof(def) === 'object') {
        return def;
      }

      return value;
    }

    var subs = properties || {};
    var ret = {};
    Object.keys(subs).forEach(function(name) {
      var checkAndPass =
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
    } // 如果自定义组件

    if (widget) return value;

    var _subs = [].concat(items || []);

    var _ret = [];
    value.forEach &&
      value.forEach(function(item, idx) {
        _ret[idx] = resolve(_subs[idx] || _subs[0], item, options);
      });
    return _ret;
  }

  return value;
}

var _default = resolve;
exports.default = _default;
