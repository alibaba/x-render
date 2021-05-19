'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = dateRange;

var _datePicker = _interopRequireDefault(
  require('@alifd/next/lib/date-picker')
);

var _react = _interopRequireDefault(require('react'));

var _moment = _interopRequireDefault(require('moment'));

var _utils = require('../../base/utils');

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

var RangePicker = _datePicker.default.RangePicker;

function dateRange(_ref) {
  var onChange = _ref.onChange,
    _ref$schema = _ref.schema,
    schema = _ref$schema === void 0 ? {} : _ref$schema,
    value = _ref.value,
    options = _ref.options,
    disabled = _ref.disabled,
    readOnly = _ref.readOnly,
    name = _ref.name;
  var format = schema.format;
  var _format = format;

  if (options.format) {
    _format = options.format;
  }

  var dateFormat = (0, _utils.getFormatForFusion)(_format);
  var formatBack = (0, _utils.getFormat)(_format);

  var _onChange = function _onChange(value) {
    if (Array.isArray(value)) {
      var result = value.map(
        // null 的时候返回空字符串
        function(item) {
          if (item) {
            return (0, _moment.default)(item).format(dateFormat);
          }

          return '';
        }
      );
      onChange(name, result);
    }
  };

  var _ref2 = Array.isArray(value) ? value : [],
    _ref3 = _slicedToArray(_ref2, 2),
    start = _ref3[0],
    end = _ref3[1];

  var _value = [
    (0, _moment.default)(start, formatBack),
    (0, _moment.default)(end, formatBack),
  ];

  var dateParams = _objectSpread(
    _objectSpread({}, options),
    {},
    {
      value: _value,
      style: {
        width: '100%',
      },
      showTime: format === 'dateTime',
      disabled: disabled || readOnly,
      onChange: _onChange,
    }
  );

  if (['week', 'month', 'quarter', 'year'].indexOf(format) > -1) {
    dateParams.picker = format;
  }

  return /*#__PURE__*/ _react.default.createElement(RangePicker, dateParams);
}
