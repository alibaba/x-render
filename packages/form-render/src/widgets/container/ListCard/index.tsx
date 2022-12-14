import React from 'react';
import { Form, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import renderCore from '../../../render-core';

const CardList = (props: any) => {
  const { name: listName, schema } = props;

  return (
    <Form.List name={listName}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => {
            return renderCore({ schema: schema.items, parentPath: [name], parentLitPath: [...listName, name] })
          })}
          <Form.Item>
            <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
              新增一条
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
}

export default CardList;
