import React from 'react';
import { Form, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import renderCore from '../../../render-core';

const CardList = (props: any) => {
  const { name, schema } = props;

  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => {
            return renderCore({ schema: schema.items, parentNamePath: [name]})
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
