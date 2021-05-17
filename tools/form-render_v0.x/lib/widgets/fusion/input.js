'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = input;

var _input = _interopRequireDefault(require('@alifd/next/lib/input'));

var _balloon = _interopRequireDefault(require('@alifd/next/lib/balloon'));

var _icon = _interopRequireDefault(require('@alifd/next/lib/icon'));

var _react = _interopRequireDefault(require('react'));

var _previewContent = _interopRequireDefault(
  require('../../components/previewContent')
);

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

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

var previewNode = function previewNode(format, value) {
  if (format !== 'image') {
    return null;
  }

  return /*#__PURE__*/ _react.default.createElement(
    _balloon.default,
    {
      trigger: /*#__PURE__*/ _react.default.createElement(_icon.default, {
        type: 'picture',
      }),
      className: 'fr-preview',
      align: 'tl',
    },
    (0, _previewContent.default)(format, value)
  );
};

function input(p) {
  var _p$options = p.options,
    options = _p$options === void 0 ? {} : _p$options,
    invalid = p.invalid,
    schema = p.schema;
  var style = invalid
    ? {
        borderColor: '#ff4d4f',
        boxShadow: '0 0 0 2px rgba(255,77,79,.2)',
        width: '100%',
      }
    : {
        width: '100%',
      };

  var addonBefore = options.addonBefore,
    addonAfter = options.addonAfter,
    rest = _objectWithoutProperties(options, ['addonBefore', 'addonAfter']);

  var _schema$format = schema.format,
    format = _schema$format === void 0 ? 'text' : _schema$format,
    maxLength = schema.maxLength;

  var handleChange = function handleChange(value) {
    return p.onChange(p.name, value);
  };

  var config = _objectSpread(
    _objectSpread({}, rest),
    {},
    {
      maxLength: maxLength,
      showLimitHint: maxLength ? true : false,
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
        disabled: p.disabled || p.readOnly,
        addonTextBefore: addonBefore ? addonBefore : '',
        addonTextAfter: addonAfter ? addonAfter : previewNode(format, p.value),
        onChange: handleChange,
      }
    )
  );
}
