import React from 'react';
import { Row } from 'antd';
import FieldItem from './fieldItem';
import FieldList from './fieldList';

const renderItem = ({ schema, path, index, rootPath }) => {

  let childContent: React.ReactNode = null;

  // 存在嵌套子协议
  if (schema?.properties) {
    childContent = (
      <Row gutter={8}>
        {RenderCore({ schema, parentPath: path, rootPath })}
      </Row>
    );
    path = null;
  }

  if (schema.type === 'array') {
    debugger
    return (
      <FieldList
        key={index}
        schema={schema}
        path={path}
        rootPath={rootPath}
        children= {childContent}
        renderCore={RenderCore}
      />
    );
  }

  return (
    <FieldItem
      key={index}
      schema={schema}
      path={path}
      children= {childContent}
      renderCore={RenderCore}
      rootPath={rootPath}
    />
  );
}

const RenderCore = (props: any) => {
  const { schema, parentPath = [], rootPath = [], ...otherProps } = props;

  // 渲染 List.item
  if (schema.items) {
    return renderItem({ schema: schema.items, path: parentPath, rootPath, ...otherProps });
  }

  return Object.keys(schema?.properties || {}).map((key, index) => {
    const itemSchema = schema.properties[key];
    const path: string[] | null = [...(parentPath || []), key];

    return renderItem({ schema: itemSchema, path, index, rootPath, ...otherProps })
  });
}

export default RenderCore;
