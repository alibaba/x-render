'use strict';

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

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

require('antd/lib/date-picker/style');

var _datePicker = _interopRequireDefault(require('antd/lib/date-picker'));

require('antd/lib/time-picker/style');

var _timePicker = _interopRequireDefault(require('antd/lib/time-picker'));

var _react = _interopRequireWildcard(require('react'));

var _moment = _interopRequireDefault(require('moment'));

var _utils = require('../../base/utils');

function _getRequireWildcardCache() {
  if (typeof WeakMap !== 'function') return null;
  var cache = new WeakMap();
  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };
  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  if (
    obj === null ||
    (_typeof(obj) !== 'object' && typeof obj !== 'function')
  ) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache();
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var _default = function _default(_ref) {
  var invalid = _ref.invalid,
    schema = _ref.schema,
    options = _ref.options,
    value = _ref.value,
    name = _ref.name,
    onChange = _ref.onChange,
    disabled = _ref.disabled,
    readOnly = _ref.readOnly;
  var style = invalid
    ? {
        borderColor: '#ff4d4f',
        boxShadow: '0 0 0 2px rgba(255,77,79,.2)',
      }
    : {};
  var _schema$format = schema.format,
    format = _schema$format === void 0 ? 'dateTime' : _schema$format;
  var _format = format;

  if (options && options.format) {
    _format = options.format;
  }

  _format = (0, _utils.getFormat)(_format);
  var DateComponent =
    format === 'time' ? _timePicker.default : _datePicker.default;

  var _value = value || '';

  if (_value) {
    _value = (0, _moment.default)(_value, _format);
  }

  var _onChange = function _onChange(value, string) {
    onChange(name, string);
  };

  var dateParams = _objectSpread(
    _objectSpread({}, options),
    {},
    {
      value: _value,
      style: _objectSpread(
        {
          width: '100%',
        },
        style
      ),
      disabled: disabled || readOnly,
      onChange: _onChange,
    }
  ); // TODO: format是在options里自定义的情况，是否要判断一下要不要showTime

  if (format === 'dateTime') {
    dateParams.showTime = true;
  }

  if (['week', 'month', 'quarter', 'year'].indexOf(format) > -1) {
    dateParams.picker = format;
  }

  return /*#__PURE__*/ _react.default.createElement(DateComponent, dateParams);
};

exports.default = _default;
