'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.mapping = exports.widgets = void 0;

var _checkbox = _interopRequireDefault(require('./checkbox'));

var _checkboxes = _interopRequireDefault(require('./checkboxes'));

var _color = _interopRequireDefault(require('./color'));

var _date = _interopRequireDefault(require('./date'));

var _dateRange = _interopRequireDefault(require('./dateRange'));

var _input = _interopRequireDefault(require('./input'));

var _list = _interopRequireDefault(require('./list'));

var _map = _interopRequireDefault(require('./map'));

var _multiSelect = _interopRequireDefault(require('./multiSelect'));

var _number = _interopRequireDefault(require('./number'));

var _radio = _interopRequireDefault(require('./radio'));

var _select = _interopRequireDefault(require('./select'));

var _slider = _interopRequireDefault(require('./slider'));

var _switch = _interopRequireDefault(require('./switch'));

var _textarea = _interopRequireDefault(require('./textarea'));

var _upload = _interopRequireDefault(require('./upload'));

var _html = _interopRequireDefault(require('./html'));

var _url = _interopRequireDefault(require('./url'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var widgets = {
  checkbox: _checkbox.default,
  checkboxes: _checkboxes.default,
  // checkbox多选
  color: _color.default,
  date: _date.default,
  dateRange: _dateRange.default,
  input: _input.default,
  list: _list.default,
  map: _map.default,
  multiSelect: _multiSelect.default,
  // 下拉多选
  number: _number.default,
  radio: _radio.default,
  select: _select.default,
  slider: _slider.default,
  // 带滚条的number
  switch: _switch.default,
  textarea: _textarea.default,
  upload: _upload.default,
  html: _html.default,
  url: _url.default,
};
exports.widgets = widgets;
var mapping = {
  default: 'input',
  string: 'input',
  array: 'list',
  boolean: 'checkbox',
  integer: 'number',
  number: 'number',
  object: 'map',
  html: 'html',
  'string:upload': 'upload',
  'string:date': 'date',
  'string:dateTime': 'date',
  'string:time': 'date',
  'string:week': 'date',
  'string:month': 'date',
  'string:quarter': 'date',
  'string:year': 'date',
  'string:textarea': 'textarea',
  'string:color': 'color',
  'string:image': 'input',
  // 是不是考虑image分立出来
  'string:email': 'input',
  'string:url': 'url',
  'range:date': 'dateRange',
  'range:dateTime': 'dateRange',
  'range:time': 'dateRange',
  'range:week': 'dateRange',
  'range:month': 'dateRange',
  'range:quarter': 'dateRange',
  'range:year': 'dateRange',
  '*?enum': 'select',
  'array?enum': 'checkboxes', // '*?readOnly': 'text', // TODO: 只读模式
};
exports.mapping = mapping;
