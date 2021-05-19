'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _react = _interopRequireDefault(require('react'));

var _utils = require('../base/utils');

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

var _default = function _default(MultiComponent) {
  return function(p) {
    var Option = MultiComponent.Option;

    var onChange = function onChange(value) {
      return p.onChange(p.name, value);
    };

    var style = p.invalid
      ? {
          borderColor: '#ff4d4f',
          boxShadow: '0 0 0 2px rgba(255,77,79,.2)',
        }
      : {};
    var schema = p.schema || {};
    var _schema$items = schema.items,
      items = _schema$items === void 0 ? {} : _schema$items;

    var _ref = items && items.enum ? items : schema,
      enums = _ref.enum,
      enumNames = _ref.enumNames;

    var _value = p.value && Array.isArray(p.value) ? p.value : [];

    return /*#__PURE__*/ _react.default.createElement(
      MultiComponent,
      _extends({}, p.options, {
        style: _objectSpread(
          {
            width: '100%',
          },
          style
        ),
        mode: 'multiple',
        disabled: p.disabled || p.readOnly,
        value: _value,
        onChange: onChange,
      }),
      (0, _utils.getArray)(enums).map(function(val, index) {
        return /*#__PURE__*/ _react.default.createElement(
          Option,
          {
            value: val,
            key: index,
          },
          /*#__PURE__*/ _react.default.createElement('span', {
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML: {
              __html:
                enumNames && Array.isArray(enumNames) ? enumNames[index] : val,
            },
          })
        );
      })
    );
  };
};

exports.default = _default;
