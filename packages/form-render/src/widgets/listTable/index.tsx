import React from 'react';
import { Table, Form, Space, Popconfirm, Button, Divider, Tooltip } from 'antd';
import type { FormListFieldData, TableColumnsType } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, PlusOutlined, CloseOutlined, CopyOutlined, InfoCircleOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import TableCell from './tableCell';
import FButton from '../components/FButton';
import sortProperties from '../../models/sortProperties';

import './index.less';

interface ListTableProps {
  fields: FormListFieldData[];
  schema: any;
  delConfirmProps: any;
  renderCore: any;
  rootPath: any;
  /*
   * 没有数据时是否隐藏表格
   */
  hideEmptyTable?: boolean;
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

const TableList: React.FC<ListTableProps> = (props) => {
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
    pagination,

    hideDelete,
    hideCopy,
    hideMove,
    hideAdd,
    hideOperate,
    hideEmptyTable,
    addItem,
    copyItem,
    moveItem,
    removeItem,
    configContext,
    validatePopover,
    ...retProps
  } = props;

  const { globalConfig } = configContext;
  const islidatePopover = validatePopover ?? globalConfig?.listValidatePopover ?? true;

  const { colHeaderText, ...otherActionColumnProps } = actionColumnProps;
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

  const columns: any = sortProperties(Object.entries(itemSchema)).map(([dataIndex, item]) => {
    const { required, title, width, tooltip, columnHidden } = item;
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
          <TableCell
            renderCore={renderCore}
            schema={fieldSchema}
            parentPath={[field.name]}
            rootPath={[...rootPath, field.name]}
            dataIndex={dataIndex}
          />
        );
      }
    };
  }).filter(item => item);

  if (!readOnly && !hideOperate) {
    columns.push({
      title: colHeaderText,
      width: '190px',
      fixed: 'right',
      ...otherActionColumnProps,
      render: (_, field) => (
        <Form.Item>
          <Space className='fr-list-item-operate' split={operateBtnType !== 'icon' && <Divider type='vertical' />}>
            {!hideMove && (
              <>
                <FButton
                  disabled={field.name === 0}
                  onClick={() => moveItem(field.name, field.name - 1)}
                  icon={<ArrowUpOutlined />}
                  {...moveUpBtnProps}
                />
                <FButton
                  disabled={field.name === fields.length - 1}
                  onClick={() => moveItem(field.name, field.name + 1)}
                  icon={<ArrowDownOutlined />}
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
                  icon={<CloseOutlined />}
                  btnType={operateBtnType}
                  {...deleteBtnProps}
                />
              </Popconfirm>
            )}
            {!hideCopy && (
              <FButton
                onClick={() => handleCopy(field.name)}
                icon={<CopyOutlined />}
                {...copyBtnProps}
              />
            )}
          </Space>
        </Form.Item>
      )
    });
  }

  const showTable = fields.length > 0 ? true : !hideEmptyTable;

  return (
    <div className={classnames('fr-table-list', { 'fr-table-list-no-popover': !islidatePopover })}>
      {showTable && (
        <Table
          size='middle'
          scroll={{ x: 'max-content' }}
          style={{ marginBottom: '12px' }}
          {...retProps}
          columns={columns}
          dataSource={fields}
          pagination={paginationConfig}
        />
      )}
      {(!schema.max || fields.length < schema.max) && !hideAdd && (
        <Button
          icon={<PlusOutlined />}
          onClick={() => addItem()}
          {...addBtnProps}
        />
      )}
    </div>
  );
}

export default TableList;
