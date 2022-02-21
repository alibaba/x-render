import React from 'react';
import Core from '../index';
import { useTools } from '../../hooks';

const RenderObject = ({
  schema = {},
  children = [],
  dataIndex = [],
  displayType,
  hideTitle,
}) => {
  const { widgets } = useTools();

  const displayProps = {
    schema,
    children,
    dataIndex,
    displayType,
    hideTitle,
    Field: Core,
  };

  const renderWidget = schema.widget || 'map';
  const ObjectWidget = widgets[renderWidget] || widgets.map;

  return <ObjectWidget {...displayProps} />;
};

export default RenderObject;
