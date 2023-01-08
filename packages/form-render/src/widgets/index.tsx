import React from 'react';
import {
  Checkbox,
  Input,
  InputNumber,
  Rate,
  Switch,
  TreeSelect,
  Radio,
} from 'antd';
import color from './antd/color';
import date from './antd/date';
import dateRange from './antd/dateRange';
import Html from './html';
import ImageInput from './antd/imageInput';
import multiSelect from './antd/multiSelect';
import select from './antd/select';
import slider from './antd/slider';
import time from './antd/time';
import timeRange from './antd/timeRange';
import upload from './antd/upload';
import urlInput from './antd/urlInput';
import checkbox from './antd/checkbox';

// 容器
import BoxCard from './container/BoxCard';
import BoxCollapse from './container/BoxCollapse';
import BoxLineTitle from './container/BoxLineTitle';
import BoxSubItem from './container/BoxSubItem';
import BoxPanel from './container/BoxPanel';

import SimpleList from './container/ListSimple';
import DrawerList from './container/ListDrawer';
import TableList from './container/ListTable';
import VirtualList from './container/ListVirtual';
import TabList from './container/ListTab';

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

type Widgets = {
  [key: string]: any;
};
export const widgets: Widgets = {
  input: Input,
  checkbox,
  checkboxes: Checkbox.Group, // checkbox多选
  color,
  date,
  time,
  dateRange,
  timeRange,
  imageInput: ImageInput,
  url: urlInput,
  multiSelect, // 下拉多选
  number: FrNumber,
  radio: Radio.Group,
  select,
  slider, // 带滚条的number
  switch: Switch,
  textarea: FrTextArea,
  upload,
  html: Html,
  rate: Rate,
  treeSelect: FrTreeSelect,

  card: BoxCard,
  collapse: BoxCollapse,
  lineTitle: BoxLineTitle,
  subItem: BoxSubItem,
  panel: BoxPanel,

  list0: SimpleList,
  list1: SimpleList,
  list2: TableList,
  list3: DrawerList,
  list4: VirtualList,
  simpleList: SimpleList,
  cardList: SimpleList,
  tableList: TableList,
  drawerList: DrawerList,
  virtualList: VirtualList,
  tabList: TabList,
};

export const defaultWidgetNameList = Object.keys(widgets);
