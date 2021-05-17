'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = input;

require('antd/lib/input/style');

var _input = _interopRequireDefault(require('antd/lib/input'));

var _react = _interopRequireDefault(require('react'));

var _utils = require('../../base/utils');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _extends() {
  _extends =
    Object.assign ||
    function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
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

var TestNode = function TestNode(_ref) {
  var value = _ref.value;
  var useUrl = (0, _utils.isUrl)(value);

  if (useUrl) {
    return /*#__PURE__*/ _react.default.createElement(
      'a',
      {
        target: '_blank',
        href: value,
      },
      '\u6D4B\u8BD5\u94FE\u63A5'
    );
  }

  return /*#__PURE__*/ _react.default.createElement(
    'div',
    null,
    '\u6D4B\u8BD5\u94FE\u63A5'
  );
};

function input(p) {
  var _p$options = p.options,
    options = _p$options === void 0 ? {} : _p$options,
    invalid = p.invalid,
    _p$schema = p.schema,
    schema = _p$schema === void 0 ? {} : _p$schema;
  var style = invalid
    ? {
        borderColor: '#ff4d4f',
        boxShadow: '0 0 0 2px rgba(255,77,79,.2)',
      }
    : {};
  var _schema$format = schema.format,
    format = _schema$format === void 0 ? 'text' : _schema$format,
    maxLength = schema.maxLength;
  var type = format === 'image' ? 'text' : format;

  var handleChange = function handleChange(e) {
    p.onChange(p.name, e.target.value);
  };

  var suffix = undefined;

  try {
    var _value = p.value || '';

    if (typeof _value === 'number') {
      _value = String(_value);
    }

    suffix = options.suffix;

    if (!suffix && maxLength) {
      suffix = /*#__PURE__*/ _react.default.createElement(
        'span',
        {
          style:
            _value.length > maxLength
              ? {
                  fontSize: 12,
                  color: '#ff4d4f',
                }
              : {
                  fontSize: 12,
                  color: '#999',
                },
        },
        _value.length + ' / ' + maxLength
      );
    }
  } catch (error) {}

  var config = _objectSpread(
    _objectSpread({}, options),
    {},
    {
      maxLength: maxLength,
      suffix: suffix,
    }
  );

  return /*#__PURE__*/ _react.default.createElement(
    _input.default,
    _extends(
      {
        style: style,
      },
      config,
      {
        value: p.value,
        type: type,
        disabled: p.disabled || p.readOnly,
        addonAfter: /*#__PURE__*/ _react.default.createElement(TestNode, {
          value: p.value,
        }),
        onChange: handleChange,
      }
    )
  );
}
