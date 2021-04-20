/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { get } from 'lodash';
import { useStore } from '../../../hooks';
import { getDataPath, getKeyFromPath, getDisplayValue } from '../../../utils';
// import ArrowDown from '../../../components/ArrowDown';
import './list.less';
import SimpleList from './SimpleList';
import CardList from './CardList';
import TableList from './TableList';
import DrawerList from './DrawerList';

const RenderList = ({
  parentId,
  dataIndex = [],
  children = [],
  errorFields,
  displayType,
}) => {
  const { formData, flatten, onItemChange, removeErrorField } = useStore();

  let renderWidget = 'list';
  try {
    renderWidget = flatten[parentId].schema.widget;
  } catch (error) {}

  const item = flatten[parentId];
  const schema = item && item.schema;

  // 计算 list对应的formData
  const dataPath = getDataPath(parentId, dataIndex);
  let listData;
  if (typeof dataPath === 'string') {
    // TODO: listData会有不少“窟窿”，submit 的时候，listData 需要补齐 or filter
    listData = get(formData, dataPath);
  }

  const displayList = Array.isArray(listData) ? listData : [{}];

  const addItem = () => {
    const newList = [...displayList, {}];
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
    onItemChange(dataPath, newList);
  };

  const deleteItem = idx => {
    // TODO: 删除元素的时候，也需要delete相对于的校验信息（errorFields）
    // remark: 删除时，不存在的item需要补齐，用null
    const newList = displayList.filter((item, kdx) => kdx !== idx);
    onItemChange(dataPath, newList);
    removeErrorField(`${dataPath}[${idx}]`);
  };

  //TODO1: 上线翻页要正确！！现在是错的
  const moveItemUp = idx => {
    if (idx === 0) return;
    const currentItem = displayList[idx];
    const itemAbove = displayList[idx - 1];
    const newList = displayList;
    newList[idx] = itemAbove;
    newList[idx - 1] = currentItem;
    onItemChange(dataPath, newList);
  };

  const moveItemDown = idx => {
    if (idx >= displayList.length - 1) return;
    const currentItem = displayList[idx];
    const itemBelow = displayList[idx + 1];
    const newList = displayList;
    newList[idx] = itemBelow;
    newList[idx + 1] = currentItem;
    onItemChange(dataPath, newList);
  };

  let itemSchema = {
    type: 'object',
    // properties: (schema.items && schema.items.properties) || {},
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

  const displayProps = {
    displayList,
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

  switch (renderWidget) {
    case 'list0':
      return <CardList {...displayProps} />;
    case 'list1':
      return <SimpleList {...displayProps} />;
    case 'list2':
      return <TableList {...displayProps} />;
    case 'list3':
      return <DrawerList {...displayProps} />;
    default:
      return <CardList {...displayProps} />;
  }
};

export default RenderList;
