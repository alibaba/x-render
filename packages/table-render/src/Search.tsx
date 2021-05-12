import React, { useEffect, useRef, useState } from 'react';
import { useTable } from './hooks';
import { Button } from 'antd';
import SearchForm from 'form-render';

const SearchBtn = ({
  clearSearch,
  submit,
  style = {},
  className = '',
}: any) => {
  const { tableState = {} }: any = useTable();
  const { loading } = tableState;
  return (
    <div className={`flex justify-end w-100 ${className}`} style={style}>
      <Button loading={loading} className="mr" type="primary" onClick={submit}>
        查询
      </Button>
      <Button onClick={clearSearch}>重置</Button>
    </div>
  );
};

const MySearchBtn = ({
  searchBtnRender,
  searchBtnStyle,
  searchBtnClassName,
  form,
}: any) => {
  const clearSearch = form.resetFields;
  const searchBtnArr =
    typeof searchBtnRender === 'function'
      ? searchBtnRender(form.submit, clearSearch)
      : [];
  if (searchBtnRender) {
    return (
      <div className="flex justify-end w-100">
        {Array.isArray(searchBtnArr) &&
          searchBtnArr.map((ui, idx) => {
            return (
              <div key={idx.toString()} style={{ marginLeft: 8 }}>
                {ui}
              </div>
            );
          })}
      </div>
    );
  }
  return (
    <SearchBtn
      submit={form.submit}
      clearSearch={clearSearch}
      style={searchBtnStyle || {}}
      className={searchBtnClassName || ''}
    />
  );
};

export interface SearchProps {
  searchBtnStyle?: React.CSSProperties;
  searchBtnClassName?: string;
  api?: any;
  displayType?: any;
  propsSchema?: any;
  className?: string;
  style?: React.CSSProperties;
  schema?: any;
  hidden?: boolean;
  searchOnMount?: boolean | unknown;
  searchBtnRender?: (
    submit: Function,
    clearSearch: Function
  ) => React.ReactNode[];
  onSearch?: (search: any) => any;
  afterSearch?: (params: any) => any;
  widgets?: any;
}

const Search = (props: SearchProps) => {
  const { searchBtnRender, searchBtnStyle, searchBtnClassName } = props;
  const [formSchema, setSchema] = useState({});
  const { refresh, syncMethods, setTable, form }: any = useTable();
  const _schema = props.schema || props.propsSchema;
  let searchOnMount = true;
  if (!props.searchOnMount && props.searchOnMount !== undefined) {
    searchOnMount = false;
  }

  const modifiedSchema = useRef();

  // TODO: 重新检查一下这个逻辑
  const calcWidth = (schema: {
    properties: { [s: string]: unknown } | ArrayLike<unknown>;
  }) => {
    try {
      let width = 100;
      const wList = Object.values(schema.properties)
        .filter((v: any) =>
          v['hidden'] ? v['hidden'] !== true : v['ui:hidden'] !== true
        )
        .map((v: any) => (v['width'] ? v['width'] : v['ui:width']));
      const idx = wList.lastIndexOf(undefined);
      const effectiveList = wList
        .slice(idx + 1)
        .map(item => Number(item.substring(0, item.length - 1)));
      const len = effectiveList.reduce((a, b) => {
        const sum = a + b;
        if (sum > 100) return Math.min(100, b);
        return sum;
      }, 0);
      width = 100 - len;
      if (width < 10) {
        // 如果剩下太少了，就换行
        width = 100;
      }
      return width + '%';
    } catch (err) {
      console.error(err);
      return '100%';
    }
  };

  // 给schema里拼接一个buttons
  const modifySchema = () => {
    const noDiff =
      JSON.stringify(modifiedSchema.current) === JSON.stringify(_schema);
    if (_schema && _schema.properties) {
      if (formSchema && noDiff) return;
      try {
        const curSchema = JSON.parse(JSON.stringify(_schema));
        curSchema.properties.searchBtn = {
          type: 'string',
          widget: 'searchBtn',
          className: 'search-btn',
          bind: false,
          width: calcWidth(_schema),
        };
        setSchema(curSchema);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error(
        'SearchForm 传入了不正确的 schema，参考文档: https://x-render.gitee.io/form-render/form-render/config/schema'
      );
    }
  };

  useEffect(() => {
    if (!props.hidden) {
      modifySchema();
    }
  }, [_schema]);

  useEffect(() => {
    syncMethods({
      searchApi: props.api,
      syncAfterSearch: props.afterSearch,
    });
    if (props.hidden || searchOnMount) {
      form.submit();
    }
  }, []);

  const btnProps = {
    searchBtnRender,
    searchBtnStyle,
    searchBtnClassName,
    form,
  };

  if (props.hidden) return null;

  const onFinish = (data, errors) => {
    if (typeof props.onSearch === 'function') {
      props.onSearch(data);
    }
    refresh(data);
  };

  return (
    <div
      className={`tr-search ${props.className}`}
      style={props.style}
      onKeyDown={e => {
        if (e.keyCode === 13) {
          form.submit();
        }
      }}
    >
      <SearchForm
        form={form}
        displayType="row"
        {...props}
        schema={formSchema}
        widgets={{
          searchBtn: () => <MySearchBtn {...btnProps} />,
          ...props.widgets,
        }}
        onFinish={onFinish}
      />
    </div>
  );
};

export default Search;
