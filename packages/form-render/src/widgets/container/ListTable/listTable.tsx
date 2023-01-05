import React from 'react';
import { Table, Form, Space } from 'antd';
import type { FormListFieldData, FormListOperation, TableColumnsType } from 'antd'
import keys from 'lodash-es/keys';
import get from 'lodash-es/get';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { getWidgetName } from 'form-render/render-core/mapping';
import { getWidgetProps } from 'form-render/render-core/methods';
import { widgets } from 'form-render/widgets';

interface ListTableProps {
  fields: FormListFieldData[];
  schema: any;
  operation: FormListOperation
  listName: string[];
}

const ListTable: React.FC<ListTableProps> = ({ fields, schema, operation, listName }) => {

  const form = Form.useFormInstance();
  const itemsSchema = get(schema, 'items.properties', {});
  const { add, remove, move } = operation;

  const items: TableColumnsType<FormListFieldData> = keys(itemsSchema).map(i => {

    const { required, title } = itemsSchema[i];

    const widgetName = getWidgetName(itemsSchema[i]);
    const Widget = widgets[widgetName || 'html'];
    const widgetProps = getWidgetProps({ schema: itemsSchema[i], widgets, children: null });

    return {
      dataIndex: i,
      title: (
        <>
          {required && <span style={{ color: 'red' }}>*</span>}
          <span>{title}</span>
        </>
      ),
      render: (_, field) => (
        <Form.Item {...field} name={[field.name, i]} noStyle >
          <Widget {...widgetProps} />
        </Form.Item>
      )
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
      size='small'
      columns={columns}
      dataSource={fields}
      pagination={false}
    />
  )
}

export default ListTable;