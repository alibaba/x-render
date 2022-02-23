import React from 'react';
import RenderField from './RenderField';
import {
  isLooselyNumber,
  isCssLength,
  isListType,
  isCheckBoxType,
  isObjType,
} from '../utils';

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

const getLabelStyle = (labelWidth, {
  isComplex,
  displayType
}) => {
  const _labelWidth = isLooselyNumber(labelWidth)
    ? Number(labelWidth)
    : isCssLength(labelWidth)
    ? labelWidth
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

const CoreRender = (props) => {
  const {
    debugCss,
    schema,
    readOnly,
    displayType,
    labelWidth,
    column,
  } = props;

  if (schema.hidden) {
    return null;
  }

  // 样式的逻辑全放在这层
  const isList = isListType(schema);
  const isObj = isObjType(schema);
  const isComplex = isObj || isList;
  const isCheckBox = isCheckBoxType(schema, readOnly);
  const options = {
    isList,
    isObj,
    isComplex,
    isCheckBox,
    displayType,
  }
  const {
    containerClass,
    labelClass,
    contentClass,
  } = getClassNames(schema, options);
  const columnStyle = getColumnStyle(schema, column, options);
  const labelStyle = getLabelStyle(labelWidth, options);

  const fieldProps = {
    ...props,
    labelClass,
    contentClass,
    labelStyle,
  };

  return (
    <div
      style={columnStyle}
      className={`${containerClass} ${debugCss ? 'debug' : ''}`}
    >
      <RenderField {...fieldProps} />
    </div>
  );
};

export default CoreRender;
