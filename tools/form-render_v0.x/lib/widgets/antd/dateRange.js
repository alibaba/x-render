'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = dateRange;

require('antd/lib/time-picker/style');

var _timePicker = _interopRequireDefault(require('antd/lib/time-picker'));

require('antd/lib/date-picker/style');

var _datePicker = _interopRequireDefault(require('antd/lib/date-picker'));

var _react = _interopRequireDefault(require('react'));

var _rangeHoc = _interopRequireDefault(require('../../components/rangeHoc'));

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

var DateRange = _datePicker.default.RangePicker;
var TimeRange = _timePicker.default.RangePicker;

function dateRange(p) {
  var _p$schema$format = p.schema.format,
    format = _p$schema$format === void 0 ? 'dateTime' : _p$schema$format;

  var onChange = function onChange(value, string) {
    return p.onChange(p.name, string);
  };

  var RangeComponent = format === 'time' ? TimeRange : DateRange;

  var hocProps = _objectSpread(
    _objectSpread({}, p),
    {},
    {
      onChange: onChange,
      RangeComponent: RangeComponent,
    }
  );

  return /*#__PURE__*/ _react.default.createElement(
    _rangeHoc.default,
    hocProps
  );
}
