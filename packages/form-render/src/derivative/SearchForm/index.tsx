import React, { useEffect, useState, useRef, useContext } from 'react';
import { Col, ConfigProvider } from 'antd';
import classnames from 'classnames';

import FormRender from '../../form-core';
import { translation } from '../../utils';
import { SearchProps } from '../../type';
import withProvider from '../../withProvider';
import ActionView from './ActionView';
import './index.less';

import {
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
  PercentSlider
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
    layoutAuto=false,
    form,
    hidden,
    loading,
    onMount,
    onSearch,
    column: _column=4,
    collapsed: _collapsed,
    defaultCollapsed,
    schema,
    retainBtn,
    ...otherProps
  } = props;

  const [limitHeight, setLimitHeight] = useState<boolean>();
  const searchRef = useRef<any>();
  const [column, setColumn] = useState(schema.column || _column);
  const [collapsed, setCollapsed] = useState(_collapsed);
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
    defaultCollapsed
  };

  useEffect(() => {
    initMount();
  }, []);

  useEffect(() => {
    if (!layoutAuto) {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      const { clientWidth, clientHeight } = searchRef?.current || {};
      if (clientHeight < (isColumn ? 110 : 136)) {
        setCollapsed(false);
        setLimitHeight(false)
      }
      for (let i = _column; i > 0; i--) {
        const item = clientWidth/i;
        if (item >= (layoutAuto?.fieldMinWidth || 340)) {
          setColumn(i);
          break;
        }
        if (i === 1) {
          setColumn(1)
        }
      }
    });

    resizeObserver.observe(searchRef.current);
    () => {
      resizeObserver.disconnect();
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const { clientHeight } = searchRef?.current || {};
      if (clientHeight < (isColumn ? 110 : 136)) {
        setCollapsed(false);
        setLimitHeight(false)
      }
    }, 0);
  }, []);

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
  
  return (
    <div
      className={classnames('fr-search', { [className || '']: !!className,  'fr-column-search': isColumn })}
      style={{
        ...style,
        height: getSearchHeight(limitHeight, isColumn)
      }}
      ref={searchRef}
      onKeyDown={handleKeyDown}
    >
      <FormRender
        displayType='row'
        {...otherProps}
        schema={{
          ...schema,
          column: column
        }}
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        form={form}
        operateExtra={operateShow && (
          <Col 
            className={classnames('search-action-col', { 
                'search-action-fixed': limitHeight,
                'search-action-column': isColumn,
                'search-action-column-fixed': limitHeight && isColumn,
            })} 
            style={{ minWidth: (1/column)*100 + '%' }}
          >
            <ActionView {...actionProps} setLimitHeight={setLimitHeight} retainBtn={retainBtn} mode={mode} />
          </Col>
        )}
      />
    </div>
  );
}

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
  PercentSlider
});

