import React from 'react';
import { Table } from 'antd';
import { isArray, combineClass } from '../../utils/common';
import { getColumns, getDataSource, combineDataSource } from './basic';

import './index.less';

/**
 *
 * 基础表格
 */
const BaseTable = (props: any) => {
  const {
    column,
    data,
    style,
    className,
    onChange,
    combineData,
    expandable,
    pagination: pageConfig,
    columnConfig,
    tableIndexText = '',
    fRender,
    ...tableProps
  } = props;

  let dataList = data || [];
  if (!isArray(dataList)) {
    dataList = [data];
  }

  let pagination = false;
  if (pageConfig) {
    pagination = {
      total: dataList.length,
      showSizeChanger: false,
      showQuickJumper: true,
      pageSize: 10,
      ...pageConfig,
    };
  }

  const columns = getColumns(column, columnConfig, { fRender });
  let dataSource = getDataSource(column, dataList);

  if (column.tableIndex) {
    dataSource = dataSource.map((item: any, index: number) => ({
      ...item,
      tableIndex: tableIndexText + (index + 1),
    }));
  }

  // 表格数据合并
  if (combineData) {
    const { key: combineKey, columns: combineColumns }: any = combineData;
    combineDataSource(dataSource, combineKey);
    columns.forEach((colum: any) => {
      if (combineColumns.includes(colum.key)) {
        colum.onCell = (data: any) => {
          const { rowSpan, colSpan } = data;
          let result: any = {};
          if (typeof rowSpan !== 'undefined') {
            result.rowSpan = rowSpan;
          }
          if (typeof colSpan !== 'undefined') {
            result.colSpan = colSpan;
          }
          return result;
        };
      }
    });
  }

  let customExpandable = null;
  if (expandable) {
    const { children, ...otherExpandable } = expandable;
    customExpandable = {
      ...otherExpandable,
      expandedRowRender: (record: any, index: number, indent: any, expanded: any) => {
        return fRender({ ...record, expandedParams: { index, indent, expanded } }, children);
      },
    };
  }

  return (
    <Table
      className={combineClass('dv-base-table', className)}
      style={style}
      bordered
      size="small"
      pagination={pagination}
      onChange={onChange}
      {...tableProps}
      columns={columns}
      dataSource={dataSource}
      expandable={customExpandable}
    />
  );
};

export default BaseTable;
