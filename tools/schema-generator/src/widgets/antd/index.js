import checkbox from './checkbox';
import checkboxes from './checkboxes';
import color from './color';
import date from './date';
import dateRange from './dateRange';
import list from './list';
import listEditor from './listEditor';
import map from './map';
import multiSelect from './multiSelect';
import number from './number';
import radio from './radio';
import select from './select';
import slider from './slider';
import switch1 from './switch';
import textarea from './textarea';
import upload from './upload';
import input from './input';

export const widgets = {
  checkbox,
  checkboxes, // checkbox多选
  color,
  date,
  dateRange,
  input,
  list,
  listEditor,
  map,
  multiSelect, // 下拉多选
  number,
  radio,
  select,
  slider, // 带滚条的number
  switch: switch1,
  textarea,
  upload,
};
