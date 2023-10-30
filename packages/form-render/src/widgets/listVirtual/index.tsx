import React from 'react';
import { Table, Form, Space, Popconfirm, Button, Divider, Tooltip } from 'antd';
import type { FormListFieldData, TableColumnsType } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, PlusOutlined, CloseOutlined, CopyOutlined, InfoCircleOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import VirtualCell from './virtualCell';
import { useVT } from 'virtualizedtableforantd4';
import FButton from '../components/FButton';
import sortProperties from '../../models/sortProperties';

import './index.less';

interface ListVirtualProps {
  fields: FormListFieldData[];
  schema: any;
  delConfirmProps: any;
  renderCore: any;
  rootPath: any;
  [key: string]: any;
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
    hideOperate,

    addItem,
    copyItem,
    moveItem,
    removeItem,
    configContext,
    validatePopover,
  } = props;

  const { globalConfig } = configContext;
  const islidatePopover = validatePopover ?? globalConfig?.listValidatePopover ?? true;

  const { colHeaderText, ...otherActionColumnProps } = actionColumnProps;

  const itemSchema = schema?.items?.properties || {};

  const [vt, set_components] = useVT(() => ({ scroll: { y: scrollY } }), []);

  const handleCopy = (name: number) => {
    const value = form.getFieldValue(rootPath.concat(name));
    copyItem(value);
  };

  const columns: TableColumnsType<FormListFieldData> = sortProperties(Object.entries(itemSchema)).map(([dataIndex, item]) => {
    const { required, title, width, tooltip } = item;
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
              ...itemSchema[dataIndex],
              fieldCol: 24,
            }
          }
        };

        if (!islidatePopover) {
          return (
            <div className='fr-table-cell-content'>
              {renderCore({ parentPath: [field.name], rootPath: [...rootPath, field.name], schema: fieldSchema })}
            </div>
          )
        }

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
          </Space>
        </Form.Item>
      )
    });
  }

  return (
    <>
      <Table
        className={classnames('fr-virtual-list', { 'fr-virtual-list-no-popover': !islidatePopover })}
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
