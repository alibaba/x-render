import React, { useContext, useEffect, useRef } from 'react';
import { Space } from 'antd';
import create, { useStore } from 'zustand';
import { useForm } from 'form-render';

import { TRContext } from '../models/context';
import { _get, isFunction, isArray } from '../utils';
import ErrorBoundary from '../components/ErrorBoundary';
import Search from './SearchView';
import Toolbar from './ToolbarView';
import Table from './TableView';

type ISearchParams = {
  current?: number;
  tab?: number | string;
  pageSize?: number;
  sorter?: any;
};


const RenderCore = props => {
  const { search: searchProps, table: tableProps, debug, className, style, headerTitle, toolbarRender,  toolbarAction = true, } = props;
  const form = useForm();
  const rootRef = useRef<HTMLDivElement>(null); // ProTable组件的ref

  const store = useContext(TRContext);
  const schema = useStore(store, (state: any) => state.schema);

  const loading = useStore(store, (state: any) => state.loading);
  const api = useStore(store, (state: any) => state.api);
  const currentTab = useStore(store, (state: any) => state.tab);

  const dataSource = useStore(store, (state: any) => state.dataSource);

  const extraData = useStore(store, (state: any) => state.extraData);

  const extraParams = useStore(store, (state: any) => state.extraParams);

  const pagination = useStore(store, (state: any) => state.pagination);

  const tableSize = useStore(store, (state: any) => state.tableSize);

  const setState = useStore(store, (state: any) => state.setState);

  const getState = useStore(store, (state: any) => state.getState)

  const fullScreen = () => {
    return Promise.resolve(rootRef.current?.requestFullscreen());
  };
  

  useEffect(() => {
    setState({ api: searchProps.api })
  }, [])

  const afterSearch = useRef<any>();

  const doSearch = (params: ISearchParams, customSearch?: Record<string, any>) => {
    const { current, pageSize, tab, sorter, ...extraSearch } = params || {};

    const _pageNum = current || 1;
    const _pageSize = pageSize || 10;

    let _tab = currentTab;
    if (['string', 'number'].indexOf(typeof tab) > -1) {
      _tab = tab;
    }
    const _pagination = { current: _pageNum, pageSize: _pageSize };

    const getTableData = (_api: any) => {
      setState({ loading: true });
      let _params = {
        ...form.getValues(),
        ...customSearch,
        ...extraSearch,
        ..._pagination,
      };
  
      if (Array.isArray(api)) {
        _params = { ..._params, tab };
      }
      Promise.resolve(_api(_params, sorter))
        .then(res => {
          // TODO：这里校验res是否规范
          const { rows, total, pageSize, ...extraData } = res;
          setState({
            loading: false,
            dataSource: rows,
            ...extraData,
            pagination: {
              ..._pagination,
              total,
              pageSize: pageSize || _pageSize,
            },
          });
          afterSearch.current({ rows, total, pageSize, ...extraData });
        })
        .catch(err => {
          setState({ loading: false });
        });
    }

    if (isFunction(api)) {
      getTableData(api);
      return;
    }
    if (isArray(api)) {
      const _api = _get(api, `[${_tab}].api`);
      if (isFunction(_api)) {
        getTableData(_api);
        return;
      }
    }
    console.warn('api 不是函数，检查 <Search /> 的 props');
  };

  const refresh = (
    params?: { tab?: string | number; stay?: boolean },
    moreSearch?: any
  ) => {
    const _stay = (params && params.stay) || false;
    const _tab = params && params.tab;
    const _search = moreSearch || {};
    doSearch(
      {
        ...params,
        current: _stay ? pagination.current : 1,
        tab: _tab,
        pageSize: pagination.pageSize,
      },
      _search
    );
  };


  const toolbarArray =
  typeof toolbarRender === 'function' ? toolbarRender() : [];
const showTableTop =
  headerTitle || (toolbarArray && toolbarArray.length) || Array.isArray(api);

  return (
    <div>
      <Search 
        {...searchProps }
        form={form} 
        refresh={refresh}
        loading={loading}
      />
      <ErrorBoundary>
        <div
          ref={rootRef}
          className={`tr-table-wrapper ${className}`}  style={style}
        >
          <Toolbar
            setState={setState}
            getState={getState}
            api={api}
            tableSize={tableSize}
            doSearch={doSearch}
            refresh={fullScreen}
            fullScreen={fullScreen}
            toolbarRender={toolbarRender}
          />
          <Table 
            {...tableProps}
            dataSource={dataSource}
          />
        </div>
      </ErrorBoundary>
    </div>
  );
}

export default RenderCore;
