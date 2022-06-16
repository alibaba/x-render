import React from 'react';
import { Checkbox, Input, InputNumber, Rate, Switch, TreeSelect } from 'antd';
import checkboxes from './checkboxes';
import color from './color';
import date from './date';
import dateRange from './dateRange';
import Html from './html';
import ImageInput from './imageInput';
import list from './list';
import map from './map';
import multiSelect from './multiSelect';
import radio from './radio';
import select from './select';
import slider from './slider';
import time from './time';
import timeRange from './timeRange';
import upload from './upload';
import urlInput from './urlInput';

// const Cascader = React.lazy(() => import('antd/es/cascader'));

const { TextArea } = Input;

const FrNumber = ({ style, ...rest }) => {
  return <InputNumber style={{ width: '100%', ...style }} {...rest} />;
};

const FrTextArea = props => {
  let finalProps = {
    autoSize: {
      minRows: 3,
    },
    ...props,
  };
  if (finalProps.rows) delete finalProps.autoSize;

  return <TextArea {...finalProps} />;
};

const FrTreeSelect = ({ style, ...rest }) => (
  <TreeSelect style={{ width: '100%', ...style }} {...rest} />
);

// const FrCascader = ({ style, ...rest }) => (
//   <Cascader style={{ width: '100%', ...style }} {...rest} />
// );

export const widgets = {
  input: Input,
  checkbox: Checkbox,
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
  switch: Switch,
  textarea: FrTextArea,
  upload,
  html: Html,
  rate: Rate,
  treeSelect: FrTreeSelect,
  // cascader: FrCascader,
};

export const defaultWidgetNameList = Object.keys(widgets);
