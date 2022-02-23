/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { get } from 'lodash-es';
import { useStore, useTools } from '../../hooks';
import { getDataPath } from '../../utils';
import Core from '../index';

const RenderList = ({
  $id,
  schema = {},
  dataIndex = [],
  children = [],
  errorFields,
  displayType,
  disabled,
  readOnly,
}) => {
  const { formData, flatten } = useStore();
  const { widgets, onItemChange, removeTouched } = useTools();

  // 计算 list对应的formData
  const dataPath = getDataPath($id, dataIndex);
  let value;
  if (typeof dataPath === 'string') {
    // TODO: value 会有不少“窟窿”，submit 的时候，value 需要补齐 or filter
    value = get(formData, dataPath);
  }

  const displayList = Array.isArray(value) ? value : [{}];

  const onChange = newList => {
    onItemChange(dataPath, newList);
  };

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
    onItemChange(dataPath, JSON.parse(JSON.stringify(newList)));
  };

  const deleteItem = idx => {
    // TODO: 删除元素的时候，也需要delete相对于的校验信息（errorFields）
    // remark: 删除时，不存在的item需要补齐，用null
    const newList = displayList.filter((item, kdx) => kdx !== idx);
    onItemChange(dataPath, newList);
    removeTouched(`${dataPath}[${idx}]`);
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
    // TODO: 这块懒了，之后要处理一下
    removeTouched(`${dataPath}[${idx}]`);
  };

  const moveItemDown = idx => {
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

  const getFieldProps = (idx, extraProps) => {
    return {
      _item: itemFlatten,
      dataIndex: [...dataIndex, idx],
      displayType,
      ...extraProps,
    };
  };

  const addons = {
    deleteItem,
    addItem,
    copyItem,
    moveItemDown,
    moveItemUp,
    dataPath,
    dataIndex,
    flatten,
    errorFields,
  };

  const displayProps = {
    addons,
    value: displayList,
    onChange,
    schema,
    disabled,
    readOnly,
    hidden: schema.hidden,
    title: schema.title,
    children,
    displayType,
    getFieldProps,
    Field: Core,
  };

  const renderWidget = schema.widget || 'cardList';
  const ListWidget = widgets[renderWidget] || widgets.cardList;

  return <ListWidget {...displayProps} />;
};

export default RenderList;
