import React from 'react';
import Core from '../index';
import { useTools } from '../../hooks';

const RenderObject = ({
  schema = {},
  children = [],
  dataIndex = [],
  displayType,
  hideTitle,
  disabled,
  readOnly,
}) => {
  const tools = useTools();
  const { widgets } = tools;

  const getFieldProps = (id, extraProps) => {
    return {
      id,
      displayType,
      dataIndex,
      hideTitle,
      ...extraProps,
    };
  };

  const addons = {
    ...tools,
    dataIndex,
    hideTitle,
  };

  const layoutWidgetProps = {
    addons,
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

  const renderWidget = schema.widget || 'map';
  const ObjectWidget = widgets[renderWidget] || widgets.map;

  return <ObjectWidget {...layoutWidgetProps} />;
};

export default RenderObject;
