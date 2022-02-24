import React from 'react';
import { useStore2 } from '../../hooks';
import { isCheckBoxType, isListType, isObjType } from '../../utils';
import ErrorMessage from './ErrorMessage';
import Extra from './Extra';
import FieldTitle from './Title';
import ExtendedWidget from './ExtendedWidget';
import RenderList from '../RenderChildren/RenderList';
import RenderObject from '../RenderChildren/RenderObject';

// TODO: 之后不要直接用get，收口到一个内部方法getValue，便于全局 ctrl + f 查找
const RenderField = props => {
  const {
    dataPath,
    readOnly,
    schema,
    labelClass,
    labelStyle,
    contentClass,
    children,
    errorFields = [],
    hideTitle,
    displayType,
    item,
  } = props;

  const { showValidate } = useStore2();
  // console.log('<renderField>', $id);

  const errObj = errorFields.find(err => err.name === dataPath);
  const errorMessage = errObj && errObj.error; // 是一个list
  const hasError = Array.isArray(errorMessage) && errorMessage.length > 0;
  // 补上这个class，会自动让下面所有的展示ui变红！
  const _contentClass =
    hasError && showValidate
      ? contentClass + ' ant-form-item-has-error'
      : contentClass;

  const titleProps = {
    labelClass,
    labelStyle,
    schema,
    displayType,
  };

  const messageProps = {
    message: errorMessage,
    schema,
    displayType,
    softHidden: displayType === 'inline', // 这个是如果没有校验信息时，展示与否
    hardHidden: showValidate === false || readOnly === true, // 这个是强制的展示与否
  };

  const placeholderTitleProps = {
    className: labelClass,
    style: labelStyle,
  };

  const isObj = isObjType(schema);
  const isList = isListType(schema);
  const hasChildren = item.children && item.children.length > 0;
  const _showTitle = !isObj && !hideTitle && typeof schema.title === 'string';

  if (hideTitle && schema.title) {
    schema.placeholder = schema.placeholder || schema.title;
  }

  // checkbox必须单独处理，布局太不同了
  if (isCheckBoxType(schema, readOnly)) {
    return (
      <>
        {_showTitle && <div {...placeholderTitleProps} />}
        <div className={_contentClass}>
          <ExtendedWidget {...props}>{schema.title}</ExtendedWidget>
          <Extra {...props} />
          <ErrorMessage {...messageProps} />
        </div>
      </>
    );
  }

  let _children = <ExtendedWidget {...props}>{children}</ExtendedWidget>;

  if (hasChildren) {
    if (isObj) {
      _children = <RenderObject {...props}>{item.children}</RenderObject>;
    }

    if (isList) {
      _children = <RenderList {...props}>{item.children}</RenderList>;
    }
  }

  return (
    <>
      {_showTitle && <FieldTitle {...titleProps} />}
      <div
        className={`${_contentClass} ${hideTitle ? 'fr-content-no-title' : ''}`}
      >
        {_children}
        <Extra {...props} />
        {!isObj && <ErrorMessage {...messageProps} />}
      </div>
    </>
  );
};

export default RenderField;
