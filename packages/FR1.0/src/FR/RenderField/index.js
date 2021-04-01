import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../../hooks';
import useDebouncedCallback from '../../useDebounce';
import {
  getDataPath,
  getValueByPath,
  isCheckBoxType,
  isObjType,
  schemaContainsExpression,
  parseAllExpression,
  parseSingleExpression,
  isExpression,
  isObject,
  clone,
} from '../../utils';
import ErrorMessage from './ErrorMessage';
import FieldTitle from './Title';
import ExtendedWidget from './ExtendedWidget';

// TODO: 之后不要直接用get，收口到一个内部方法getValue，便于全局 ctrl + f 查找
const RenderField = props => {
  const {
    $id,
    dataIndex,
    item,
    labelClass,
    labelStyle,
    contentClass: _contentClass,
    hasChildren,
    children,
    errorFields = [],
    hideTitle,
    hideValidation,
  } = props;

  const { schema } = item;
  const store = useStore();
  const {
    onItemChange,
    formData,
    displayType,
    isEditing,
    setEditing,
    extend,
    touchKey,
    debounceInput,
  } = store;
  console.log('renderField', $id);
  const snapShot = useRef();
  const hasSetDefault = useRef(false);
  let dataPath = getDataPath($id, dataIndex);
  let _schema = clone(schema); // TODO: 用deepClone，函数啥的才能正常copy，但是deepClone的代价是不是有点大，是否应该让用户避免schema里写函数
  let _rules = [...item.rules];

  // 节流部分逻辑，编辑时不执行
  if (isEditing && snapShot.current) {
    _schema = snapShot.current;
  } else {
    if (schemaContainsExpression(_schema)) {
      _schema = parseAllExpression(_schema, formData, dataPath);
    }
    snapShot.current = _schema;

    _rules = _rules.map(rule => {
      // if (rule.required) debugger;
      const newRule = {};
      Object.keys(rule).forEach(key => {
        const needParse = isExpression(rule[key]);
        newRule[key] = needParse
          ? parseSingleExpression(rule[key], formData, dataPath)
          : rule[key];
      });
      return newRule;
    });
  }

  const errObj = errorFields.find(err => err.name === dataPath);
  const errorMessage = errObj && errObj.error; // 是一个list
  const hasError = Array.isArray(errorMessage) && errorMessage.length > 0;
  // 补上这个class，会自动让下面所有的展示ui变红！
  const contentClass = hasError
    ? _contentClass + ' ant-form-item-has-error'
    : _contentClass;

  const _value = getValueByPath(formData, dataPath);

  // check: 由于是专门针对checkbox的，目前只好写这里
  let _labelStyle = labelStyle;
  if (isCheckBoxType(_schema)) {
    _labelStyle = { flexGrow: 1 };
  }

  let contentStyle = {};
  if (isCheckBoxType(_schema) && displayType === 'row') {
    contentStyle.marginLeft = labelStyle.width;
  }

  const outMapProps = isObject(extend) && extend[dataPath];
  const _outMapProps =
    typeof outMapProps === 'function' ? outMapProps : () => {};

  const debouncedSetEditing = useDebouncedCallback(setEditing, 350);

  // TODO: 优化一下，只有touch还是false的时候，setTouched
  const onChange = value => {
    // 动过的key，算被touch了
    touchKey(dataPath);
    // 开始编辑，节流
    if (debounceInput) {
      setEditing(true);
      debouncedSetEditing(false);
    }
    if (typeof dataPath === 'string') {
      onItemChange(dataPath, value);
    }
  };

  const titleProps = {
    labelClass,
    labelStyle: _labelStyle,
    schema: _schema,
  };

  const placeholderTitleProps = {
    className: labelClass,
    style: _labelStyle,
  };

  const _showTitle = !hideTitle && !!_schema.title;

  const _hideValidation = hideValidation && !errorMessage;

  const widgetProps = {
    schema: _schema,
    onChange,
    value: _value,
    onItemChange,
  };

  if (_outMapProps) {
    widgetProps.mapProps = _outMapProps;
  }

  widgetProps.children = hasChildren
    ? children
    : isCheckBoxType(_schema)
    ? _schema.title
    : null;
  if (
    _schema &&
    _schema.default !== undefined &&
    hasSetDefault.current === false
  ) {
    widgetProps.value = _schema.default;
    hasSetDefault.current = true;
  }

  // checkbox必须单独处理，布局太不同了
  if (isCheckBoxType(_schema)) {
    return (
      <>
        {_showTitle && <div {...placeholderTitleProps} />}
        <div className={contentClass} style={contentStyle}>
          <ExtendedWidget {...widgetProps} />
          {_hideValidation ? null : (
            <ErrorMessage message={errorMessage} schema={_schema} />
          )}
        </div>
      </>
    );
  }

  let titleElement = <FieldTitle {...titleProps} />;

  if (isObjType(_schema)) {
    titleElement = (
      <div style={{ display: 'flex' }}>
        {titleElement}
        {_hideValidation ? null : (
          <ErrorMessage message={errorMessage} schema={_schema} />
        )}
      </div>
    );
  }

  if (isObjType(_schema)) {
    return (
      <div className={contentClass} style={contentStyle}>
        <ExtendedWidget
          {...widgetProps}
          message={_hideValidation ? null : errorMessage}
          title={_showTitle ? titleElement : undefined}
        />
      </div>
    );
  }

  return (
    <>
      {_showTitle && titleElement}
      <div className={contentClass} style={contentStyle}>
        <ExtendedWidget {...widgetProps} />
        {_hideValidation ? null : (
          <ErrorMessage message={errorMessage} schema={_schema} />
        )}
      </div>
    </>
  );
};

export default RenderField;
