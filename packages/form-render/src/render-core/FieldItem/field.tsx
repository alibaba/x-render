import React, { createContext, useContext, useEffect } from 'react';
import { Form, Col, Row } from 'antd';
import { useStore } from 'zustand';
import classnames from 'classnames';

import { isCheckBoxType, _get, isObject, getArray } from '../../utils';
import { ConfigContext } from '../../models/context';
import { getWidgetName } from '../../models/mapping';
import { getFormItemLayout } from '../../models/layout';
import getRuleList from '../../models/validates';

const UpperContext: any = createContext(() => {});
const valuePropNameMap = {
  checkbox: 'checked',
  switch: 'checked'
};

const getLabel = (schema: any, displayType: string, widgets: any) => {
  const { title, description, descWidget } = schema;

  if ((!description && !descWidget)) {
    return title;
  }

  const RenderDesc = () => {
    const Widget = widgets[descWidget];
    if (Widget) {
      return <Widget schema={schema} />;
    }

    if (description) {
      return (
        <span className='fr-desc ml2'>
          ({description})
        </span>
      )
    }
    return null;
  };

  if (displayType === 'inline') {
    return title;
  }

  return (
    <>
      {title}
      <RenderDesc />
    </>
  )
};

const getTooltip = (schema: any, displayType: string) => {
  const { descType, description, tooltip } = schema;

  if (tooltip) {
    if (typeof tooltip === 'string') {
      return { title: tooltip };
    }

    return tooltip;
  }

  if (descType === 'widget' || !description) {
    return null;
  }

  if (displayType === 'column' && descType === 'icon') {
    return {
      title: description
    }
  }

  return null;
};

const getColSpan = (formCtx: any, parentCtx: any, schema: any) => {
  let span = 24;

  const column = getParamValue(formCtx, parentCtx, schema)('column');

  if (column) {
    span = 24 / column;
  }

  // 兼容 1.0 逻辑
  if (schema.width) {
    if (schema.width === '100%') {
      span = 24;
    } else if (schema.width === '50%') {
      span = 12;
    } else if (schema.width === '20%') {
      span = 5;
    } else if (schema.width < '50%') {
      span = 8;
    }
  }

  if (schema.cellSpan) {
    span = schema.cellSpan * span;
  }
  return span;
};

const getParamValue = (formCtx: any, upperCtx: any, schema: any) => (valueKey: string, isTop= true) => {
  if (isTop) {
    return schema[valueKey] ?? upperCtx[valueKey] ?? formCtx[valueKey];
  }
  return schema[valueKey] ?? upperCtx[valueKey];
};

const getWidgetProps = (widgetName: string, schema: any, { widgets, methods, form, dependValues, globalProps }) => {
  const widgetProps = {
    ...schema.props,
    addons: {
      ...form,
      globalProps,
      dependValues
    },
  };

  if (dependValues?.length > 0) {
    widgetProps.dependValues = dependValues;
  }

  ['placeholder', 'disabled', 'format', 'onStatusChange', 'className'].forEach(key => {
    if (schema[key]) {
      widgetProps[key] = schema[key];
    }
  });

  // 兼容 1.0 版本逻辑 enum => options
  if (schema.enum && !schema.props?.options) {
    const { enum: enums, enumNames } = schema;
    widgetProps.options = getArray(enums).map((item: any, index: number) => {
      let label = enumNames && Array.isArray(enumNames) ? enumNames[index] : item;
      const isHtml = typeof label === 'string' && label[0] === '<';
      if (isHtml) {
        label = <span dangerouslySetInnerHTML={{ __html: label }} />;
      }
      return { label, value: item };
    });
  }

  // 以 props 结尾的属性，直接透传
  Object.keys(schema).forEach(key => {
    if (
      typeof key === 'string' &&
      key.toLowerCase().indexOf('props') > -1 &&
      key.length > 5
    ) {
      widgetProps[key] = schema[key];
    }
  });

  // 支持 addonAfter 为自定义组件的情况
  if (isObject(widgetProps.addonAfter) && widgetProps.addonAfter.widget) {
    const AddonAfterWidget = widgets[widgetProps.addonAfter.widget];
    widgetProps.addonAfter = <AddonAfterWidget {...schema} />;
  }

  if (['treeSelect', 'number', 'multiSelect', 'select'].includes(widgetName)) {
    widgetProps.style = {
      width: '100%',
      ...widgetProps.style
    }
  }

  if (widgetName === 'multiSelect') {
    widgetProps.mode = 'multiple';
  }

  // Dynamic Mapping of Methods
  if (isObject(schema.methods)) {
    Object.keys(schema.methods).forEach(key => {
      const name = schema.methods[key];
      widgetProps[key] = methods[name];
    });
  }

  widgetProps.schema = schema;
  return widgetProps;
};

const createWidgetStatus = (Component: any, props: any, { form, path, rootPath, maxWidth } ) => {
  const { onStatusChange, style={}, ...otherProps } = props;
  const { status } = Form.Item.useStatus();

  useEffect(() => {
    const errors = form.getFieldError([...(rootPath || []), ...path]);
    onStatusChange && onStatusChange(status, errors);
  }, [status]);

  return <Component { ...otherProps} style={{ maxWidth, ...style}}/>
};

const createWidget = (Component: any, props: any, maxWidth: string) => {
  const { style={}, ...otherProps } = props;
  return <Component { ...otherProps} style={{ maxWidth, ...style}}/>
};

export default (props: any) => {
  const { store, schema, path, children, dependValues, rootPath } = props;

  if (schema?.hidden) {
    return null;
  }

 
  const formCtx: any = useStore(store, (state: any) => state.context);
  const upperCtx: any = useContext(UpperContext);
  const configCtx = useContext(ConfigContext);
  const { form, widgets, methods, globalProps, maxWidth } = configCtx;
  
  const { hidden, properties, dependencies, inlineMode: _inlineMode, ...otherSchema } = schema;

  let widgetName = getWidgetName(schema);
  // Component not found
  if (!widgetName) {
    const ErrorSchema = widgets['errorSchemaWidget'];
    return <ErrorSchema schema={schema} />;
  }

  const getValueFromKey = getParamValue(formCtx, upperCtx, schema);
  let widget = widgets[widgetName] || widgets['html'];
 
  const widgetProps = getWidgetProps(widgetName, schema, { widgets, methods, form, dependValues, globalProps });
  const displayType = getValueFromKey('displayType');

  let inlineSelf = _inlineMode || upperCtx?.displayType === 'inline';
  // inexistence containers
  if (!upperCtx.exist) {
    inlineSelf = _inlineMode || formCtx?.displayType === 'inline';
  }
  const inlineChild = displayType === 'inline';

  // Render Container Components
  if (children) {
    let childElement = (
      <div className='fr-inline-container'>
        {children}
      </div>
    );

    if (!inlineChild) {
      const gutter = { row: 16, column: 24 }[displayType];
      childElement = (
        <Row gutter={gutter}>
          {children}
        </Row>
      );
    }

    widgetProps.children = childElement;
    const Widget = widget;
    const content = <Widget {...widgetProps} {...otherSchema} displayType={schema.displayType} />;

    return (
      <UpperContext.Provider
        value={{
          column: schema.column,
          labelCol: schema.labelCol,
          fieldCol: schema.fieldCol,
          displayType: schema.displayType,
          labelWidth: schema.labelWidth,
          noStyle: schema.noStyle,
          exist: true,
        }}
      > 
       {inlineSelf ? content : <Col span={24}>{content}</Col>}
      </UpperContext.Provider>
    );
  }

  // Render field components
  let label = getLabel(schema, displayType, widgets);
  let noStyle = getValueFromKey('noStyle');

  const span = getColSpan(formCtx, upperCtx, schema);
  const tooltip = getTooltip(schema, displayType);
  const ruleList = getRuleList(schema, form);
  const readOnly = getValueFromKey('readOnly');

  const _labelCol = getValueFromKey('labelCol');
  const _fieldCol = getValueFromKey('fieldCol');
  const labelWidth = getValueFromKey('labelWidth');
  const { labelCol, fieldCol } = getFormItemLayout(Math.floor(24/span*1), schema, { displayType, labelWidth, _labelCol, _fieldCol });

  const valuePropName = schema.valuePropName || valuePropNameMap[widgetName] || undefined;


  if (!label) {
    noStyle = true;
  }

  if (readOnly) {
    widget = widgets['html'];
  }

  // checkbox 布局有点特殊
  if (isCheckBoxType(schema, readOnly)) {
    widgetProps.title = label;

    label = 'fr-hide-label';
    if (displayType === 'inline') {
      label = null;
    }
  }
 
  const formItem = (
    <Form.Item
      className={classnames('fr-field', { 'fr-hide-label': label === 'fr-hide-label', 'fr-inline-field': inlineSelf })}
      label={label}
      name={path}
      valuePropName={valuePropName}
      rules={readOnly ? [] : ruleList}
      hidden={hidden}
      tooltip={tooltip}
      initialValue={schema.default}
      labelCol={labelCol}
      wrapperCol={fieldCol}
      noStyle={noStyle}
      dependencies={dependencies}
    >
      {widgetProps.onStatusChange ? createWidgetStatus(widget, widgetProps, { form, path, rootPath, maxWidth }) : createWidget(widget, widgetProps, maxWidth)}
    </Form.Item>
  );

  if (inlineSelf) {
    return formItem
  }

  return <Col span={span}>{formItem}</Col>;
}