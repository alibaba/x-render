



import React, { useState, useRef } from 'react';
import { Space, Table, Form, Button, Popconfirm, Tooltip, Divider } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, PlusOutlined, InfoCircleOutlined, CloseOutlined, CopyOutlined } from '@ant-design/icons';
import type { FormListFieldData, FormListOperation, TableColumnsType } from 'antd';
import sortProperties from '../../models/sortProperties';
import FormDrawer from './drawerForm';
import FButton from '../components/FButton';
import './index.less';

interface Props {
  schema: any;
  fields: FormListFieldData[];
  operation: FormListOperation;
  prefix: string;
  [key: string]: any
};

const getTooltip = (tooltip: any) => {
  if (!tooltip) {
    return;
  }

  if (typeof tooltip === 'string') {
    return { title: <span dangerouslySetInnerHTML={{ __html: tooltip }} /> };
  }

  return {
    ...tooltip,
    title: <span dangerouslySetInnerHTML={{ __html: tooltip.title }} />,
  };
};

const TableList: React.FC<Props> = (props: any) => {
  const {
    form,
    schema,
    fields,
    rootPath,
    renderCore,
    readOnly,
    widgets,
    pagination,
    
    operateBtnType,
    addBtnProps,
    delConfirmProps,
    copyBtnProps,
    deleteBtnProps,
    moveUpBtnProps,
    moveDownBtnProps,
    actionColumnProps,
    editorBtnProps,

    hideOperate,
    hideDelete,
    hideCopy,
    hideMove,
    hideAdd,
    hideEdit,

    operation,
    addItem,
    copyItem,
    moveItem,
    removeItem,
    configContext,
  } = props;

  const { colHeaderText, ...otherActionColumnProps } = actionColumnProps;
  const paginationConfig = {
    size: 'small',
    hideOnSinglePage: true,
    ...pagination,
  };
  const columnSchema = schema?.items?.properties || {};

  const [visible, setVisible] = useState(false);
  const [itemData, setItemData] = useState(null);
  const indexRef = useRef<any>(null);
  
  const handleCopy = (name: number) => {
    const value = form.getFieldValue(rootPath.concat(name));
    copyItem(value);
  };

  const handleAdd = () => {
    setVisible(true);
    addItem();
  };

  const handleRepeal = () => {
    if (!indexRef.current && indexRef.current !== 0) {
      operation.remove(fields.length-1);
    } else {
      form.setFieldValue([...rootPath, indexRef.current], itemData);
    }
    hanldeConfirm();
  };

  const hanldeConfirm = () => {
    setItemData(null);
    setVisible(false);
    indexRef.current = null;
  };

  const columns: any = sortProperties(Object.entries(columnSchema)).map(([dataIndex, item]) => {
    const { required, title, tooltip, width, columnHidden } = item;
    if (columnHidden) {
      return null;
    }

    const tooltipProps = getTooltip(tooltip);
    return {
      dataIndex,
      width,
      title: (
        <>
          {required && <span style={{ color: 'red', marginRight: '3px' }}>*</span>}
          <span>{title}</span>
          {tooltipProps && (
            <Tooltip placement='top' {...tooltipProps}>
              <InfoCircleOutlined style={{ marginLeft: 6 }} />
            </Tooltip>
          )}
        </>
      ),
      render: (_, field) => {
        const fieldSchema = {
          type: 'object',
          properties: {
            [dataIndex]: {
              ...columnSchema[dataIndex],
              noStyle: true,
              readOnly: true,
            }
          }
        };
        return renderCore({ schema: fieldSchema, parentPath: [field.name], rootPath: [...rootPath, field.name] });
      }
    }
  }).filter(item => item);

  if (!readOnly && !hideOperate) {
    columns.push({
      title: colHeaderText,
      width: '190px',
      fixed: 'right',
      ...otherActionColumnProps,
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
            {!hideEdit && (
              <FButton 
                onClick={() => {
                  setVisible(true);
                  indexRef.current = field.name;
                  setItemData(form.getFieldValue(rootPath.concat(field.name)));
                }}
                icon={<CopyOutlined/>}
                {...editorBtnProps}
              />
            )}
          </Space>
        </Form.Item>
      )
    });
  }

  return (
    <div className='fr-list-drawer'>
      <Table
        size='middle'
        dataSource={fields}
        columns={columns}
        style={{ marginBottom: '12px' }}
        scroll={{ x: 'max-content' }}
        pagination={paginationConfig}
      />
      {(!schema.max || fields.length < schema.max) && !hideAdd && (
        <Button
          icon={<PlusOutlined />}
          onClick={handleAdd}
          {...addBtnProps}
        />
      )}
      {visible && (
        <FormDrawer
          schema={schema}
          data={itemData}
          widgets={widgets}
          configContext={configContext}
          onClose={handleRepeal}
          onConfirm={hanldeConfirm}
        >
          {renderCore({ schema: schema.items, parentPath: [fields.length - 1], rootPath: [...rootPath, fields.length - 1] })}
        </FormDrawer>
      )}
    </div>
  );
}

export default TableList;