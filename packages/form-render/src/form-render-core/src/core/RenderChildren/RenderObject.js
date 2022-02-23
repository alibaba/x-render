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
  const { widgets } = useTools();

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
    dataIndex,
    hideTitle,
  };

  const displayProps = {
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

  return <ObjectWidget {...displayProps} />;
};

export default RenderObject;
