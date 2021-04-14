import checkbox from './checkbox';
import checkboxes from './checkboxes';
import color from './color';
import date from './date';
import dateRange from './dateRange';
import input from './input';
import list from './list';
import map from './map';
import multiSelect from './multiSelect';
import number from './number';
import radio from './radio';
import select from './select';
import slider from './slider';
import switch1 from './switch';
import textarea from './textarea';
import upload from './upload';
import html from './html';
import url from './url';

export const widgets = {
  checkbox,
  checkboxes, // checkbox多选
  color,
  date,
  dateRange,
  input,
  list,
  map,
  multiSelect, // 下拉多选
  number,
  radio,
  select,
  slider, // 带滚条的number
  switch: switch1,
  textarea,
  upload,
  html,
  url,
};

export const mapping = {
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
  'string:image': 'input', // 是不是考虑image分立出来
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
  'array?enum': 'checkboxes',
  // '*?readOnly': 'text', // TODO: 只读模式
};
