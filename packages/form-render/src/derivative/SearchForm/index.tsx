import React, { useEffect, useState, useRef, useContext } from 'react';
import { Col, ConfigProvider } from 'antd';
import classnames from 'classnames';

import FormRender from '../../form-core';
import ActionView from './ActionView';
import { translation } from '../../utils';
import { SearchProps } from '../../type';
import './index.less';
import withProvider from '../../withProvider';

const SearchForm: <RecordType extends object = any>(
  props: SearchProps<RecordType>
) => React.ReactElement = props => {
  if (props.hidden) {
    return;
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
    layoutAuto={},
    form,
    hidden,
    loading,
    onMount,
    onSearch,
    column: _column=4,
    collapsed: _collapsed,
    defaultCollapsed,
    ...otherProps
  } = props;

  const [limitHeight, setLimitHeight] = useState<Boolean>();
  const searchRef = useRef<any>();
  const [column, setColumn] = useState(_column);
  const [collapsed, setCollapsed] = useState(_collapsed);

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
      if (clientHeight < 136) {
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
      if (clientHeight < 136) {
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

  return (
    <div
      className={classnames('fr-search', { [className || '']: !!className })}
      style={{
        ...style,
        height: limitHeight ? 136 : 'auto'
      }}
      ref={searchRef}
      onKeyDown={handleKeyDown}
    >
      <FormRender
        displayType='row'
        {...otherProps}
        column={column}
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        form={form}
        operateExtra={mode !== 'simple' && (
          <Col className={classnames('search-action-col', { 'search-action-fixed': limitHeight })} style={{ minWidth: (1/column)*100 + '%' }}>
            <ActionView {...actionProps} setLimitHeight={setLimitHeight} />
          </Col>
        )}
      />
    </div>
  );
}

export default withProvider(SearchForm);

