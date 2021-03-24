import React, { useEffect, useRef } from 'react';
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
const RenderField = ({
  $id,
  dataIndex,
  item,
  labelClass,
  labelStyle,
  contentClass,
  hasChildren,
  children,
  errorFields = [],
  hideTitle,
  hideValidation,
}) => {
  const { schema } = item;
  const {
    onItemChange,
    formData,
    displayType,
    isEditing,
    setEditing,
    extend,
  } = useStore();

  const snapShot = useRef();

  // 计算数据的真实路径，bind字段会影响
  let dataPath = getDataPath($id, dataIndex);
  // TODO: bind 允许bind数组，如果是bind数组，需要更多的处理。暂时只支持bind单个
  // const isMultiPaths =
  //   Array.isArray(schema.bind) &&
  //   schema.bind.every(item => typeof item === 'string');
  if (schema && schema.bind) {
    if (typeof schema.bind === 'string') {
      dataPath = getDataPath(schema.bind, dataIndex);
    }
    // else if (isMultiPaths) {
    //   dataPath = schema.bind.map(b => getDataPath(b, dataIndex));
    // }
  }

  // 解析schema

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
  const errList = errObj && errObj.error;
  const errorMessage = Array.isArray(errList) ? errList[0] : undefined;

  // dataPath 有3种情况："#"、"a.b.c"、["a.b.c", "e.d.f"]
  const getValue = () => {
    // if (isMultiPaths) {
    //   return dataPath.map(path => getValueByPath(formData, path));
    // }
    return getValueByPath(formData, dataPath);
  };

  // 从全局 formData 获取 value
  const _value = getValue(dataPath, formData);

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
    // 开始编辑，节流
    setEditing(true);
    debouncedSetEditing(false);
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

  const _hideValidation =
    isObjType(_schema) || (hideValidation && !errorMessage);

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

  // checkbox必须单独处理，布局太不同了
  if (isCheckBoxType(_schema)) {
    return (
      <>
        {_showTitle && <div {...placeholderTitleProps} />}
        <div className={contentClass} style={contentStyle}>
          <ExtendedWidget {...widgetProps} />
          {_hideValidation ? null : <ErrorMessage message={errorMessage} />}
        </div>
      </>
    );
  }

  const titleElement = _showTitle && <FieldTitle {...titleProps} />;

  if (isObjType(_schema)) {
    return (
      <div className={contentClass} style={contentStyle}>
        <ExtendedWidget {...widgetProps} title={titleElement} />
        {_hideValidation ? null : <ErrorMessage message={errorMessage} />}
      </div>
    );
  }

  return (
    <>
      {titleElement}
      <div className={contentClass} style={contentStyle}>
        <ExtendedWidget {...widgetProps} />
        {_hideValidation ? null : <ErrorMessage message={errorMessage} />}
      </div>
    </>
  );
};

export default RenderField;
