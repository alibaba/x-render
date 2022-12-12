import React, { useRef } from 'react';
import { useStore, useStore2 } from '../hooks';
import {
  clone,
  getDataPath,
  getParentPath,
  getParentProps,
  getValueByPath,
  isCheckBoxType,
  isCssLength,
  isListType,
  isLooselyNumber,
  isObjType,
  parseRootValueInSchema,
} from '../utils';
import RenderList from './RenderChildren/RenderList';
import RenderObject from './RenderChildren/RenderObject';
import RenderField from './RenderField';

const Core = ({
  id = '#',
  _item, // 如果直接传了item，就不用id去取item, 暂时是内部属性，不外用
  dataIndex = [], // 数据来源是数组的第几个index，上层每有一个list，就push一个index
  hideTitle = false,
  hideValidation = false,
  debugCss,
  ...rest
}) => {
  const snapShot = useRef();

  const { flatten, errorFields, isEditing, formData, allTouched } = useStore();
  const { displayType, column, labelWidth, readOnly, labelAlign } = useStore2();
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

  const dataProps = {
    id,
    item, // 如果直接传了item，就不用id去取item, 暂时是内部属性，不外用
    dataIndex, // 数据来源是数组的第几个index，上层每有一个list，就push一个index
    dataPath,
    _value,
    dependValues,
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
    labelAlign,
    ...rest,
  };

  return <CoreRender {...dataProps} />;
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
  dependValues,
  displayType,
  labelAlign,
  column,
  labelWidth,
  readOnly,
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
  const _labelAlign =
    schema.labelAlign || rest.labelAlign || labelAlign || 'right';
  const isList = isListType(schema);
  const isObj = isObjType(schema);
  const isComplex = isObj || isList;
  const isCheckBox = isCheckBoxType(schema, readOnly);
  const width = schema.width || schema['ui:width'];
  let containerClass = `fr-field ${
    _displayType === 'inline' ? '' : 'w-100'
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
          _displayType === 'column' ? 'flex-column' : ''
        }`;
      }
      break;
    default:
  }
  // column specific className
  if (!isComplex && !isCheckBox) {
    if (_displayType === 'column') {
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
    } else if (_displayType === 'row') {
      // row specific className
      containerClass += '';
      labelClass += ` fr-label-row ${
        _labelAlign === 'right' ? 'fr-label-align-right' : 'fr-label-align-left'
      }`;
      contentClass += ' fr-content-row';
      if (!isObj && !isCheckBox) {
        labelClass += ' flex-shrink-0 fr-label-row';
        contentClass += ' flex-grow-1 relative';
      }
    }
  }

  // style part
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

  // 如果传入自定义样式则覆盖使用，object 外层样式使用 schema.style，内层样式使用 schema.props.style
  if ('object' === typeof schema?.style) {
    columnStyle = {
      ...columnStyle,
      ...schema.style,
    };
  }

  const _labelWidth = isLooselyNumber(effectiveLabelWidth)
    ? Number(effectiveLabelWidth)
    : isCssLength(effectiveLabelWidth)
    ? effectiveLabelWidth
    : 110; // 默认是 110px 的长度

  let labelStyle = { width: _labelWidth };
  if (isComplex || _displayType === 'column') {
    labelStyle = { flexGrow: 1 };
  }

  if (_displayType === 'inline') {
    labelStyle = { marginTop: 5, paddingLeft: 12 };
    labelClass = '';
    contentClass += ' fr-content-inline';
    if (containerClass.indexOf('fr-field-object') === -1) {
      containerClass += ' fr-field-inline';
    }
  }

  const hasChildren = item.children && item.children.length > 0;

  const fieldProps = {
    $id: id,
    dataIndex,
    dataPath,
    _value,
    dependValues,
    _schema: schema,
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
    <div className={`flex flex-wrap`}>
      <RenderObject
        dataIndex={dataIndex}
        errorFields={errorFields}
        displayType={_displayType}
        labelAlign={_labelAlign}
        hideTitle={hideTitle}
      >
        {item.children}
      </RenderObject>
    </div>
  );

  const listChildren = (
    <RenderList
      parentId={id}
      schema={schema}
      dataIndex={dataIndex}
      errorFields={errorFields}
      displayType={_displayType}
      hideTitle={hideTitle}
    >
      {item.children}
    </RenderList>
  );

  // 计算 children
  let _children = null;
  if (hasChildren) {
    if (isObj) {
      _children = objChildren;
    } else if (isList) {
      _children = listChildren;
    }
  } else if (isCheckBox) {
    _children = schema.title;
  }

  return (
    <div
      style={columnStyle}
      className={`${containerClass} ${debugCss ? 'debug' : ''}`}
    >
      <RenderField {...fieldProps}>{_children}</RenderField>
    </div>
  );
};

// haven't used
const areEqual = (prev, current) => {
  if (prev.allTouched !== current.allTouched) {
    return false;
  }
  if (prev.displayType !== current.displayType) {
    return false;
  }
  if (prev.column !== current.column) {
    return false;
  }
  if (prev.labelWidth !== current.labelWidth) {
    return false;
  }
  if (prev.readOnly !== current.readOnly) {
    return false;
  }
  if (prev.disabled !== current.disabled) {
    return false;
  }
  if (prev.schema && current.schema) {
    if (prev.schema.$id === '#') {
      return false;
    }
  }
  if (isObjType(prev.schema) && isObjType(current.schema)) {
    return false;
  }
  if (
    JSON.stringify(prev.dependValues) !== JSON.stringify(current.dependValues)
  ) {
    return false;
  }
  if (
    JSON.stringify(prev._value) === JSON.stringify(current._value) &&
    JSON.stringify(prev.schema) === JSON.stringify(current.schema) &&
    JSON.stringify(prev.errorFields) === JSON.stringify(current.errorFields)
  ) {
    return true;
  }
  return false;
};

export default Core;
