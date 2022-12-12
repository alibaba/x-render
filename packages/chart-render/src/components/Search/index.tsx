import { SyncOutlined } from '@ant-design/icons';
import { createUpdateEffect, useDeepCompareEffect } from 'ahooks';
import { Button, ButtonProps } from 'antd';
import classNames from 'classnames';
import FormRender, { FRProps, useForm } from 'form-render';
import React, {
  CSSProperties,
  FC,
  memo,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { useChart } from '../../utils/store';
import { DataSource, ObjectFilters } from '../../utils/type';
import './index.less';

const useDeepCompareUpdateEffect = createUpdateEffect(useDeepCompareEffect);

export interface ISearchProps
  extends Omit<
    FRProps,
    'form' | 'onFinish' | 'className' | 'style' | 'schema'
  > {
  /** 搜索头最外层容器的 className */
  className: string;

  /** 搜索头最外层容器的 style */
  style: CSSProperties;

  /** 是否隐藏 */
  hidden: boolean;

  /** 大小 */
  size: 'small' | undefined;

  /** 是否展示查询/刷新按钮，也可以透传 Button 参数 */
  searchButton: boolean | ButtonProps;

  /** 是否要挂载完毕后自动请求数据 */
  searchOnMount: boolean;

  /** 是否要在表单项变化后自动请求数据，也可以指定哪些字段变化时自动请求 */
  searchOnChange: boolean | string[];

  /** 请求方法，请尽量使用唯一通用的方法 */
  api: (params: {
    // schema: ISearchProps['schema'];
    // dimensions: ISearchProps['dimensions'];
    // indicators: ISearchProps['indicators'];
    filters: ObjectFilters;
    // orders: ObjectOrders;
  }) => DataSource | Promise<DataSource>;

  /** 表单筛选项 */
  schema: FRProps['schema'];

  /** 维度 */
  // dimensions: string[];

  /** 指标 */
  // indicators: string[];

  /** 固定筛选项 */
  filters: ObjectFilters;

  /** 固定排序项 */
  // orders: ObjectOrders;
}

const EMPTY_SCHEMA: ISearchProps['schema'] = {
  type: 'object',
  properties: {},
};

const Search: FC<Partial<ISearchProps>> = props => {
  const propsRef = useRef(props);
  propsRef.current = props;
  const {
    className,
    style,
    api,
    schema = EMPTY_SCHEMA,
    filters = {},
    searchButton = true,
    searchOnMount = true,
    searchOnChange = false,
    size,
    watch,
    hidden = false,
    ...restProps
  } = props;

  const loading = useChart(state => state.loading);
  const setChart = useChart(state => state.setChart);

  const form = useForm();

  const refresh = useCallback(async () => {
    setChart({ loading: true });
    try {
      const dataSource = await propsRef.current.api?.({
        filters: { ...propsRef.current.filters, ...form.getValues() },
      });
      setChart({ dataSource });
    } catch {}
    setChart({ loading: false });
  }, []);

  useMemo(() => setChart({ form, refresh }), []);

  useDeepCompareUpdateEffect(() => {
    refresh();
  }, [filters]);

  return (
    <div
      style={{ display: hidden ? 'none' : undefined, ...style }}
      className={classNames('cr-search', className, {
        'cr-search-hidden': !Object.keys(schema.properties || {}).length,
        'cr-search-small': size === 'small',
      })}
      onKeyDown={event => event.key === 'Enter' && form.submit()}
    >
      <FormRender
        displayType="row"
        size={size}
        form={form}
        schema={schema || EMPTY_SCHEMA}
        onFinish={(_, errors) => !errors.length && refresh()}
        onMount={searchOnMount && !searchOnChange ? form.submit : undefined}
        watch={{
          ...watch,
          ...Object.fromEntries(
            (Array.isArray(searchOnChange)
              ? searchOnChange
              : searchOnChange
              ? ['#']
              : []
            ).map(key => [key, refresh!])
          ),
        }}
        {...restProps}
      />

      {searchButton && (
        <Button
          className="cr-search-button"
          icon={<SyncOutlined />}
          onClick={form.submit}
          loading={loading}
          size={size}
          {...(typeof searchButton === 'object' ? searchButton : {})}
        />
      )}
    </div>
  );
};

export default memo(Search);
