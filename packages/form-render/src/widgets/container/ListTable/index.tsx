import React from 'react';
import { Button, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TableList from './tableList';
import './index.less'

export default (props: any) => {
  const { name, schema, readyOnly, renderCore, rootPath, form } = props;
  const { addBtnProps, hideAdd, addItem, removeItem, moveItem, copyItem } = schema?.props || {};

  return (
    <Form.List name={name}>
      {(fields, operation) => (
        <>
          <TableList
            {...schema?.props}
            form={form}
            fields={fields}
            schema={schema?.items?.properties}
            listName={name}
            renderCore={renderCore}
            rootPath={rootPath}
            readyOnly={readyOnly}
            removeItem={removeItem(operation.remove)}
            moveItem={moveItem(operation.move)}
            copyItem={copyItem(operation.add)}
          />
          {!hideAdd && (
            <Form.Item noStyle>
              <Button
                icon={<PlusOutlined />}
                onClick={addItem(operation.add)}
                {...addBtnProps}
              />
            </Form.Item>
          )}
        </>
      )}
    </Form.List>
  );
}
