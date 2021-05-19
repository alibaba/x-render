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
exports.default = input;

require('antd/lib/input/style');

var _input = _interopRequireDefault(require('antd/lib/input'));

require('antd/lib/popover/style');

var _popover = _interopRequireDefault(require('antd/lib/popover'));

var _PictureOutlined2 = _interopRequireDefault(
  require('@ant-design/icons/lib/icons/PictureOutlined')
);

var _react = _interopRequireWildcard(require('react'));

var _useDebounce = _interopRequireDefault(require('../../base/useDebounce'));

var _previewContent = _interopRequireDefault(
  require('../../components/previewContent')
);

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

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  );
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === 'undefined' || !(Symbol.iterator in Object(arr)))
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

var PreviewNode = function PreviewNode(_ref) {
  var format = _ref.format,
    value = _ref.value,
    showPop = _ref.showPop,
    setShowPop = _ref.setShowPop;
  return /*#__PURE__*/ _react.default.createElement(
    _popover.default,
    {
      content: (0, _previewContent.default)(format, value),
      className: 'fr-preview',
      placement: 'bottom',
      visible: showPop,
    },
    /*#__PURE__*/ _react.default.createElement(_PictureOutlined2.default, {
      onMouseEnter: function onMouseEnter() {
        return setShowPop(true);
      },
      onMouseLeave: function onMouseLeave() {
        return setShowPop(false);
      },
    })
  );
};

function input(p) {
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    showPop = _useState2[0],
    setShowPop = _useState2[1];

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
  var type = ['image', 'email'].indexOf(format) > -1 ? 'text' : format; // TODO: 这里要是添加新的input类型，注意是一个坑啊，每次不想用html的默认都要补上

  var debouncedSetShowPop = (0, _useDebounce.default)(setShowPop, 1000);

  var handleChange = function handleChange(e) {
    p.onChange(p.name, e.target.value);
    setShowPop(true);
    debouncedSetShowPop(false);
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

  var _options = _objectSpread({}, options);

  delete _options.noTrim;

  var config = _objectSpread(
    _objectSpread({}, _options),
    {},
    {
      maxLength: maxLength,
      suffix: suffix,
    }
  );

  var addonAfter = options.addonAfter;

  if (format === 'image' && !addonAfter) {
    addonAfter = /*#__PURE__*/ _react.default.createElement(PreviewNode, {
      format: format,
      value: p.value,
      showPop: showPop,
      setShowPop: setShowPop,
    });
  }

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
        addonAfter: addonAfter,
        onChange: handleChange,
      }
    )
  );
}
