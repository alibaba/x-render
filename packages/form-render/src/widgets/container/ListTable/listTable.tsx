import React from 'react';
import { Table, Form, Space } from 'antd';
import type { FormListFieldData, FormListOperation, TableColumnsType } from 'antd'
import keys from 'lodash-es/keys';
import get from 'lodash-es/get';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import renderCore from '../../../render-core';

interface ListTableProps {
  fields: FormListFieldData[];
  schema: any;
  operation: FormListOperation;
  listName: any[];
}

const ListTable: React.FC<ListTableProps> = ({ fields, schema, operation, listName }) => {

  const form = Form.useFormInstance();
  const itemsSchema = get(schema, 'items.properties', {});
  const { add, remove, move } = operation;

  const items: TableColumnsType<FormListFieldData> = keys(itemsSchema).map(i => {

    const { required, title } = itemsSchema[i];

    return {
      dataIndex: i,
      title: (
        <>
          {required && <span style={{ color: 'red' }}>*</span>}
          <span>{title}</span>
        </>
      ),
      render: (_,field) => {
        const childSchema = {
          type: 'object',
          properties: {
            [i]: {
              ...itemsSchema[i],
              title: '',
              noStyle: true,
            },
          }
        }
        return renderCore({ schema: childSchema, parentPath: [field.name] })
      },
    }
  });

  const columns = items.concat({
    title: '操作',
    width: 150,
    render: (_, field, index) => {
      return (
        <Space>
          <a onClick={() => copy(field.name)}>复制</a>
          <a onClick={() => remove(field.name)}>删除</a>
          <ArrowUpOutlined onClick={() => move(index, index - 1)} />
          <ArrowDownOutlined onClick={() => move(index, index + 1)} />
        </Space>
      )
    }
  })

  const copy = (name: number) => {
    const value = form.getFieldValue(listName.concat(name))
    add(value);
  }

  return (
    <Table
      columns={columns}
      dataSource={fields}
      pagination={false}
    />
  )
}

export default ListTable;
