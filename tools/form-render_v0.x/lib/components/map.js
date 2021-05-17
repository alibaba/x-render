'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = map;

var _react = _interopRequireDefault(require('react'));

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

function map(p) {
  var className = 'fr-map ';

  var _ref = p || {},
    _ref$options = _ref.options,
    options = _ref$options === void 0 ? {} : _ref$options;

  var isModal = options.modal || options.drawer;
  className += isModal ? 'fr-wrapper' : ''; // 因为modal跳出fr的dom层级了，需要重新加个顶层的className

  var _value = p.value || {};

  return /*#__PURE__*/ _react.default.createElement(
    'div',
    {
      className: className,
    },
    Object.keys(_value).map(function(name) {
      return p.getSubField({
        name: name,
        value: p.value[name],
        onChange: function onChange(key, val, objValue) {
          var value = _objectSpread(
            _objectSpread({}, p.value),
            {},
            _defineProperty({}, key, val)
          ); // 第三个参数，允许object里的一个子控件改动整个object的值

          if (objValue) {
            value = objValue;
          }

          if (p.useLogger) {
            console.group(p.name);
            console.log(
              '%c'.concat(key, ':'),
              'color: #47B04B; font-weight: 700;',
              val
            );
            console.log(
              '%c'.concat(p.name, ':'),
              'color: #00A7F7; font-weight: 700;',
              value
            );
            console.groupEnd();
          }

          p.onChange(p.name, value);
        },
        rootValue: p.value,
      });
    })
  );
}
