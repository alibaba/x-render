import _ from 'lodash';
import React from 'react';
import FiledItem from './field-item';

const FRender = (props) => {
  const { schema, _namePath = [] } = props;
  console.log(_namePath, '---------')

  return Object.keys(schema?.properties || {}).map((path, index) => {
    let children = null;
    let namePath = [...(_namePath || []), path];

    console.log(namePath, '-----------')
    if (schema.properties[path]?.properties) {
      children = FRender({ schema: schema.properties[path], _namePath: namePath });
      namePath = null;
    } else if (schema.properties[path]?.type) {
      
    }

      if (schema.properties[path]?.properties) {
        children = FRender({
          schema: schema.properties[path],
          _namePath: namePath,
        });
        namePath = null;
      } else if (schema.properties[path]?.type) {
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
};

export default FRender;
