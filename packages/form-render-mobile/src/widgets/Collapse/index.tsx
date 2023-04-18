import React from 'react';
import { Collapse } from 'antd-mobile';

export default ({ schema, addons, renderCore, ...props }) => {
  const { items } = schema;

  return (
    <Collapse defaultActiveKey={['1']} {...props}>
      {Object.keys(items).map((key: string) => {
        const { type, properties, ...other } = items[key];
        return (
          <Collapse.Panel key={key} {...other}>
            {renderCore({ schema: { type, properties }, parentPath: [key] })}
          </Collapse.Panel>
        );
      })}
    </Collapse>
  );
}
