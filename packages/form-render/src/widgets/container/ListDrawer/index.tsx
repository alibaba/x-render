import React from 'react';
import { Form, Button, Drawer, Table, Space } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, PlusOutlined } from '@ant-design/icons';
import renderCore from '../../../render-core';
import get from 'lodash-es/get';
import keys from 'lodash-es/keys';
import { ColumnsType } from 'antd/lib/table';
import FormTable from './formTable';
import './index.less';

const prefix = 'fr-drawer-list';

const DrawerList = (props: any) => {
  const { name = 'name', schema } = props;

  return (
    <Form.List name={name}>
      {(fields, operation) => (
        <>
          <FormTable
            listName={name}
            schema={schema}
            fields={fields}
            operation={operation}
          />
          <Form.Item>
            <Button type='dashed' onClick={() => operation.add()} block icon={<PlusOutlined />}>
              新增一条
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
}

export default DrawerList;
