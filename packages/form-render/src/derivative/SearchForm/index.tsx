import React, { useEffect, useState, useRef } from 'react';
import { Col } from 'antd';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import FormRender from '../../index';
import ActionView from './ActionView';
import { SearchProps } from '../../type';
import './index.less';

const SearchForm: <RecordType extends object = any>(
  props: SearchProps<RecordType>
) => React.ReactElement = props => {
  if (props.hidden) {
    return;
  }
  const { t } = useTranslation()
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

    form,
    schema,
    widgets,
    hidden,
    loading,
    onMount,
    onSearch,
    column: _column=4,
    collapsed,
    defaultCollapsed,
    ...otherProps
  } = props;

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

  const [limitHeight, setLimitHeight] = useState();
  const searchRef = useRef<any>();
  const [column, setColumn] = useState(_column)

  useEffect(() => {
    initMount();
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
     const clientWidth = searchRef?.current?.clientWidth;
      if (clientWidth > 1344) { // 336
        setColumn(column);
      } else if (clientWidth > 1008) {
        setColumn(3);
      } else if (clientWidth > 672) {
        setColumn(2);
      } else {
        setColumn(1);
      }
    });

    resizeObserver.observe(searchRef.current);
    () => {
      resizeObserver.disconnect();
    }
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
        schema={schema}
        widgets={widgets}
        operateExtra={(
          <Col className={classnames('search-action-col', { 'search-action-fixed': limitHeight })} style={{ minWidth: (1/column)*100 + '%' }}>
            <ActionView {...actionProps} setLimitHeight={setLimitHeight} />
          </Col>
        )}
      />
    </div>
  );
}

export default SearchForm;

