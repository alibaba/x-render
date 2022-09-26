import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale/zh_CN';
import { useForm } from 'form-render';
import _get from 'lodash.get';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { SearchApi } from '../types';
import { useSet } from './hooks';
import './index.css';
import { Ctx } from './store';

const useTableRoot = props => {
  const form = useForm();

  const [state, set] = useSet({
    loading: false,
    api: null,
    tab: 0, // 如果api是数组，需要在最顶层感知tab，来知道到底点击搜索调用的是啥api
    dataSource: [],
    extraData: null, // 需要用到的 dataSource 以外的扩展返回值
    extraParams: {},
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
    tableSize: 'default',
  });

  const api = useRef<SearchApi<typeof state.api[number]>>();
  const afterSearch = useRef<any>();

  const { pagination, tab: currentTab } = state;

  const doSearch = (
    params: {
      current?: number;
      tab?: number | string;
      pageSize?: number;
      sorter?: any;
    },
    customSearch?: Record<string, any>
  ) => {
    const { current, pageSize, tab, sorter, ...extraSearch } = params || {};
    const _current = current || 1;
    const _pageSize = pageSize || 10;
    let _tab = currentTab;
    if (['string', 'number'].indexOf(typeof tab) > -1) {
      _tab = tab;
    }
    const _pagination = { current: _current, pageSize: _pageSize };
    if (typeof api.current === 'function') {
      basicSearch(api.current);
    } else if (Array.isArray(api.current)) {
      const _api = _get(api.current, `[${_tab}].api`);
      if (typeof _api === 'function') {
        basicSearch(_api);
      } else {
        console.warn('api 不是函数，检查 <Search /> 的 props');
      }
    } else {
      console.warn('api 不是函数，检查 <Search /> 的 props');
    }

    function basicSearch(api: SearchApi<typeof state.api[number]>) {
      set({ loading: true });
      let _params = {
        ...form.getValues(),
        ...customSearch,
        ...extraSearch,
        ..._pagination,
      };

      if (Array.isArray(api)) {
        _params = { ..._params, tab };
      }
      Promise.resolve(api(_params, sorter))
        .then(res => {
          // TODO：这里校验res是否规范
          const { rows, total, pageSize, ...extraData } = res;
          set({
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
          set({ loading: false });
        });
    }
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

  const changeTab = (tab: string | number) => {
    if (['string', 'number'].indexOf(typeof tab) > -1) {
      set({ tab });
      refresh({ tab });
    } else {
      console.error('changeTab的入参必须是number或string');
    }
  };

  const syncMethods = ({ searchApi, syncAfterSearch }) => {
    api.current = searchApi;
    afterSearch.current = syncAfterSearch;
    set({
      api: searchApi,
    });
  };

  const context = {
    tableState: { ...state, search: form.getValues() },
    setTable: set,
    doSearch,
    refresh,
    changeTab,
    syncMethods,
    form,
  };
  return context;
};

const Container = (props, ref) => {
  const context = useTableRoot(props);

  useImperativeHandle(ref, () => context);

  return (
    <ConfigProvider locale={zh_CN}>
      <Ctx.Provider {...props} value={context} />
    </ConfigProvider>
  );
};

const TableProvider = forwardRef(Container);

const withTable = Component => props => {
  return (
    <TableProvider>
      <Component {...props} />
    </TableProvider>
  );
};

export { TableProvider, withTable };
