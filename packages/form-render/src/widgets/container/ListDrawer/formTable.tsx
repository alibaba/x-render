import React from 'react';
import { Space, Table, Form } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import type { FormListFieldData, FormListOperation, TableColumnsType } from 'antd';
import get from 'lodash-es/get';
import keys from 'lodash-es/keys';
import FormDrawer from './formDrawer';
import './index.less';

interface Props {
  schema: any,
  fields: FormListFieldData[],
  operation: FormListOperation,
  listName: string,
}

const prefix = 'fr-drawer-list';

const Content: React.FC<{ value?: any }> = ({ value }) => {
  return (
    <>{value || '-'}</>
  )
}

const FormTable: React.FC<Props> = ({ schema, fields, operation, listName }) => {

  const renderTitle = ({ title, required }: { title: string, required?: boolean }) => {
    return (
      <div>
        {required && <span className={`${prefix}-required-marker`}>*</span>}
        <span className={`${prefix}-title`}>{title}</span>
      </div>
    )
  }

  const itemsSchema = get(schema, 'items.properties', {});
  const items: TableColumnsType<FormListFieldData> = keys(itemsSchema).map(i => {
    return {
      title: renderTitle(itemsSchema[i]),
      dataIndex: i,
      render: (val, row, index) => (
        <Form.Item name={[fields[index].name, i]} noStyle>
          <Content />
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
          <FormDrawer field={field} schema={schema} listName={listName}>
            <a>编辑</a>
          </FormDrawer>
          <a onClick={() => operation.remove(index)}>删除</a>
          <ArrowUpOutlined onClick={() => operation.move(index, index - 1)} />
          <ArrowDownOutlined onClick={() => operation.move(index, index + 1)} />
        </Space>
      )
    }
  })

  return (
    <Table
      size='small'
      dataSource={fields}
      columns={columns}
      pagination={false}
    />
  )
}

export default FormTable;