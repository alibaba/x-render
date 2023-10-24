import React, { useContext, useMemo, useRef } from 'react';
import { Col, ConfigProvider } from 'antd';
import { useUpdateEffect, useMount, useSetState } from 'ahooks';
import classnames from 'classnames';
import { debounce } from 'lodash-es';

import FormRender from '../../form-core';
import { translation } from '../../utils';
import withProvider from '../../withProvider';
import ActionView from './ActionView';
import {
  Input,
  InputNumber,
  TextArea,
  Select,
  MultiSelect,
  Checkbox,
  Checkboxes,
  Radio,
  DatePicker,
  DateRange,
  TimePicker,
  TimeRange,
  Slider,
  Switch,
  TreeSelect,
  UrlInput,
  ImageInput,
  Html,
  PercentSlider,
} from '../../widgets';
import './index.less';
import { SearchProps } from '../../type';

const getIsColumn = (isColumn: boolean, obj: object, column: number) => {
  let count = 0;
  Object.keys(obj || {}).forEach(key => {
    const item = obj[key];
    if (item.visible === undefined) {
      count += 1;
    }
  });
  return isColumn && (count % column !== 0);
};

const SearchForm: <RecordType extends object = any>(props: SearchProps<RecordType>) => React.ReactElement = props => {
  if (props.hidden) {
    return null;
  }

  const configCtx = useContext(ConfigProvider.ConfigContext);
  const t = translation(configCtx);
  const {
    className,
    style,
    mode,
    layoutAuto = false,
    form,
    hidden,
    loading,
    column: _column = 4,
    collapsed,
    defaultCollapsed = true,
    schema,
    retainBtn,
    closeReturnSearch,
    resetAfter,
    searchBtnStyle,
    searchBtnClassName,
    searchText = t('search'),
    resetText = t('reset'),
    searchWithError = true,
    searchOnMount = true,
    onMount,
    onSearch,
    onReset,
    searchBtnRender,
    ...restProps
  } = props;

  const fieldNum = Object.keys(schema?.properties || {}).length;
  const isColumn = (restProps.displayType || schema.displayType) === 'column';
  const operateShow = mode !== 'simple' || (mode === 'simple' && retainBtn);
  const containerRef = useRef<any>();

  const [state, setState] = useSetState({
    hasCollapse: false, // 是否有折叠
    isExpand: !defaultCollapsed, // 折叠展开状态
    column: schema.column || _column // 一行几列
  });
  const { hasCollapse, isExpand, column } = state;

  const actionProps = {
    style: searchBtnStyle,
    className: searchBtnClassName,
    searchText,
    resetText,
    loading,
    form,
    hasCollapse,
    isExpand,
    onReset,
    searchBtnRender,
  };

  useMount(() => {
    initMount();
  });

  useMount(() => {
    if (!collapsed) {
      return;
    }
    if ((!isColumn && fieldNum > (column * 2 - 1)) || (isColumn && fieldNum > (column -1))) {
      setState({ hasCollapse: true });
    }
    handleContainerResize();
  });

  useUpdateEffect(() => {
    if (!collapsed) {
      return;
    }

    if ((!isColumn && fieldNum > (column * 2 - 1)) || (isColumn && fieldNum > (column -1))) {
      setState({ hasCollapse: true });
    } else {
      setState({ hasCollapse: true });
    }
  }, [column]);

  const initMount = async () => {
    if (!searchOnMount) {
      return;
    }
    if (typeof onMount === 'function') {
      await onMount();
    }
    form.submit();
  };

  const properties = useMemo(() => {
    if (!collapsed) {
      return schema?.properties;
    }
    const result = {};
    Object.keys(schema?.properties || {}).forEach((key, index) => {
      const item = { ...(schema.properties[key] || {}) };
      if (
        (!isExpand && isColumn && index >= column - 1) ||
        (!isExpand && !isColumn && index >= column * 2 - 1) // 只显示两行
      ) {
        item.visible = false;
      }
      result[key] = item;
    });
    return result;
  }, [JSON.stringify(schema), column, isColumn, isExpand, collapsed]);

  const handleContainerResize = () => {
    if (!layoutAuto) {
      return;
    }
    const resizeObserver = new ResizeObserver(debounce(() => {
      const { clientWidth } = containerRef?.current || {};
      for (let i = _column; i > 0; i--) {
        const item = clientWidth / i;
        if (item >= (layoutAuto?.fieldMinWidth || 340)) {
          setState({ column: i });
          break;
        }
        if (i === 1) {
          setState({ column: 1 });
        }
      }
    }, 300, { leading: true }));

    resizeObserver.observe(containerRef.current);
    () => {
      resizeObserver.disconnect();
    };
  };

  const handleFinish = (values: any) => {
    onSearch?.(values);
  };

  const handleFinishFailed = ({ values }) => {
    if (!searchWithError) {
      return;
    }
    onSearch?.(values);
  };

  const handleKeyDown = (ev: any) => {
    if (ev.keyCode !== 13) {
      return;
    }
    form.submit();
  };

  return (
    <div
      className={classnames('fr-search', {[className]: !!className, 'fr-column-search': isColumn })}
      style={style}
      ref={containerRef}
      onKeyDown={!closeReturnSearch && handleKeyDown}
    >
      <FormRender
        displayType='row'
        {...restProps}
        schema={{
          ...schema,
          properties,
          column
        }}
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        form={form}
        operateExtra={operateShow && (
          <Col
            className={classnames('search-action-col', {
              'search-action-column': getIsColumn(isColumn, properties, column)
            })}
            style={{ minWidth: (1 / column) * 100 + '%' }}
          >
            <ActionView
              {...actionProps}
              retainBtn={retainBtn}
              mode={mode}
              setExpand={(value: boolean) => setState({ isExpand: value })}
            />
          </Col>
        )}
      />
    </div>
  );
};

export default withProvider(SearchForm, {
  Input,
  InputNumber,
  TextArea,
  Select,
  MultiSelect,
  Switch,
  Radio,
  Checkbox,
  Checkboxes,
  DatePicker,
  DateRange,
  TimePicker,
  TimeRange,
  TreeSelect,
  ImageInput,
  UrlInput,
  Slider,
  Html,
  PercentSlider,
});
