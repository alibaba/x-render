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

var _default = function _default(SelectComponent) {
  return function(p) {
    var Option = SelectComponent.Option;

    var onChange = function onChange(value) {
      return p.onChange(p.name, value);
    };

    var style = p.invalid
      ? {
          borderColor: '#ff4d4f',
          boxShadow: '0 0 0 2px rgba(255,77,79,.2)',
        }
      : {};

    var _ref = p.schema || {},
      enums = _ref.enum,
      enumNames = _ref.enumNames;

    return /*#__PURE__*/ _react.default.createElement(
      SelectComponent,
      _extends(
        {
          style: _objectSpread(
            {
              width: '100%',
            },
            style
          ),
        },
        p.options,
        {
          disabled: p.disabled || p.readOnly,
          value: p.value,
          onChange: onChange,
        }
      ),
      (0, _utils.getArray)(enums).map(function(val, index) {
        var option =
          enumNames && Array.isArray(enumNames) ? enumNames[index] : val;
        var isHtml = typeof option === 'string' && option[0] === '<';

        if (isHtml) {
          option = /*#__PURE__*/ _react.default.createElement('span', {
            dangerouslySetInnerHTML: {
              __html: option,
            },
          });
        }

        return /*#__PURE__*/ _react.default.createElement(
          Option,
          {
            value: val,
            key: index,
          },
          option
        );
      })
    );
  };
};

exports.default = _default;
