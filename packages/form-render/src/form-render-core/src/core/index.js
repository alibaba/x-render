import React, { useRef } from 'react';
import RenderList from './RenderChildren/RenderList';
import RenderObject from './RenderChildren/RenderObject';
import RenderField from './RenderField';
import { useStore, useStore2, useTools } from '../hooks';
import {
  isLooselyNumber,
  isCssLength,
  getParentProps,
  getParentPath,
  isListType,
  isCheckBoxType,
  isObjType,
  getValueByPath,
  getDataPath,
  parseRootValueInSchema,
  clone,
} from '../utils';
import useDebouncedCallback from '../useDebounce';
import { validateField } from '../validator';

const Core = ({
  id = '#',
  _item, // 如果直接传了item，就不用id去取item, 暂时是内部属性，不外用
  dataIndex = [], // 数据来源是数组的第几个index，上层每有一个list，就push一个index
  hideTitle = false,
  hideValidation = false,
  debugCss,
  ...rest
}) => {
  // console.log('<Core>', id);
  const snapShot = useRef();

  const { flatten, errorFields, isEditing, formData, allTouched } = useStore();
  const {
    debounceInput,
    validateMessages,
    locale,
    displayType,
    column,
    labelWidth,
    readOnly,
    disabled,
  } = useStore2();
  const {
    onValuesChange,
    onItemChange,
    setEditing,
    touchKey,
    _setErrors,
  } = useTools();
  const formDataRef = useRef();
  const debouncedSetEditing = useDebouncedCallback(setEditing, 350);
  formDataRef.current = formData;
  const item = _item ? _item : flatten[id];
  if (!item) return null;

  let dataPath = getDataPath(id, dataIndex);
  const parentPath = getParentPath(dataPath);
  const _value = getValueByPath(formData, dataPath);
  let schema = clone(item.schema);
  const dependencies = schema.dependencies;
  const dependValues = [];
  let rootValue;

  try {
    if (Array.isArray(dependencies)) {
      dependencies.forEach(item => {
        const itemPath = getDataPath(item, dataIndex);
        const result = getValueByPath(formData, itemPath);
        dependValues.push(result);
      });
    }
  } catch (error) {
    console.error(`dependencies 计算报错，${dependencies}`);
  }

  try {
    rootValue = getValueByPath(formData, parentPath);
  } catch (error) {}

  // 节流部分逻辑，编辑时不执行
  if (isEditing && snapShot.current) {
    schema = snapShot.current;
  } else {
    if (JSON.stringify(schema).indexOf('rootValue') > -1) {
      schema = parseRootValueInSchema(schema, rootValue);
    }

    snapShot.current = schema;
  }

  // 真正有效的label宽度需要从现在所在item开始一直往上回溯（设计成了继承关系），找到的第一个有值的 ui:labelWidth
  const effectiveLabelWidth =
    getParentProps('labelWidth', id, flatten) || labelWidth;

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
              ? error2
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

  const _readOnly = readOnly !== undefined ? readOnly : schema.readOnly;
  const _disabled = disabled !== undefined ? disabled : schema.disabled;

  const dataProps = {
    id,
    item, // 如果直接传了item，就不用id去取item, 暂时是内部属性，不外用
    dataIndex, // 数据来源是数组的第几个index，上层每有一个list，就push一个index
    dataPath,
    _value,
    onChange,
    dependValues,
    readOnly: _readOnly,
    disabled: _disabled,
    hideTitle,
    hideValidation,
    debugCss,
    schema,
    displayType,
    column,
    labelWidth,
    readOnly,
    errorFields,
    effectiveLabelWidth,
    allTouched,
    ...rest,
  };

  return <CoreRender {...dataProps} />;
};

const getClassNames = (schema, {
  isList,
  isObj,
  isComplex,
  isCheckBox,
  displayType,
}) => {
  let containerClass = `fr-field ${
    displayType === 'inline' ? '' : 'w-100'
  } flex`;
  let labelClass = `fr-label`;
  let contentClass = `fr-content`;

  if (typeof schema.className === 'string') {
    containerClass += ' ' + schema.className;
  }

  // common classNames dispite row or column
  switch (schema.type) {
    case 'object':
      if (isObj) {
        if (schema.title) {
          labelClass += ' fr-label-object';
        }
        containerClass += ' fr-field-object';
      }
      break;
    case 'array':
      // list 有两种展示形式！
      if (isList) {
        if (schema.title) {
          labelClass += ' fr-label-list';
        }
        containerClass += ' fr-field-column';
      }
      break;
    case 'boolean':
      if (isCheckBox) {
        contentClass += ' fr-content-column'; // checkbox高度短，需要居中对齐
        containerClass += ` flex ${
          displayType === 'column' ? 'flex-column' : ''
        }`;
      }
      break;
    default:
  }
  // column specific className
  if (!isComplex && !isCheckBox) {
    if (displayType === 'column') {
      containerClass += ' flex-column';
      labelClass += ' fr-label-column';
      contentClass += ' fr-content-column';
      switch (schema.type) {
        case 'object':
          break;
        case 'array':
          if (schema.title && !schema.enum) {
            // labelClass += ' b mb2';
          }
          break;
        case 'boolean':
          break;
        default:
      }
    } else if (displayType === 'row') {
      // row specific className
      containerClass += '';
      labelClass += ' fr-label-row';
      contentClass += ' fr-content-row';
      if (!isObj && !isCheckBox) {
        labelClass += ' flex-shrink-0 fr-label-row';
        contentClass += ' flex-grow-1 relative';
      }
    }
  }

  if (displayType === 'inline') {
    labelClass = '';
    contentClass += ' fr-content-inline';
    if (containerClass.indexOf('fr-field-object') === -1) {
      containerClass += ' fr-field-inline';
    }
  }

  return {
    containerClass,
    labelClass,
    contentClass,
  };
};

const getColumnStyle = (schema, column, { isObj }) => {
  const width = schema.width || schema['ui:width'];
  let columnStyle = {};
  if (schema.hidden) {
    columnStyle.display = 'none';
  }
  if (!isObj) {
    if (width) {
      columnStyle.width = width;
      columnStyle.paddingRight = 8;
    } else if (column > 1) {
      columnStyle.width = `calc(100% /${column})`;
      columnStyle.paddingRight = 8;
    }
  }
  return columnStyle;
};

const getLabelStyle = (effectiveLabelWidth, {
  isComplex,
  displayType
}) => {
  const _labelWidth = isLooselyNumber(effectiveLabelWidth)
    ? Number(effectiveLabelWidth)
    : isCssLength(effectiveLabelWidth)
    ? effectiveLabelWidth
    : 110; // 默认是 110px 的长度

  let labelStyle = { width: _labelWidth };
  if (isComplex || displayType === 'column') {
    labelStyle = { flexGrow: 1 };
  }

  if (displayType === 'inline') {
    labelStyle = { marginTop: 5, paddingLeft: 12 };
  }
  return labelStyle;
};

const CoreRender = ({
  id,
  item,
  dataIndex,
  dataPath,
  hideTitle,
  hideValidation,
  debugCss,
  schema,
  _value,
  onChange,
  dependValues,
  displayType,
  column,
  labelWidth,
  readOnly,
  disabled,
  errorFields,
  effectiveLabelWidth,
  ...rest
}) => {
  if (schema.hidden) {
    return null;
  }
  // 样式的逻辑全放在这层
  // displayType 一层层网上找值
  const _displayType =
    schema.displayType || rest.displayType || displayType || 'column';
  const isList = isListType(schema);
  const isObj = isObjType(schema);
  const isComplex = isObj || isList;
  const isCheckBox = isCheckBoxType(schema, readOnly);
  const options = {
    isList,
    isObj,
    isComplex,
    isCheckBox,
    displayType: _displayType,
  }
  const {
    containerClass,
    labelClass,
    contentClass,
  } = getClassNames(schema, options);
  const columnStyle = getColumnStyle(schema, column, options);
  const labelStyle = getLabelStyle(effectiveLabelWidth, options);
  const hasChildren = item.children && item.children.length > 0;

  const fieldProps = {
    $id: id,
    dataIndex,
    dataPath,
    _value,
    onChange,
    dependValues,
    _schema: schema,
    disabled,
    readOnly,
    labelClass,
    labelStyle,
    contentClass,
    errorFields,
    // 层级间可使用的字段
    displayType: _displayType,
    hideTitle,
    hideValidation,
  };

  const objChildren = (
    <RenderObject
      schema={schema}
      dataIndex={dataIndex}
      errorFields={errorFields}
      displayType={_displayType}
      hideTitle={hideTitle}
      value={_value}
      onChange={onChange}
      disabled={disabled}
      readOnly={readOnly}
    >
      {item.children}
    </RenderObject>
  );

  const listChildren = (
    <RenderList
      parentId={id}
      schema={schema}
      dataIndex={dataIndex}
      errorFields={errorFields}
      displayType={_displayType}
      hideTitle={hideTitle}
      disabled={disabled}
      readOnly={readOnly}
    >
      {item.children}
    </RenderList>
  );

  // 计算 children
  let _children = <RenderField {...fieldProps} />;

  if (hasChildren) {
    if (isObj) {
      _children = objChildren;
    } else if (isList) {
      _children = listChildren;
    }
  } else if (isCheckBox) {
    _children = <RenderField {...fieldProps}>{schema.title}</RenderField>;
  }

  return (
    <div
      style={columnStyle}
      className={`${containerClass} ${debugCss ? 'debug' : ''}`}
    >
      {_children}
    </div>
  );
};

export default Core;
