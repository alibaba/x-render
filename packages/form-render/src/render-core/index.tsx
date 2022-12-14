import React from 'react';
import { Row } from 'antd';
import FieldItem from './fieldItem';
import FieldList from './fieldList';

const renderItem = ({ schema, path, index }) => {

  let childContent: React.ReactNode = null;

  // 存在嵌套子协议
  if (schema?.properties) {
    childContent = (
      <Row gutter={8}>
        {RenderCore({ schema, parentPath: path })}
      </Row>
    );
    path = null;
  }

  if (schema.type === 'array') {
    return (
      <FieldList
        key={index}
        schema={schema}
        path={path}
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
    />
  );
}

const RenderCore = (props: any) => {
  const { schema, parentPath = [] } = props;

  return Object.keys(schema?.properties || {}).map((key, index) => {
    const itemSchema = schema.properties[key];
    const path: string[] | null = [...(parentPath || []), key];

    return renderItem({ schema: itemSchema, path, index })
  });
}

export default RenderCore;
