import list from './list';
import map from './map';
import { InputNumber, Checkbox, Input, Switch, Rate } from 'antd';
import { createWidget } from '../../createWidget';
import ImageInput from './imageInput';
import urlInput from './urlInput';
import Html from './html';
import select from './select';
import checkboxes from './checkboxes';
import multiSelect from './multiSelect';
import radio from './radio';
import time from './time';
import date from './date';
import dateRange from './dateRange';
import timeRange from './timeRange';

const TreeSelect = React.lazy(() => import('antd/es/tree-select'));
const Cascader = React.lazy(() => import('antd/es/cascader'));
const color = React.lazy(() => import('./color'));
const slider = React.lazy(() => import('./slider'));
const upload = React.lazy(() => import('./upload'));

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

// TODO: 这个如果 size small可能会有问题
const FrCheckbox = ({ style, ...rest }) => (
  <Checkbox style={{ paddingTop: 4, paddingBottom: 4, ...style }} {...rest} />
);

const FrTreeSelect = ({ style, ...rest }) => (
  <TreeSelect style={{ width: '100%', ...style }} {...rest} />
);

const FrCascader = ({ style, ...rest }) => (
  <Cascader style={{ width: '100%', ...style }} {...rest} />
);

export const widgets = {
  input: Input,
  checkbox: FrCheckbox,
  checkboxes, // checkbox多选
  color,
  date,
  time,
  dateRange,
  timeRange,
  imageInput: ImageInput,
  url: urlInput,
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
  rate: Rate,
  treeSelect: FrTreeSelect,
  cascader: FrCascader,
};

export const defaultWidgetNameList = Object.keys(widgets);
