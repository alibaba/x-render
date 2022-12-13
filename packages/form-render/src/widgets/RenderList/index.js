import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';

import RenderCore from '../../render-core';

const App = (props) => {
  const { name: parentName } = props;
 
  return (
    <Form.List name={parentName}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => {
           
            return RenderCore({ schema: props.schema.items, parentNamePath: [name]})
          })}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              Add field
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default App;