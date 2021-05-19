'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = date;

var _timePicker = _interopRequireDefault(
  require('@alifd/next/lib/time-picker')
);

var _datePicker = _interopRequireDefault(
  require('@alifd/next/lib/date-picker')
);

var _moment = _interopRequireDefault(require('moment'));

var _dateHoc = _interopRequireDefault(require('../../components/dateHoc'));

var _utils = require('../../base/utils');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var MonthPicker = _datePicker.default.MonthPicker,
  YearPicker = _datePicker.default.YearPicker,
  WeekPicker = _datePicker.default.WeekPicker;

function date(p) {
  var _p$schema$format = p.schema.format,
    format = _p$schema$format === void 0 ? 'dateTime' : _p$schema$format;

  if (p.options.format) {
    format = p.options.format;
  }

  var dateFormat = (0, _utils.getFormatForFusion)(format);
  var picker = p.options.picker;

  var onChange = function onChange(value) {
    var timeValue = value ? (0, _moment.default)(value).format(dateFormat) : '';
    p.onChange(p.name, timeValue);
  };

  var DateComponent = _datePicker.default;

  if (format === 'time') {
    DateComponent = _timePicker.default;
  } else {
    switch (picker) {
      case 'month':
        DateComponent = MonthPicker;
        break;

      case 'week':
        DateComponent = WeekPicker;
        break;

      case 'year':
        DateComponent = YearPicker;
        break;

      default:
        DateComponent = _datePicker.default;
        break;
    }
  }

  return (0, _dateHoc.default)(p, onChange, DateComponent);
}
