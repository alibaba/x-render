/* eslint-disable jsx-a11y/anchor-is-valid */
import { get, isFunction } from 'lodash-es';
import React from 'react';
import { useStore, useTools } from '../../../hooks';
import {
  generateDataSkeleton,
  getDataPath,
  getSchemaFromFlatten,
} from '../../../utils';
import CardList from './CardList';
import DrawerList from './DrawerList';
import './list.less';
import SimpleList from './SimpleList';
import TableList from './TableList';
import TabList from './TabList';
import VirtualList from './VirtualList';

const RenderList = ({
  parentId,
  schema = {},
  dataIndex = [],
  children = [],
  errorFields,
  displayType,
}) => {
  const { formData, flatten } = useStore();
  const { onItemChange, removeTouched, methods, layoutWidgets } = useTools();
  const { props = {} } = schema;

  let renderWidget = 'list';
  try {
    renderWidget = schema.widget;
  } catch (error) {}

  // 计算 list对应的formData
  const dataPath = getDataPath(parentId, dataIndex);
  let listData;
  if (typeof dataPath === 'string') {
    // TODO: listData会有不少“窟窿”，submit 的时候，listData 需要补齐 or filter
    listData = get(formData, dataPath);
  }

  const displayList = Array.isArray(listData) ? listData : [{}];

  const changeList = newList => {
    onItemChange(dataPath, newList);
  };

  const addItem = () => {
    const _schema = getSchemaFromFlatten(flatten, parentId);
    const newItem = generateDataSkeleton(_schema.items) || {};
    const newList = [...displayList, newItem];
    const newIndex = newList.length - 1;
    onItemChange(dataPath, newList);
    return newIndex;
  };

  const copyItem = idx => {
    const newItem = displayList[idx];
    const newList = [
      ...displayList.slice(0, idx),
      newItem,
      ...displayList.slice(idx),
    ];
    onItemChange(dataPath, JSON.parse(JSON.stringify(newList)));
  };

  const deleteItem = idx => {
    // TODO: 删除元素的时候，也需要delete相对于的校验信息（errorFields）
    // remark: 删除时，不存在的item需要补齐，用null
    const newList = displayList.filter((item, kdx) => kdx !== idx);
    onItemChange(dataPath, newList);
    removeTouched(`${dataPath}[${idx}]`);
  };

  const handleMoving = () => {
    if (props.onMove && typeof props.onMove === 'string') {
      const cb = methods[props.onMove];
      if (typeof cb === 'function') {
        cb();
      }
    }
  };

  //TODO1: 上线翻页要正确！！现在是错的
  const moveItemUp = idx => {
    handleMoving();
    if (idx === 0) return;
    const currentItem = displayList[idx];
    const itemAbove = displayList[idx - 1];
    const newList = displayList;
    newList[idx] = itemAbove;
    newList[idx - 1] = currentItem;
    onItemChange(dataPath, newList);
    // TODO: 这块懒了，之后要处理一下
    removeTouched(`${dataPath}[${idx}]`);
  };

  const moveItemDown = idx => {
    handleMoving();
    if (idx >= displayList.length - 1) return;
    const currentItem = displayList[idx];
    const itemBelow = displayList[idx + 1];
    const newList = displayList;
    newList[idx] = itemBelow;
    newList[idx + 1] = currentItem;
    onItemChange(dataPath, newList);
    // TODO: 这块懒了，之后要处理一下
    removeTouched(`${dataPath}[${idx}]`);
  };

  let itemSchema = {
    type: 'object',
    properties: {},
    props: schema.props || {},
    $id: schema.$id,
  };
  const itemFlatten = {
    schema: itemSchema,
    children,
  };

  const getFieldsProps = (idx, extraProps) => {
    return {
      _item: itemFlatten,
      dataIndex: [...dataIndex, idx],
      ...extraProps,
    };
  };

  let displayProps = {
    displayList,
    changeList,
    schema,
    dataPath,
    dataIndex,
    children,
    deleteItem,
    addItem,
    copyItem,
    moveItemDown,
    moveItemUp,
    listData,
    flatten,
    errorFields,
    displayType,
    getFieldsProps,
  };

  // 外部定义：添加按钮事件
  const onAdd = methods[props.onAdd];
  if (isFunction(onAdd)) {
    displayProps.addItem = () => onAdd(addItem, { schema });
  }

  // 外部定义：删除按钮事件
  const onRemove = methods[props.onRemove];
  if (isFunction(onRemove)) {
    displayProps.deleteItem = (idx) => onRemove(() => deleteItem(idx), { schema })
  }

  if (layoutWidgets && layoutWidgets[renderWidget]) {
    const Component = layoutWidgets[renderWidget];
    return <Component {...displayProps} />;
  }

  switch (renderWidget) {
    case 'list1':
    case 'simpleList':
      return <SimpleList {...displayProps} />;
    case 'list2':
    case 'tableList':
      return <TableList {...displayProps} />;
    case 'list3':
    case 'drawerList':
      return <DrawerList {...displayProps} />;
    case 'list4':
    case 'virtualList':
      return <VirtualList {...displayProps} />;
    case 'tabList':
      return <TabList {...displayProps} />;
    case 'list0':
    case 'cardList':
    default:
      return <CardList {...displayProps} />;
  }
};

export default RenderList;
