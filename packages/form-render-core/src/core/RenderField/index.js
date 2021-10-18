import React, { useEffect, useRef } from 'react';
import { useStore, useStore2, useTools } from '../../hooks';
import useDebouncedCallback from '../../useDebounce';
import { getValueByPath, isCheckBoxType, isObjType } from '../../utils';
import ErrorMessage from './ErrorMessage';
import Extra from './Extra';
import FieldTitle from './Title';
import { validateField } from '../../validator';
import ExtendedWidget from './ExtendedWidget';

// TODO: 之后不要直接用get，收口到一个内部方法getValue，便于全局 ctrl + f 查找
const RenderField = props => {
  const {
    $id,
    dataIndex,
    dataPath,
    _value,
    dependValues,
    _schema,
    labelClass,
    labelStyle,
    contentClass: _contentClass,
    children,
    errorFields = [],
    hideTitle,
    displayType,
  } = props;

  const { formData, flatten } = useStore();
  const {
    debounceInput,
    readOnly,
    disabled,
    showValidate,
    validateMessages,
    locale,
  } = useStore2();
  const {
    onValuesChange,
    onItemChange,
    setEditing,
    touchKey,
    _setErrors,
  } = useTools();
  const formDataRef = useRef();
  formDataRef.current = formData;
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

  const debouncedSetEditing = useDebouncedCallback(setEditing, 350);

  const _readOnly = readOnly !== undefined ? readOnly : _schema.readOnly;
  const _disabled = disabled !== undefined ? disabled : _schema.disabled;

  const removeDupErrors = arr => {
    if (!Array.isArray(arr)) {
      console.log('in removeDups: param is not an array');
      return;
    }
    var array = [];
    for (var i = 0; i < arr.length; i++) {
      const sameNameIndex = array.findIndex(item => item.name === arr[i].name);
      if (sameNameIndex > -1) {
        const sameNameItem = array[sameNameIndex];
        const error1 = sameNameItem.error;
        const error2 = arr[i].error;
        array[sameNameIndex] = {
          name: sameNameItem.name,
          error:
            error1.length > 0 && error2.length > 0
              ? [...error1, ...error2]
              : [],
        };
      } else {
        array.push(arr[i]);
      }
    }
    return array.filter(
      item => Array.isArray(item.error) && item.error.length > 0
    );
  };

  // TODO: 优化一下，只有touch还是false的时候，setTouched
  const onChange = value => {
    // 动过的key，算被touch了, 这里之后要考虑动的来源
    touchKey(dataPath);
    // 开始编辑，节流
    if (debounceInput) {
      setEditing(true);
      debouncedSetEditing(false);
    }
    if (typeof dataPath === 'string') {
      onItemChange(dataPath, value);
    }
    // 先不暴露给外部，这个api
    if (typeof onValuesChange === 'function') {
      onValuesChange({ [dataPath]: value }, formDataRef.current);
    }

    validateField({
      path: dataPath,
      formData: formDataRef.current,
      flatten,
      options: {
        locale,
        validateMessages,
      },
    }).then(res => {
      _setErrors(errors => {
        return removeDupErrors([...errors, ...res]);
      });
    });
  };

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
    hardHidden: showValidate === false || _readOnly === true, // 这个是强制的展示与否
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
    readOnly: _readOnly,
    disabled: _disabled,
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
  if (isCheckBoxType(_schema, _readOnly)) {
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

  if (isObjType(_schema)) {
    titleElement = (
      <div style={{ display: 'flex' }}>
        {titleElement}
        <ErrorMessage {...messageProps} />
      </div>
    );
    return (
      <div className={contentClass} style={contentStyle}>
        <ExtendedWidget
          {...widgetProps}
          message={errorMessage}
          title={_showTitle ? titleElement : undefined}
        />
        <Extra {...widgetProps} />
      </div>
    );
  }

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
