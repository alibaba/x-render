import React, { useMemo } from 'react';
import { Table, TableProps, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useTableStore } from '../store';

import { getDate, getDateTime, getMoneyType, getDateRange, isObject, isFunction, getColumnKey } from '../../utils';
import { renderDom } from './field';
import { ColumnsSettingValueType } from '../../types';

const TableView: <RecordType extends object = any>(
  props: TableProps<RecordType> & {
    doSearch: (...arg: any[]) => void,
    locale?: 'zh-CN' | 'en-US';
  }
) => React.ReactElement = props => {
  //@ts-ignore
  if (props.dataSource) {
    console.error(
      '设置table-render的数据请使用api，具体使用可参考：https://form-render.github.io/table-render/guide/demo#%E5%9F%BA%E6%9C%AC-demo'
    );
  }

  const { doSearch, pageChangeWithRequest = true, ...otherProps }: any = props;
  const dataSource = useTableStore((store) => store.dataSource);
  const loading = useTableStore((store) => store.loading);
  const pagination = useTableStore((store) => store.pagination);
  const tableSize = useTableStore((store) => store.tableSize);
  const columns = useTableStore((store) => store.columns);
  const columnsSetting = useTableStore((store) => store.columnsSetting);
  const setState = useTableStore((store) => store.setState);

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

  const getProColumns = (columns: any[]) => {
    if (!columns) return [];

    return columns.map((item) => {
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
        result.render = (value: any, record: any) => {
          if (result.valueType === 'tags') {
            return renderDom(value, { ...item });
          }

          const { type, ...domProps } = result.valueTypeProps(value, record);
          return renderDom(value, { ...item, valueTypeProps: domProps });
        }
        return result;
      }

      switch (result.valueType) {
        case 'link':
          result.render = (value: any, record: any, index: number) => renderDom(value, result, { record, index });
          break;
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
          result.render = (value: any, record: any) => renderDom(getDateRange(value, { result, record }, 'YYYY-MM-DD HH:mm:ss'), result);
          break;
        case 'money':
          result.render = (value: any) => renderDom(getMoneyType(value), result);
          break;
        case 'text':
        default:
          result.render = (value: any) => renderDom(value, result);
      }
      return result;
    })
  }


  // 应用 columnsSetting 到 columns
  const setColumns = (columnsSetting: ColumnsSettingValueType, proColumns: any[]) => {
    return columnsSetting
      .filter(i => !i.hidden)
      .map(i => {
        const column = proColumns.find((j, jIndex) => getColumnKey(j, jIndex) === i.key);
        if (column) {
          return {
            ...column,
            ...i,
          };
        }
        return i;
      });
  };

  const proColumns = useMemo(() => {
    const proColumns = getProColumns(columns);
    if (columnsSetting && columnsSetting.length > 0) {
      return setColumns(columnsSetting, proColumns)
    }
    return proColumns;
  }, [columns, columnsSetting]);

  const tableProps: TableProps<typeof dataSource[number]> = {
    rowKey: 'id',
    ...otherProps,
    columns: proColumns,
    onChange: handleChange,
    dataSource,
    pagination: props.pagination === false ? false : {
      size: 'small',
      ...props.pagination,
      ...pagination,
      // pageSize: props.pagination?.pageSize || pagination.pageSize,
      // total: props.pagination?.total || pagination.total,
      // current: props.pagination?.current || pagination.current,
    },
    loading,
    size: tableSize,
  };
 
  // 需要判断一下，否则影响 table 的某些属性初始化渲染异常
  if (columns?.length === 0) {
    return null;
  }
  return <Table {...tableProps} />
}

export default TableView;
