import React from 'react';
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
} from '../utils';

// rest: 允许在每层FR重新定义全局props，覆盖
const Core = ({
  id = '#',
  _item, // 如果直接传了item，就不用id去取item, 暂时是内部属性，不外用
  dataIndex = [], // 数据来源是数组的第几个index，上层每有一个list，就push一个index
  hideTitle = false,
  hideValidation = false,
  ...rest
}) => {
  // console.log('<Core>');
  const { displayType, column, flatten, errorFields, labelWidth } = useStore();
  const _displayType = rest.displayType || displayType || 'column';
  const item = _item ? _item : flatten[id];
  if (!item) return null;

  const { schema } = item;
  const isObjType = schema.type === 'object'; // TODO: 这个好像太笼统了，万一不是这样呢
  const isList = isListType(schema);
  const isComplex = isObjType || isList;
  const isCheckBox = isCheckBoxType(schema);
  const width = schema.width || schema['ui:width'];
  let containerClass = `fr-field ${
    _displayType === 'inline' ? '' : 'w-100'
  } flex`;
  let labelClass = `fr-label`;
  let contentClass = `fr-content`;
  // common classNames dispite row or column
  switch (schema.type) {
    case 'object':
      if (isObjType) {
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
          // labelClass += ' fr-label-list';
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
      if (!isObjType && !isCheckBox) {
        labelClass += ' flex-shrink-0 fr-label-row';
        contentClass += ' flex-grow-1 relative';
      }
    }
  }

  // style part
  let columnStyle = {};
  if (!isObjType) {
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
    getParentProps('ui:labelWidth', id, flatten) || labelWidth;
  const _labelWidth = isLooselyNumber(effectiveLabelWidth)
    ? Number(effectiveLabelWidth)
    : isCssLength(effectiveLabelWidth)
    ? effectiveLabelWidth
    : 110; // 默认是 110px 的长度

  let labelStyle = { width: _labelWidth };
  if (isComplex || _displayType === 'column') {
    labelStyle = { flexGrow: 1 };
  }

  const hasChildren = item.children && item.children.length > 0;

  const fieldProps = {
    $id: id,
    dataIndex,
    item,
    labelClass,
    labelStyle,
    contentClass,
    errorFields,
    hasChildren,
    // 层级间可使用的字段
    hideTitle,
    hideValidation,
  };

  const objChildren = hasChildren ? (
    <ul className={`flex flex-wrap pl0`}>
      <RenderObject dataIndex={dataIndex} errorFields={errorFields}>
        {item.children}
      </RenderObject>
    </ul>
  ) : null;

  const listChildren = hasChildren ? (
    <RenderList parentId={id} dataIndex={dataIndex} errorFields={errorFields}>
      {item.children}
    </RenderList>
  ) : null;

  // TODO: list 也要算进去
  return (
    <div style={columnStyle} className={containerClass}>
      <RenderField {...fieldProps}>
        {isObjType && objChildren}
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
