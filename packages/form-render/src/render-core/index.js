import React from 'react';
import { Row } from 'antd';
import FiledItem from './fieldItem';

const RenderCore = (props) => {
  const { schema, parentNamePath = [] } = props;

  return Object.keys(schema?.properties || {}).map((path, index) => {
    const fieldSchema = schema.properties[path];

    let childContent = null;
    let namePath = [...(parentNamePath || []), path];

    // 存在嵌套子协议
    if (fieldSchema?.properties) {
      childContent = (
        <Row gutter={8}>
          {RenderCore({ schema: fieldSchema, parentNamePath: namePath })}
        </Row>
      );
      namePath = null;
    } 
  
    return (
      <FiledItem
        key={index}
        schema={fieldSchema}
        name={namePath}
        children= {childContent}
      />
    );
  });
}

export default RenderCore;
