import checkboxes from './checkboxes';
import color from './color';
import date from './date';
import dateRange from './dateRange';
import list from './list';
import map from './map';
import multiSelect from './multiSelect';
import radio from './radio';
import select from './select';
import slider from './slider';
import textarea from './textarea';
import upload from './upload';
import ImageInput from './ImageInput';
import { InputNumber, Checkbox, Switch, Input } from 'antd';

export const widgets = {
  checkbox: Checkbox,
  checkboxes, // checkbox多选
  color,
  date,
  dateRange,
  input: Input,
  imageInput: ImageInput,
  list,
  map,
  multiSelect, // 下拉多选
  number: InputNumber,
  radio,
  select,
  slider, // 带滚条的number
  switch: Switch,
  textarea,
  upload,
};

export const defaultWidgetNameList = Object.keys(widgets);
