import React, { useEffect, useRef } from 'react';
import { Table, TableProps } from 'antd';
import { getDate, getDateTime, getMoneyType } from '../../utils';
import { renderDom } from './field';
import { TableRenderProps } from '../../types';

const ProTable: <RecordType extends object = any>(
  props: TableRenderProps<RecordType>
) => React.ReactElement = props => {
  // //@ts-ignore
  // if (props.dataSource) {
  //   console.error(
  //     '设置table-render的数据请使用api，具体使用可参考：https://form-render.github.io/table-render/guide/demo#%E5%9F%BA%E6%9C%AC-demo'
  //   );
  // }

  const { getState, setState, doSearch, columns, pageChangeWithRequest = true, ...otherProps } : any = props;
  const { dataSource = [], loading, pagination, tableSize }: any = getState();

  const handleChange = ({ current, pageSize }, filters, sorter) => {
    setState({ pagination: { ...pagination, current, pageSize }, sorter });
    if (!pageChangeWithRequest) {
      return;
    }
    doSearch({ current, pageSize, sorter });
  };

  columns.map((item: any) => {
    const result = item;
    // 用户在columns中自定义的render会覆盖tr的预设render
    if (result.render) return result;

    switch (result.valueType) {
      case 'date':
        result.render = (value: any) => renderDom(getDate(value), result);
        break;
      case 'dateTime':
        result.render = (value: any) => renderDom(getDateTime(value), result);
        break;
      case 'money':
        result.render = (value: any) => renderDom(getMoneyType(value), result);
        break;
      case 'code':
        result.render = (value: any) => renderDom(value, result);
        break;
      case 'text':
      default:
        result.render = (value: any) => renderDom(value, result);
    }
    return result;
  });

  const tableProps: TableProps<typeof dataSource[number]> = {
    ...otherProps,
    columns,
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

