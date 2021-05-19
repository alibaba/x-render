import React, { forwardRef, useImperativeHandle } from 'react';
import { useSet, useTable } from './hooks';
import { Ctx } from './context';
import Search from './Search';
import ProTable from './ProTable';
import CardList from './CardList';
import { message, ConfigProvider } from 'antd';
import { isObj } from './utils';
import _get from 'lodash.get';
import { TablePaginationConfig } from 'antd/lib/table';
import zh_CN from 'antd/lib/locale/zh_CN';

import 'antd/dist/antd.less'; // 需要配置一下babel-plugins
import './index.css';

export interface RootState {
  loading: boolean;
  search: any;
  searchApi: any;
  tab: number | string;
  dataSource: any[];
  pagination?: TablePaginationConfig;
  tableSize?: string;
}

export interface RootProps {
  searchApi: any;
  searchOnMount?: boolean;
  onSearch?: (params: any) => {};
  pageSize?: number;
  params?: any;
  locale?: string;
}

const useTableRoot = (props: RootProps) => {
  const [state, set] = useSet({
    loading: false,
    search: {}, // 选项data
    searchApi: props.searchApi,
    searchOnMount: props.searchOnMount,
    tab: 0, // 如果searchApi是数组，需要在最顶层感知tab，来知道到底点击搜索调用的是啥api
    dataSource: [],
    extraData: null, // 需要用到的 dataSource 以外的扩展返回值
    pagination: {
      current: 1,
      pageSize: props.pageSize || 10,
      total: 1,
    },
    tableSize: 'default',
    checkPassed: true,
  });

  const { pagination, search, searchApi, tab: currentTab, checkPassed } = state;

  const doSearch = (
    params: { current?: any; tab?: any; pageSize?: any },
    customSearch?: any
  ) => {
    // 删除自定义组件的参数名
    delete search.searchBtn;

    if (props.onSearch) {
      props.onSearch(search);
    }
    // console.log(checkPassed);
    if (!checkPassed) return;
    const { current, pageSize, tab } = params || {};
    const _current = current || 1;
    const _pageSize = pageSize || 10;
    let _tab = currentTab;
    if (['string', 'number'].indexOf(typeof tab) > -1) {
      _tab = tab;
    }
    // console.log(params, { _current, _pageSize, _tab }, 'searchParams');
    const _pagination = { current: _current, pageSize: _pageSize };
    if (typeof props.searchApi === 'function') {
      basicSearch(props.searchApi);
    } else if (Array.isArray(props.searchApi)) {
      const _searchApi = _get(props.searchApi, `[${_tab}].api`);
      if (typeof _searchApi === 'function') {
        basicSearch(_searchApi);
      } else {
        message.warning('searchApi 不是函数，检查 <TableContainer /> 的 props');
      }
    } else {
      message.warning('searchApi 不是函数，检查 <TableContainer /> 的 props');
    }

    function basicSearch(searchApi: (arg0: any) => any) {
      set({ loading: true });
      let _params = { ...search, ...customSearch, ..._pagination };
      if (props.params && isObj(props.params)) {
        _params = { ..._params, ...props.params };
      }
      if (Array.isArray(props.searchApi)) {
        _params = { ..._params, tab };
      }
      Promise.resolve(searchApi(_params))
        .then(res => {
          // TODO：这里校验res是否规范
          const { rows, total, pageSize, extraData } = res;
          set({
            loading: false,
            dataSource: rows,
            extraData,
            pagination: {
              ..._pagination,
              total,
              pageSize: pageSize || _pageSize,
            },
          });
        })
        .catch(err => {
          set({ loading: false });
        });
    }
  };

  const refresh = (
    params?: { tab: string | number; stay?: boolean },
    search?: any
  ) => {
    const _stay = (params && params.stay) || false;
    const _tab = params && params.tab;
    const _search = search || {};
    doSearch(
      {
        current: _stay ? pagination.current : 1,
        tab: _tab,
        pageSize: pagination.pageSize,
      },
      _search
    );
  };

  const changeTab = (tab: string | number) => {
    if (['string', 'number'].indexOf(typeof tab) > -1) {
      set({ tab });
      refresh({ tab });
    } else {
      console.error('changeTab的入参必须是number或string');
    }
  };

  const context = {
    tableState: state,
    // setTable: (newState: any, fn?: Function) => {
    //   set(newState);
    //   if (fn && typeof fn == 'function') {
    //     fn(state, { ...state, ...newState });
    //   }
    // },
    setTable: set,
    doSearch,
    refresh,
    changeTab,
  };
  return context;
};

const Container = (
  props: RootProps,
  ref?:
    | ((instance: unknown) => void)
    | React.RefObject<unknown>
    | null
    | undefined
) => {
  const context = useTableRoot(props);

  useImperativeHandle(ref, () => context);

  return (
    <ConfigProvider locale={zh_CN}>
      <Ctx.Provider {...props} value={context} />
    </ConfigProvider>
  );
};

const TableContainer = forwardRef(Container);

export { Search, ProTable, CardList, TableContainer, useTable };
