import React, { Suspense } from 'react';
import { useStore } from '../../../utils/hooks';
import {
  isLooselyNumber,
  isCssLength,
  getParentProps,
  transformProps,
} from '../../../utils';
import { getWidgetName } from '../../../utils/mapping';

const RenderField = ({
  $id,
  item,
  labelClass,
  contentClass,
  isComplex,
  children,
}) => {
  const { schema, data } = item;
  const { onItemChange, flatten, widgets, mapping, frProps = {} } = useStore();
  const { labelWidth, displayType, showValidate } = frProps;
  const { title, description, required } = schema;

  let widgetName = getWidgetName(schema, mapping);
  const customWidget = schema['widget'];
  if (customWidget && widgets[customWidget]) {
    widgetName = customWidget;
  }
  let Widget = widgets[widgetName];
  // 如果不存在，比如有外部的自定义组件名称，使用默认展示组件
  if (!Widget) {
    const defaultSchema = { ...schema };
    delete defaultSchema['widget'];
    widgetName = getWidgetName(defaultSchema, mapping);
    Widget = widgets[widgetName] || 'input';
  }
  // if (widgetName === 'multiSelect') {
  //   console.log(schema['widget'], customWidget, Widget);
  // }
  // 真正有效的label宽度需要从现在所在item开始一直往上回溯（设计成了继承关系），找到的第一个有值的 labelWidth
  const effectiveLabelWidth =
    getParentProps('labelWidth', $id, flatten) || labelWidth;
  const _labelWidth = isLooselyNumber(effectiveLabelWidth)
    ? Number(effectiveLabelWidth)
    : isCssLength(effectiveLabelWidth)
    ? effectiveLabelWidth
    : 110; // 默认是 110px 的长度

  let labelStyle = { width: _labelWidth };
  if (widgetName === 'checkbox') {
    labelStyle = { flexGrow: 1 };
  } else if (isComplex || displayType === 'column') {
    labelStyle = { flexGrow: 1 };
  }

  const onChange = value => {
    const newItem = { ...item };
    if (item.schema.type === 'boolean' && item.schema.widget === 'checkbox') {
      newItem.data = !value;
    } else {
      newItem.data = value;
    }
    onItemChange($id, newItem, 'data');
  };

  let contentStyle = {};
  if (widgetName === 'checkbox' && displayType === 'row') {
    contentStyle.marginLeft = effectiveLabelWidth;
  }

  // TODO: useMemo
  // 改为直接使用form-render内部自带组件后不需要再包一层options
  const usefulWidgetProps = transformProps({
    value: data || schema.default,
    checked: data,
    disabled: schema.disabled,
    readOnly: schema.readOnly,
    format: schema.format,
    onChange,
    schema,
    ...schema['props'],
  });

  return (
    <>
      {schema.title ? (
        <div className={labelClass} style={labelStyle}>
          <label
            className={`fr-label-title ${
              widgetName === 'checkbox' || displayType === 'column'
                ? 'no-colon'
                : ''
            }`} // checkbox不带冒号
            title={title}
          >
            {required && <span className="fr-label-required"> *</span>}
            <span
              className={`${isComplex ? 'b' : ''} ${
                displayType === 'column' ? 'flex-none' : ''
              }`}
            >
              {title}
            </span>
            {description && (
              <span className="fr-desc ml2">(&nbsp;{description}&nbsp;)</span>
            )}
            {displayType !== 'row' && showValidate && (
              <span className="fr-validate">validation</span>
            )}
          </label>
        </div>
      ) : null}
      <div className={contentClass} style={contentStyle}>
        <Suspense fallback={<div></div>}>
          <Widget {...usefulWidgetProps}>{children || null}</Widget>
        </Suspense>
      </div>
    </>
  );
};

export default RenderField;
