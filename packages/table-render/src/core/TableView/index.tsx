import React, { useEffect, useRef } from 'react';
import { Table, TableProps, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import { getDate, getDateTime, getMoneyType, getDateRange, isObject, isFunction } from '../../utils';
import { renderDom } from './field';
import { TablePropsC } from '../../types';

const ProTable: <RecordType extends object = any>(
  props: TablePropsC<RecordType>
) => React.ReactElement = props => {
  //@ts-ignore
  if (props.dataSource) {
    console.error(
      '设置table-render的数据请使用api，具体使用可参考：https://form-render.github.io/table-render/guide/demo#%E5%9F%BA%E6%9C%AC-demo'
    );
  }

  const { getState, setState, doSearch, columns, pageChangeWithRequest = true, ...otherProps }: any = props;
  const { dataSource = [], loading, pagination, tableSize }: any = getState();

  const handleChange = ({ current, pageSize }, filters, sorter, extra) => {
    if (extra?.action === 'filter') {
      setState({ pagination: { ...pagination, current, pageSize, total: extra.currentDataSource.length }, sorter });
    } else {
      setState({ pagination: { ...pagination, current, pageSize }, sorter });
    }
    if (!pageChangeWithRequest || extra?.action === 'filter') {
      return;
    }
    doSearch({ current, pageSize, sorter });
  };

  const newColumns = columns.map((item: any) => {
    const { tooltip, ...otherItem } = item;
    const result = otherItem;

    // 兼容 tooltip 模式
    if (typeof result.title === 'string' && tooltip) {
      let tooltipProps = isObject(tooltip) ? tooltip : { title: tooltip };
      if (isFunction(tooltip)) {
        tooltipProps = tooltip();
      }
      result.title = (
        <>
          {result.title}
          <Tooltip placement='top' {...tooltipProps}>
            <InfoCircleOutlined style={{ marginLeft: 6 }} />
          </Tooltip>
        </>
      );
    }

    // 用户在columns中自定义的render会覆盖tr的预设render
    if (result.render) {
      return result;
    }

    if (isFunction(result.valueTypeProps)) {
      result.render = (value: any, record: any, index: number) => {
        if (result.valueType === 'tags') {
          return renderDom(value, { ...item });
        }

        const { type, ... domProps } = result.valueTypeProps(value, record);
        return renderDom(value, { ...item,  valueTypeProps: domProps });
      }
      return result;
    }

    switch (result.valueType) {
      case 'date':
        result.render = (value: any) => renderDom(getDate(value, result.valueTypeProps?.format), result);
        break;
      case 'dateTime':
        result.render = (value: any) => renderDom(getDateTime(value, result.valueTypeProps?.format), result);
        break;
      case 'dateRange':
        result.render = (value: any, record: any) => renderDom(getDateRange(value, { result, record }), result);
        break;
      case 'dateRangeTime':
        result.render = (value: any, record: any) => renderDom(getDateRange(value,  { result, record }, 'YYYY-MM-DD HH:mm:ss'), result);
        break;
      case 'money':
        result.render = (value: any) => renderDom(getMoneyType(value), result);
        break;
      case 'code':
        result.render = (value: any) => renderDom(value, result);
        break;
      case 'progress':
      case 'tag':
        result.render = (value: any) => renderDom(value, result);
        break;
      case 'text':
      default:
        result.render = (value: any) => renderDom(value, result);
    }
    return result;
  });

  const tableProps: TableProps<typeof dataSource[number]> = {
    rowKey: 'id',
    ...otherProps,
    columns: newColumns,
    onChange: handleChange,
    // dataSource不准在使用ProTable时用props赋值
    dataSource,
    pagination:
      props.pagination === false
        ? false
        : {
          // onChange: onPageChange,
          size: 'small',
          ...props.pagination,
          pageSize: props.pagination?.pageSize || pagination.pageSize,
          total: props.pagination?.total || pagination.total,
          current: props.pagination?.current || pagination.current,
        },
    loading,
    size: tableSize,
  };
  return <Table {...tableProps} />
}

export default ProTable;

