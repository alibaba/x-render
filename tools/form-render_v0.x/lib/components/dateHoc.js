'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _react = _interopRequireDefault(require('react'));

var _moment = _interopRequireDefault(require('moment'));

var _utils = require('../base/utils');

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

var _default = function _default(p, onChange, DateComponent) {
  var style = p.invalid
    ? {
        borderColor: '#ff4d4f',
        boxShadow: '0 0 0 2px rgba(255,77,79,.2)',
      }
    : {};
  var _p$schema$format = p.schema.format,
    format = _p$schema$format === void 0 ? 'dateTime' : _p$schema$format;

  if (p.options && p.options.format) {
    format = p.options.format;
  }

  var _value = p.value || '';

  var dateFormat = (0, _utils.getFormat)(format);

  if (_value) {
    _value = (0, _moment.default)(_value, dateFormat);
  }

  var placeholderObj = p.description
    ? {
        placeholder: p.description,
      }
    : {};

  var dateParams = _objectSpread(
    _objectSpread(_objectSpread({}, placeholderObj), p.options),
    {},
    {
      value: _value,
      style: _objectSpread(
        {
          width: '100%',
        },
        style
      ),
      disabled: p.disabled || p.readOnly,
      onChange: onChange,
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
