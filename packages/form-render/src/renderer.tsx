import React from 'react';
import FiledItem from './FiledItem';

const FRender = (props: any): any => {
  const { schema, _namePath = [] } = props;

  return Object.keys(schema?.properties || {}).map(
    (path: any, index: number) => {
      let children = null;
      let namePath: any = [..._namePath, path];

      console.log(namePath, '-----------');
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
