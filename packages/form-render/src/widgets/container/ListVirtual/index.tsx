import React from 'react';
import { Table, Form, Space, Popconfirm, Button, Divider } from 'antd';
import type { FormListFieldData, TableColumnsType } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, PlusOutlined, CloseOutlined, CopyOutlined } from '@ant-design/icons';
import VirtualCell from './virtualCell';
import { useVT } from 'virtualizedtableforantd4';
import FButton from '../../components/FButton';

import './index.less';

interface ListVirtualProps {
  fields: FormListFieldData[];
  schema: any;
  delConfirmProps: any;
  renderCore: any;
  rootPath: any;
  [key: string]: any;
};

const VirtualList: React.FC<ListVirtualProps> = (props) => {
  const {
    form,
    schema,
    fields,
    rootPath,
    renderCore,
    readOnly,
    
    operateBtnType,
    addBtnProps,
    delConfirmProps,
    copyBtnProps,
    deleteBtnProps,
    moveUpBtnProps,
    moveDownBtnProps,
    actionColumnProps,
    
    scrollY = 600,
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

  const [vt, set_components] = useVT(() => ({ scroll: { y: scrollY } }), []);

  const handleCopy = (name: number) => {
    const value = form.getFieldValue(rootPath.concat(name));
    copyItem(value);
  };

  const columns: TableColumnsType<FormListFieldData> = Object.keys(itemSchema).map((dataIndex: string) => {
    const { required, title, width } = itemSchema[dataIndex];
    return {
      dataIndex,
      width,
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
          <VirtualCell
            renderCore={renderCore}
            schema={fieldSchema}
            parentPath={[field.name]}
            rootPath={[...rootPath, field.name]}
            dataIndex={dataIndex}
          />
        );
      }
    };
  });

  if (!readOnly) {
    columns.push({
      title: actionColumnProps.colHeaderText,
      width: '190px',
      fixed: 'right',
      render: (_, field) => (
        <Form.Item>
          <Space className='fr-list-item-operate' split={operateBtnType !== 'icon' && <Divider type='vertical'/>}>
            {!hideMove && (
              <>
                <FButton 
                  disabled={field.name === 0}
                  onClick={() => moveItem(field.name, field.name - 1)}
                  icon={<ArrowUpOutlined/>}
                  {...moveUpBtnProps}
                />
                <FButton 
                  disabled={field.name === fields.length - 1}
                  onClick={() => moveItem(field.name, field.name + 1)}
                  icon={<ArrowDownOutlined/>}
                  {...moveDownBtnProps}
                />
              </>
            )}
            {!hideDelete && (
              <Popconfirm
                onConfirm={() => removeItem(field.name)}
                {...delConfirmProps}
              >
                <FButton
                  icon={<CloseOutlined/>}
                  btnType={operateBtnType}
                  {...deleteBtnProps}
                />
              </Popconfirm>
            )}
            {!hideCopy && (
              <FButton 
                onClick={() => handleCopy(field.name)}
                icon={<CopyOutlined/>}
                {...copyBtnProps}
              />
            )}
          </Space>
        </Form.Item>
      )
    });
  }

  return (
    <>
      <Table
        className='fr-virtual-list'
        size='middle'
        columns={columns}
        dataSource={fields}
        pagination={false}
        scroll={{ y: scrollY }}
        components={vt}
      />
      {(!schema.max || fields.length < schema.max) && !hideAdd && (
        <Button
          icon={<PlusOutlined />}
          onClick={() => addItem()}
          {...addBtnProps}
        />
      )}
    </>
  );
}


export default VirtualList;
