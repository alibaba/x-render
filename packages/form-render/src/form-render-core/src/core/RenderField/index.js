import React from 'react';
import { useStore, useStore2, useTools } from '../../hooks';
import { getValueByPath, isCheckBoxType } from '../../utils';
import ErrorMessage from './ErrorMessage';
import Extra from './Extra';
import FieldTitle from './Title';
import ExtendedWidget from './ExtendedWidget';

// TODO: 之后不要直接用get，收口到一个内部方法getValue，便于全局 ctrl + f 查找
const RenderField = props => {
  const {
    $id,
    dataIndex,
    dataPath,
    _value,
    onChange,
    dependValues,
    readOnly,
    disabled,
    _schema,
    labelClass,
    labelStyle,
    contentClass: _contentClass,
    children,
    errorFields = [],
    hideTitle,
    displayType,
  } = props;

  const { showValidate } = useStore2();
  const { onItemChange } = useTools();
  const { formData } = useStore();
  // console.log('<renderField>', $id);

  const errObj = errorFields.find(err => err.name === dataPath);
  const errorMessage = errObj && errObj.error; // 是一个list
  const hasError = Array.isArray(errorMessage) && errorMessage.length > 0;
  // 补上这个class，会自动让下面所有的展示ui变红！
  const contentClass =
    hasError && showValidate
      ? _contentClass + ' ant-form-item-has-error'
      : _contentClass;

  let contentStyle = {};

  const titleProps = {
    labelClass,
    labelStyle: labelStyle,
    schema: _schema,
    displayType,
  };

  const messageProps = {
    message: errorMessage,
    schema: _schema,
    displayType,
    softHidden: displayType === 'inline', // 这个是如果没有校验信息时，展示与否
    hardHidden: showValidate === false || readOnly === true, // 这个是强制的展示与否
  };

  const placeholderTitleProps = {
    className: labelClass,
    style: labelStyle,
  };

  const _showTitle = !hideTitle && typeof _schema.title === 'string';
  // TODO: 这块最好能判断上一层是list1，
  if (hideTitle && _schema.title) {
    _schema.placeholder = _schema.placeholder || _schema.title;
  }

  const _getValue = path => {
    return getValueByPath(formData, path);
  };

  const widgetProps = {
    $id,
    schema: _schema,
    readOnly,
    disabled,
    onChange,
    getValue: _getValue,
    formData,
    value: _value,
    dependValues,
    onItemChange,
    dataIndex,
    dataPath,
    children,
  };

  // if (_schema && _schema.default !== undefined) {
  //   widgetProps.value = _schema.default;
  // }

  // checkbox必须单独处理，布局太不同了
  if (isCheckBoxType(_schema, readOnly)) {
    return (
      <>
        {_showTitle && <div {...placeholderTitleProps} />}
        <div className={contentClass} style={contentStyle}>
          <ExtendedWidget {...widgetProps} />
          <Extra {...widgetProps} />
          <ErrorMessage {...messageProps} />
        </div>
      </>
    );
  }

  let titleElement = <FieldTitle {...titleProps} />;

  return (
    <>
      {_showTitle && titleElement}
      <div
        className={`${contentClass} ${hideTitle ? 'fr-content-no-title' : ''}`}
        style={contentStyle}
      >
        <ExtendedWidget {...widgetProps} />
        <Extra {...widgetProps} />
        <ErrorMessage {...messageProps} />
      </div>
    </>
  );
};

export default RenderField;
