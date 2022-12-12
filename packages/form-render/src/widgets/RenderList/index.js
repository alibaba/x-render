import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';

import renderer from '../../render-core';

const App = (props) => {
  return (
    <Form.List name="users">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            renderer({ schema: props.schema.items, namePath: [name]})
          ))}
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