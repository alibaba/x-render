import React, { useEffect, useRef, useState } from 'react';
import { useTable } from './hooks';
import { Button } from 'antd';
import SearchForm, { useForm } from 'form-render';

const SearchBtn = ({ clearSearch }: any) => {
  const { tableState = {}, refresh }: any = useTable();
  const { loading } = tableState;
  return (
    <div className="flex justify-end w-100">
      <Button
        loading={loading}
        className="mr"
        type="primary"
        onClick={() => refresh()} // 必须要这么写，否则会把 e 作为 params 传入
      >
        查询
      </Button>
      <Button onClick={clearSearch}>重置</Button>
    </div>
  );
};

const Search = (props: any) => {
  const [formSchema, setSchema] = useState({});
  const { tableState, setTable, refresh }: any = useTable();
  const { search, searchOnMount = true } = tableState;
  const _schema = props.schema || props.propsSchema;

  const modifiedSchema = useRef();
  const sref = useRef(null); // 搜索组件的ref

  const onChange = (newSearch: any) => {
    setTable({ search: newSearch });
  };
  // TODO: 重新检查一下这个逻辑
  const calcWidth = (schema: {
    properties: { [s: string]: unknown } | ArrayLike<unknown>;
  }) => {
    try {
      let width = 100;
      const wList = Object.values(schema.properties)
        .filter((v: any) => v['ui:hidden'] !== true)
        .map((v: any) => v['ui:width']);
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
          'ui:widget': 'searchBtn',
          'ui:className': 'search-btn',
          'ui:width': calcWidth(_schema),
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

  const clearSearch = () => {
    sref.current?.resetData({});
  };

  useEffect(() => {
    if (!props.hidden) {
      modifySchema();
    }
  }, [_schema]);

  const onMount = () => {
    if (searchOnMount) {
      refresh();
    }
  };

  const onValidate = valid => {
    if (valid.length) {
      setTable({
        checkPassed: false,
      });
      return;
    }
    setTable({
      checkPassed: true,
    });
  };

  useEffect(() => {
    if (props.hidden && searchOnMount) {
      onMount();
    }
  }, []);

  if (props.hidden) return null;

  const searchBtnArr =
    typeof props.searchBtnRender === 'function'
      ? props.searchBtnRender(refresh, clearSearch)
      : [];

  return (
    <div
      className={`tr-search ${props.className}`}
      style={props.style}
      onKeyDown={e => {
        if (e.keyCode === 13) {
          refresh();
        }
      }}
    >
      <SearchForm
        ref={sref}
        {...props}
        schema={formSchema}
        formData={search}
        onChange={onChange}
        onValidate={onValidate}
        onMount={onMount}
        displayType="row"
        widgets={{
          searchBtn: () =>
            props.searchBtnRender ? (
              <div className="flex justify-end w-100">
                {Array.isArray(searchBtnArr) &&
                  searchBtnArr.map((ui, idx) => {
                    return (
                      <div key={idx.toString()} style={{ marginLeft: 8 }}>
                        {ui}
                      </div>
                    );
                  })}
                {/* {props.searchBtnRender(refresh, clearSearch)} */}
              </div>
            ) : (
              <SearchBtn clearSearch={clearSearch} />
            ),
          ...props.widgets,
        }}
      />
    </div>
  );
};

export default Search;
