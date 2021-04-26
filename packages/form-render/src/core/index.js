import React, { useRef } from 'react';
import RenderList from './RenderChildren/RenderList';
import RenderObject from './RenderChildren/RenderObject';
import RenderField from './RenderField';
import { useStore } from '../hooks';
import {
  isLooselyNumber,
  isCssLength,
  getParentProps,
  isListType,
  isCheckBoxType,
  isObjType,
  getDataPath,
  clone,
  schemaContainsExpression,
  parseAllExpression,
} from '../utils';

// rest: 允许在每层FR重新定义全局props，覆盖
const Core = ({
  id = '#',
  _item, // 如果直接传了item，就不用id去取item, 暂时是内部属性，不外用
  dataIndex = [], // 数据来源是数组的第几个index，上层每有一个list，就push一个index
  hideTitle = false,
  hideValidation = false,
  debugCss,
  ...rest
}) => {
  // console.log('<Core>');
  const snapShot = useRef();

  const {
    displayType,
    column,
    flatten,
    errorFields,
    labelWidth,
    readOnly,
    isEditing,
    formData,
  } = useStore();
  const item = _item ? _item : flatten[id];
  if (!item) return null;

  const { schema: _schema } = item;

  let dataPath = getDataPath(id, dataIndex);
  let schema = clone(_schema); // TODO: 用deepClone，函数啥的才能正常copy，但是deepClone的代价是不是有点大，是否应该让用户避免schema里写函数

  // 节流部分逻辑，编辑时不执行
  if (isEditing && snapShot.current) {
    schema = snapShot.current;
  } else {
    if (schemaContainsExpression(schema)) {
      schema = parseAllExpression(schema, formData, dataPath);
    }
    snapShot.current = schema;
  }

  if (schema.hidden) {
    return null;
  }
  // displayType 一层层网上找值
  const _displayType =
    schema.displayType || rest.displayType || displayType || 'column';
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
      labelClass += ' fr-label-row';
      contentClass += ' fr-content-row';
      if (!isObj && !isCheckBox) {
        labelClass += ' flex-shrink-0 fr-label-row';
        contentClass += ' flex-grow-1 relative';
      }
    }
  }

  // style part
  let columnStyle = {};
  if (!isObj) {
    if (width) {
      columnStyle = {
        width,
        paddingRight: '12px',
      };
    } else if (column > 1) {
      columnStyle = {
        width: `calc(100% /${column})`,
        paddingRight: '12px',
      };
    }
  }

  // 真正有效的label宽度需要从现在所在item开始一直往上回溯（设计成了继承关系），找到的第一个有值的 ui:labelWidth
  const effectiveLabelWidth =
    getParentProps('labelWidth', id, flatten) || labelWidth;
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
    item: { ...item, schema },
    labelClass,
    labelStyle,
    contentClass,
    errorFields,
    hasChildren,
    // 层级间可使用的字段
    displayType: _displayType,
    hideTitle,
    hideValidation,
  };

  const objChildren = hasChildren ? (
    <div className={`flex flex-wrap`}>
      <RenderObject
        dataIndex={dataIndex}
        errorFields={errorFields}
        displayType={_displayType}
        hideTitle={hideTitle}
      >
        {item.children}
      </RenderObject>
    </div>
  ) : null;

  const listChildren = hasChildren ? (
    <RenderList
      parentId={id}
      dataIndex={dataIndex}
      errorFields={errorFields}
      displayType={_displayType}
      hideTitle={hideTitle}
    >
      {item.children}
    </RenderList>
  ) : null;

  return (
    <div
      style={columnStyle}
      className={`${containerClass} ${debugCss ? 'debug' : ''}`}
    >
      <RenderField {...fieldProps}>
        {isObj && objChildren}
        {isList && listChildren}
      </RenderField>
    </div>
  );
};

export default Core;

// const FieldWrapper = ({ children, ...rest }) => {
//   const fieldProps = { ...rest };
//   return React.cloneElement(children, fieldProps);
// };
