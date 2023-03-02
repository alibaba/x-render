import React from 'react';
import { Table, Form, Space, Popconfirm, Button } from 'antd';
import type { FormListFieldData, TableColumnsType } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, PlusOutlined } from '@ant-design/icons';
import TableCell from './tableCell';
import './index.less';

interface ListTableProps {
  fields: FormListFieldData[];
  schema: any;
  delConfirmProps: any;
  renderCore: any;
  rootPath: any;
  [key: string]: any;
};

const TableList: React.FC<ListTableProps> = (props) => {
  const {
    form,
    schema,
    fields,
    rootPath,
    renderCore,
    readOnly,

    addBtnProps,
    delConfirmProps,
    actionColumnProps,
    pagination,

    hideDelete,
    hideCopy,
    hideMove,
    hideAdd,

    addItem,
    copyItem,
    moveItem,
    removeItem,
  } = props;

  const itemSchema = schema?.items?.properties || {};

  const paginationConfig = {
    size: 'small',
    hideOnSinglePage: true,
    ...pagination,
  };

  const handleCopy = (name: number) => {
    const value = form.getFieldValue(rootPath.concat(name));
    copyItem(value);
  };

  const columns: TableColumnsType<FormListFieldData> = Object.keys(itemSchema).map((dataIndex: string) => {
    const { required, title } = itemSchema[dataIndex];
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
              ...itemSchema[dataIndex],
              noStyle: true,
            }
          }
        };
        return (
          <TableCell
            renderCore={renderCore}
            schema={fieldSchema}
            parentPath={[field.name]}
            rootPath={rootPath}
            dataIndex={dataIndex}
          />
        );
      }
    };
  });

  if (!readOnly) {
    columns.push({
      title: actionColumnProps.colHeaderText,
      width: 150,
      render: (_, field) => (
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
                <ArrowUpOutlined style={{ color: '#1890ff' }} onClick={() => moveItem(field.name, field.name - 1)} />
                <ArrowDownOutlined style={{ color: '#1890ff' }} onClick={() => moveItem(field.name, field.name + 1)} />
              </>
            )}
          </Space>
        </Form.Item>
      )
    });
  }

  return (
    <div className='fr-table-list'>
      <Table
        size='middle'
        columns={columns}
        dataSource={fields}
        pagination={paginationConfig}
        scroll={{ x: 'max-content' }}
        style={{ marginBottom: '12px'}}
      />
      {(!schema.max || fields.length < schema.max) && !hideAdd && (
        <Button
          icon={<PlusOutlined />}
          onClick={addItem}
          {...addBtnProps}
        />
      )}
    </div>
  );
}

export default TableList;
