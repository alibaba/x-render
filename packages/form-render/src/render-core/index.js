import React from 'react';
import { Row } from 'antd';
import FiledItem from './fieldItem';

const RenderCore = (props) => {
  const { schema, _namePath = [] } = props;

  return Object.keys(schema?.properties || {}).map((path, index) => {
    let children = null;
    let namePath = [...(_namePath || []), path];

    if (schema.properties[path]?.properties) {
      children = RenderCore({ schema: schema.properties[path], _namePath: namePath });
      namePath = null;
    } else if (schema.properties[path]?.type) {
      
    }

      if (schema.properties[path]?.properties) {
        children = RenderCore({
          schema: schema.properties[path],
          _namePath: namePath,
        });
        namePath = null;
      } else if (schema.properties[path]?.type === 'object') {
        children = (
          <Row gutter={8}>
            {children}
          </Row>
        );
      }

      return (
        <FiledItem
          key={index}
          schema={schema.properties[path]}
          name={namePath}
          children={children}
        />
      );
    }
  );
}

export default RenderCore;
