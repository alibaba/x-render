import { Radio, Space, Table, TableProps } from 'antd';
import React, { useEffect, useRef, useContext } from 'react';
import { TableRenderProps } from '../../types';
import { getDate, getDateTime, getMoneyType } from '../../utils';
import ErrorBoundary from '../../components/ErrorBoundary';
import { renderDom } from '../../components/field';
import { useTable } from '../../components/hooks';
import ToolBarAction from '../ToolbarView/InteriorTool';
import { TRContext } from '../../models/context';


const ProTable: <RecordType extends object = any>(
  props: TableRenderProps<RecordType>
) => React.ReactElement = props => {
  //@ts-ignore
  if (props.dataSource) {
    console.error(
      '设置table-render的数据请使用api，具体使用可参考：https://form-render.github.io/table-render/guide/demo#%E5%9F%BA%E6%9C%AC-demo'
    );
  }

  const store = useContext(TRContext);

  const { refresh, syncMethods, form, tableState, loading, pagination, tableSize, tab, api }: any = store.getState();

  const { setTable, doSearch, dataSource = [] } : any = props;

  // const { tableState, setTable, doSearch } = useTable();
  // const { dataSource, pagination, loading, api, tableSize } = tableState;
  const rootRef = useRef<HTMLDivElement>(null); // ProTable组件的ref

  const onChange = ({ current, pageSize }, filters, sorter) => {
    setTable({ pagination: { ...pagination, current, pageSize }, sorter });
    if (
      !props.pageChangeWithRequest &&
      props.pageChangeWithRequest !== undefined
    )
      return;
    doSearch({ current, pageSize, sorter });
  };

  const {
    debug,
    headerTitle,
    toolbarRender,
    columns,
    style = {},
    className = '',
    toolbarAction = false,
  } = props;

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
    ...props,
    onChange,
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

  const toolbarArray =
    typeof toolbarRender === 'function' ? toolbarRender() : [];
  const showTableTop =
    headerTitle || (toolbarArray && toolbarArray.length) || Array.isArray(api);

  const fullScreen = () => {
    return Promise.resolve(rootRef.current?.requestFullscreen());
  };

  useEffect(() => {
    if (props.size) {
      setTable({ tableSize: props.size });
    }
  }, []);

  return <Table {...tableProps} />
};

export default ProTable;

