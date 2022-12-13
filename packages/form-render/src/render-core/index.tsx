import React from 'react';
import { Row } from 'antd';
import FieldItem from './fieldItem';
import FieldList from './fieldList';

const RenderCore = (props) => {
  const { schema, parentNamePath = [] } = props;

  return Object.keys(schema?.properties || {}).map((path, index) => {
    const fieldSchema = schema.properties[path];

    let childContent: React.ReactNode = null;
    let namePath: string[] | null = [...(parentNamePath || []), path];

    // 存在嵌套子协议
    if (fieldSchema?.properties) {
      childContent = (
        <Row gutter={8}>
          {RenderCore({ schema: fieldSchema, parentNamePath: namePath })}
        </Row>
      );
      namePath = null;
    }

    if (fieldSchema.type === 'array') {
      return (
        <FieldList
          key={index}
          schema={fieldSchema}
          name={namePath}
          children= {childContent}
          renderCore={RenderCore}
        />
      );
    }

    return (
      <FieldItem
        key={index}
        schema={fieldSchema}
        name={namePath}
        children= {childContent}
        renderCore={RenderCore}
      />
    );
  });
}

export default RenderCore;
