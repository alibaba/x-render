import React from 'react';
import { Table, Form, Space, Popconfirm } from 'antd';
import type { FormListFieldData, TableColumnsType } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import TableCell from './tableCell';

interface ListTableProps {
  fields: FormListFieldData[];
  schema: any;
  listName: any[];
  delConfirmProps: any;
  renderCore: any;
  rootPath: any;
  [key: string]: any;
};

const TableList: React.FC<ListTableProps> = (props) => {
  const { fields, form, schema, listName, delConfirmProps, renderCore, rootPath, readyOnly, actionColumnProps, hideDelete, hideCopy, hideMove, removeItem, copyItem, moveItem } = props;
  
  const handleCopy = (name: number) => {
    const value = form.getFieldValue(listName.concat(name));
    copyItem(value);
  };

  const columns: TableColumnsType<FormListFieldData> = Object.keys(schema).map((dataIndex: string) => {
    const { required, title } = schema[dataIndex];
    return {
      dataIndex,
      title: (
        <>
          {required && <span style={{ color: 'red', marginRight: '3px' }}>*</span>}
          <span>{title}</span>
        </>
      ),
      render: (_, field) => {
        const fieldSchema = {
          type: 'object',
          properties: {
            [dataIndex]: {
              ...schema[dataIndex],
              noStyle: true,
            }
          }
        };
        return (
          <TableCell 
            renderCore={renderCore}
            schema={fieldSchema}
            parentPath={[field.name]}
            rootPath={[...rootPath, ...listName]}
            dataIndex={dataIndex}
          />
        );
      }
    };
  });

  if (!readyOnly) {
    columns.push({
      title: actionColumnProps.colHeaderText,
      width: 150,
      render: (_, field, index) => (
        <Form.Item>
          <Space>
            {!hideCopy && <a onClick={() => handleCopy(field.name)}>{actionColumnProps.copyText}</a>}
            {!hideDelete && (
              <Popconfirm
                {...delConfirmProps}
                onConfirm={() => removeItem(field.name)}
              >
                <a>{actionColumnProps.delText}</a>          
              </Popconfirm>
            )}
            {!hideMove && (
              <>
                <ArrowUpOutlined  style={{ color: '#1890ff' }} onClick={() => moveItem(field.name, field.name - 1)} />
                <ArrowDownOutlined style={{ color: '#1890ff' }} onClick={() => moveItem(field.name, field.name + 1)} />
              </>
            )}
          </Space>
        </Form.Item>
      )
    });
  }

  return (
    <div style={{ margin: '12px 0'}}>
      <Table
        className='fr-table-list'
        size='middle'
        columns={columns}
        dataSource={fields}
        pagination={false}
      />
    </div>
  );
}

export default TableList;
