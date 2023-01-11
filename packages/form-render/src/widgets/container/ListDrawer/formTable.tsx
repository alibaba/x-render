import React from 'react';
import { Space, Table, Form, Button } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import type { FormListFieldData, FormListOperation, TableColumnsType } from 'antd';
import get from 'lodash-es/get';
import keys from 'lodash-es/keys';
import FormDrawer from './formDrawer';
import './index.less';

interface Props {
  schema: any;
  fields: FormListFieldData[];
  operation: FormListOperation;
  listName: (string | number)[];
  prefix: string;
}


const Content: React.FC<{ value?: any }> = ({ value }) => (typeof value === 'string' || typeof value === 'number') ? <>{value || '-'}</> : null;

const FormTable: React.FC<Props> = ({ schema, fields, operation, listName, prefix }) => {

  const { add, remove, move } = operation;
  const itemsSchema = get(schema, 'items.properties', {});
  const form = Form.useFormInstance();
  const drawerRef = React.useRef(null);

  // just trigger rerender when drawer form change
  Form.useWatch(listName, form);

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
      render: (_, field) => (
        <Form.Item {...field} name={[field.name, i]} noStyle >
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
          <a onClick={() => {
            drawerRef.current?.open({
              name: field.name,
              value: form.getFieldValue(listName.concat(field.name)),
            })
          }}>编辑</a>
          <a onClick={() => remove(field.name)}>删除</a>
          <ArrowUpOutlined onClick={() => move(index, index - 1)} />
          <ArrowDownOutlined onClick={() => move(index, index + 1)} />
        </Space>
      )
    }
  })


  const onAdd = () => {
    const maxName = fields.sort((a, b) => b.name - a.name)?.[0]?.name;
    let newName = 0
    if (typeof maxName === 'number') {
      newName = maxName + 1;
    }
    add();
    drawerRef.current?.open({
      name: newName,
    })
  }


  return (
    <>
      <div className={`${prefix}-table-header`}>
        <Button onClick={onAdd} size="small" type="primary">
          新增一条
        </Button>
      </div>
      <Table
        size='small'
        dataSource={fields}
        columns={columns}
        pagination={false}
      />
      <FormDrawer
        ref={drawerRef}
        schema={schema}
        listName={listName}
      />
    </>
  )
}

export default FormTable;