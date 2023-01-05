import React from 'react';
import { Form, Button } from 'antd';
import FormTable from './formTable';
import './index.less';

const prefix = 'fr-list-drawer';

const DrawerList = (props: any) => {
  const { name, schema } = props;

  return (
    <Form.List name={name}>
      {(fields, operation) => (
        <div className={prefix}>
          <FormTable
            prefix={prefix}
            listName={name}
            schema={schema}
            fields={fields}
            operation={operation}
          />
        </div>
      )}
    </Form.List>
  );
}

export default DrawerList;
