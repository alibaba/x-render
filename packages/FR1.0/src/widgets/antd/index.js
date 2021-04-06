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
import upload from './upload';
import ImageInput from './ImageInput';
import Html from './html';
import { InputNumber, Checkbox, Switch, Input } from 'antd';
import { createWidget } from '../../HOC';

const { TextArea } = Input;

const FrNumber = createWidget(({ style }) => ({
  style: { width: '100%', ...style },
}))(InputNumber);

const FrSwitch = createWidget(({ style }) => ({
  style: { marginTop: 5, ...style },
}))(Switch);

const FrTextArea = createWidget(({ autoSize }) => ({
  autoSize: autoSize ? autoSize : { minRows: 3 },
}))(TextArea);

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
  number: FrNumber,
  radio,
  select,
  slider, // 带滚条的number
  switch: FrSwitch,
  textarea: FrTextArea,
  upload,
  html: Html,
};

export const defaultWidgetNameList = Object.keys(widgets);
