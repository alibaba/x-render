import { useUpdateEffect } from 'ahooks';
import { Col, ConfigProvider } from 'antd';
import classnames from 'classnames';
import { debounce } from 'lodash-es';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';

import FormRender from '../../form-core';
import { SearchProps } from '../../type';
import { translation } from '../../utils';
import withProvider from '../../withProvider';
import ActionView from './ActionView';
import './index.less';

import {
  Checkbox,
  Checkboxes,
  DatePicker,
  DateRange,
  Html,
  ImageInput,
  Input,
  InputNumber,
  MultiSelect,
  PercentSlider,
  Radio,
  Select,
  Slider,
  Switch,
  TextArea,
  TimePicker,
  TimeRange,
  TreeSelect,
  UrlInput,
} from '../../widgets';

const getSearchHeight = (limitHeight: boolean, isColumn: boolean) => {
  if (!limitHeight) {
    return 'auto';
  }

  if (isColumn) {
    return 110;
  }

  return 136;
};

const SearchForm: <RecordType extends object = any>(
  props: SearchProps<RecordType>
) => React.ReactElement = props => {
  if (props.hidden) {
    return null;
  }

  const configCtx = useContext(ConfigProvider.ConfigContext);
  const t = translation(configCtx);

  const {
    searchBtnRender,
    searchBtnStyle,
    searchBtnClassName,
    searchText = t('search'),
    resetText = t('reset'),

    searchWithError = true,
    searchOnMount = true,
    style = {},
    className,
    mode,
    layoutAuto = false,
    form,
    hidden,
    loading,
    onMount,
    onSearch,
    onReset,
    column: _column = 4,
    collapsed: _collapsed,
    defaultCollapsed = true,
    schema,
    retainBtn,
    closeReturnSearch,
    resetAfter,
    ...otherProps
  } = props;

  const searchRef = useRef<any>();
  const preWidthRef = useRef<any>();
  const heightRef = useRef<any>();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [expand, setExpand] = useState(!defaultCollapsed);
  const [limitHeight, setLimitHeight] = useState<boolean>();
  const [column, setColumn] = useState(schema.column || _column);
  const isColumn = (otherProps.displayType || schema.displayType) === 'column';

  const actionProps = {
    searchBtnRender,
    style: searchBtnStyle,
    className: searchBtnClassName,
    searchText,
    resetText,
    loading,
    form,
    collapsed,
    onReset,
    expand,
  };

  useEffect(() => {
    initMount();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const { clientHeight } = searchRef?.current || {};
      heightRef.current = clientHeight;
      // 高度超过限度值，满足触发折叠逻辑
      if (_collapsed && clientHeight > (isColumn ? 110 : 136)) {
        setCollapsed(true);

        if (defaultCollapsed) {
          setLimitHeight(true);
          setExpand(false);
        }
      }

      // 监听容器大小发生变化
      handleSearchResize();
    }, 0);
  }, []);

  useUpdateEffect(() => {
    if (!_collapsed) {
      return;
    }
    setTimeout(() => {
      const { clientHeight } = searchRef?.current;

      if (!collapsed && clientHeight > (isColumn ? 110 : 136)) {
        setCollapsed(true);
      }

      if (
        collapsed &&
        _column === column &&
        heightRef.current <= (isColumn ? 110 : 136)
      ) {
        setCollapsed(false);
      }

      setLimitHeight(!expand);
    }, 0);
  }, [column]);

  const handleSearchResize = () => {
    if (!layoutAuto) {
      return;
    }

    const resizeObserver = new ResizeObserver(
      debounce(() => {
        const { clientWidth, clientHeight } = searchRef?.current || {};
        if (
          clientWidth === 0 ||
          clientHeight === 0 ||
          !preWidthRef.current ||
          preWidthRef.current === clientWidth
        ) {
          preWidthRef.current = clientWidth;
          return;
        }

        preWidthRef.current = clientWidth;

        for (let i = _column; i > 0; i--) {
          const item = clientWidth / i;
          if (item >= (layoutAuto?.fieldMinWidth || 340)) {
            setColumn(i);
            break;
          }
          if (i === 1) {
            setColumn(1);
          }
        }
      }, 300)
    );

    resizeObserver.observe(searchRef.current);
    () => {
      resizeObserver.disconnect();
    };
  };

  const initMount = async () => {
    if (!searchOnMount) {
      return;
    }

    if (typeof onMount === 'function') {
      await onMount();
    }

    form.submit();
  };

  const handleFinish = (values: any) => {
    onSearch && onSearch(values);
  };

  const handleFinishFailed = ({ values }) => {
    if (!searchWithError) {
      return;
    }
    onSearch && onSearch(values);
  };

  const handleKeyDown = (ev: any) => {
    if (ev.keyCode === 13) {
      form.submit();
    }
  };

  const operateShow = mode !== 'simple' || (mode === 'simple' && retainBtn);

  /** 当设置collapsed，超出隐藏 */
  const properties = useMemo(() => {
    const properties = {};
    Object.keys(schema.properties || {}).forEach((key, index) => {
      const item = { ...(schema.properties[key] || {}) };
      if (
        (limitHeight && isColumn && index > column - 1) ||
        (limitHeight && !isColumn && index > column * 2 - 1)
      ) {
        item.hidden = true;
      }
      properties[key] = item;
    });
    return properties;
  }, [schema, limitHeight, column, isColumn]);

  return (
    <div
      className={classnames('fr-search', {
        [className || '']: !!className,
        'fr-column-search': isColumn,
      })}
      style={{
        ...style,
        height: getSearchHeight(limitHeight, isColumn),
      }}
      ref={searchRef}
      onKeyDown={!closeReturnSearch && handleKeyDown}
    >
      <FormRender
        displayType="row"
        {...otherProps}
        schema={{
          ...schema,
          properties: properties,
          column: column,
        }}
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        form={form}
        operateExtra={
          operateShow && (
            <Col
              className={classnames('search-action-col', {
                'search-action-fixed': limitHeight,
                'search-action-column': isColumn,
                'search-action-column-fixed': limitHeight && isColumn,
              })}
              style={{ minWidth: (1 / column) * 100 + '%' }}
            >
              <ActionView
                {...actionProps}
                setLimitHeight={setLimitHeight}
                retainBtn={retainBtn}
                mode={mode}
                setExpand={setExpand}
              />
            </Col>
          )
        }
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
