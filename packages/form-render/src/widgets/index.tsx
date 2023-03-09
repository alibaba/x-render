import React, { ComponentType } from 'react';
import { Checkbox, Input, InputNumber, Rate, Switch, TreeSelect, Radio, Select } from 'antd';

import color from './antd/color';
import date from './antd/date';
import dateRange from './antd/dateRange';
import Html from './html';
import ImageInput from './antd/imageInput';
import slider from './antd/slider';
import time from './antd/time';
import timeRange from './antd/timeRange';
import upload from './antd/upload';
import urlInput from './antd/urlInput';
import singelCheckbox from './antd/checkbox';

// 容器
import BoxCard from './container/BoxCard';
import BoxCollapse from './container/BoxCollapse';
import BoxLineTitle from './container/BoxLineTitle';
import BoxSubInline from './container/BoxSubInline';

import SimpleList from './container/ListSimple';
import CardList from './container/ListCard';
import DrawerList from './container/ListDrawer';
import TableList from './container/ListTable';
import VirtualList from './container/ListVirtual';
import TabList from './container/ListTab';
import { ErrorSchema } from './components/ErrorSchema';

import './index.less';


const { TextArea } = Input;

const FrTextArea = (props: any) => {
  let finalProps = {
    autoSize: {
      minRows: 3,
    },
    ...props,
  };
  if (finalProps.rows) delete finalProps.autoSize;

  return <TextArea {...finalProps} />;
};



type Widgets = {
  [key: string]: any;
};

export function withWrap(Comp: ComponentType<any>) {
  return (props: any) => {
    const { addons, schema, globalProps, dependValues, ...otherProps } = props;
    return <Comp {...otherProps} />;
  };
}


export const widgets: Widgets = {
  input: withWrap(Input),
  checkbox: singelCheckbox,
  checkboxes: withWrap(Checkbox.Group), // checkbox多选
  color,
  date,
  time,
  dateRange,
  timeRange,
  imageInput: ImageInput,
  url: urlInput,
  select: withWrap(Select),
  multiSelect: withWrap(Select), // 下拉多选
  number: withWrap(InputNumber),
  radio: withWrap(Radio.Group),
  slider, // 带滚条的number
  switch: withWrap(Switch),
  textarea: FrTextArea,
  upload,
  html: Html,
  rate: withWrap(Rate),
  treeSelect: withWrap(TreeSelect),

  card: BoxCard,
  collapse: BoxCollapse,
  lineTitle: BoxLineTitle,
  subInline: BoxSubInline,
  list0: SimpleList,
  list1: CardList,
  list2: TableList,
  list3: DrawerList,
  list4: VirtualList,
  simpleList: SimpleList,
  cardList: CardList,
  tableList: TableList,
  drawerList: DrawerList,
  virtualList: VirtualList,
  tabList: TabList,
  errorSchemaWidget: ErrorSchema
};

export const defaultWidgetNameList = Object.keys(widgets);
