'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _react = _interopRequireDefault(require('react'));

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

var _default = function _default(NumberComponent) {
  return function(p) {
    var style = p.invalid
      ? {
          borderColor: '#ff4d4f',
          boxShadow: '0 0 0 2px rgba(255,77,79,.2)',
        }
      : {};
    var _p$schema = p.schema,
      max = _p$schema.max,
      min = _p$schema.min,
      step = _p$schema.step;
    var obj = {};

    if (max || max === 0) {
      obj = {
        max: max,
      };
    }

    if (min || min === 0) {
      obj = _objectSpread(
        _objectSpread({}, obj),
        {},
        {
          min: min,
        }
      );
    }

    if (step) {
      obj = _objectSpread(
        _objectSpread({}, obj),
        {},
        {
          step: step,
        }
      );
    }

    var onChange = function onChange(value) {
      p.onChange(p.name, value);
    };

    return /*#__PURE__*/ _react.default.createElement(
      NumberComponent,
      _extends(
        {},
        obj,
        {
          style: _objectSpread(
            {
              width: '100%',
            },
            style
          ),
          disabled: p.disabled || p.readOnly,
        },
        p.options,
        {
          value: p.value,
          onChange: onChange,
        }
      )
    );
  };
};

exports.default = _default;
