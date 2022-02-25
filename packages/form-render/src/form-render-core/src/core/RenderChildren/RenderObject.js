import React from 'react';
import Core from '../index';
import { useTools, useStore } from '../../hooks';
import { getDataPath } from '../../utils';

const RenderObject = ({
  $id,
  value,
  schema = {},
  children = [],
  dataIndex = [],
  displayType,
  hideTitle,
  disabled,
  readOnly,
  errorFields,
  onChange,
}) => {
  const tools = useTools();
  const { widgets } = tools;
  const { globalProps } = useStore();

  const dataPath = getDataPath($id, dataIndex);
  const getFieldProps = (id, extraProps) => {
    return {
      id,
      dataIndex,
      displayType,
      hideTitle,
      ...extraProps,
    };
  };

  const addons = {
    ...tools,
    dataPath,
    dataIndex,
    hideTitle,
    errorFields,
  };

  const layoutWidgetProps = {
    addons,
    value,
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
    ...globalProps,
  };

  const renderWidget = schema.widget || 'map';
  const ObjectWidget = widgets[renderWidget] || widgets.map;

  return <ObjectWidget {...layoutWidgetProps} />;
};

export default RenderObject;
