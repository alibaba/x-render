import React from 'react';
import { Button, Form } from 'antd';
import ListTable from './listTable';

const CardList = (props: any) => {
  const { name, schema } = props;

  return (
    <Form.List name={name}>
      {(fields, operation) => (
        <>
          <ListTable
            fields={fields}
            operation={operation}
            schema={schema}
            listName={name}
          />
          <Form.Item noStyle>
            <Button 
              onClick={() => operation.add()}
              style={{ borderStyle: 'dashed', width: '100%', marginTop: 10}}
            >
              增加一条
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
}

export default CardList;
