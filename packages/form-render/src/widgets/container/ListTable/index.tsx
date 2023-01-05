import React from 'react';
import { Button, Form } from 'antd';
import ListTable from './listTable';

const CardList = (props: any) => {
  const { name, schema } = props;

  return (
    <Form.List name={name}>
      {(fields, operation) => (
        <>
          <Form.Item noStyle>
            <Button type="primary" onClick={() => operation.add()} size="small" style={{ float: 'right', marginBottom: 10 }}>
              增加一条
            </Button>
          </Form.Item>
          <ListTable
            fields={fields}
            operation={operation}
            schema={schema}
            listName={name}
          />
        </>
      )}
    </Form.List>
  );
}

export default CardList;
