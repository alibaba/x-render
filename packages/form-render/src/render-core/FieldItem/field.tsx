import React, { createContext, useContext, useEffect } from 'react';
import { Form, Col, Row } from 'antd';
import { useStore } from 'zustand';
import classnames from 'classnames';

import { isCheckBoxType, _get, isObject, getArray } from '../../utils';
import { FRContext, ConfigContext } from '../../models/context';
import { getWidgetName } from '../../models/mapping';
import { getFormItemLayout } from '../../models/layout';
import getRuleList from '../../models/validates';

const UpperContext: any = createContext(() => {})
const valuePropNameMap = {
  checkbox: 'checked',
  switch: 'checked'
}

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
}

const getTooltip = (schema: any, displayType: string) => {
  const { descType, description, tooltip } = schema;

  if (tooltip) {
    return tooltip;
  }

  if (descType === 'widget' || !description) {
    return null;
  }

  // if (displayType === 'row') {
  //   return {
  //     title: description
  //   }
  // }

  if (displayType === 'column' && descType === 'icon') {
    return {
      title: description
    }
  }
  return null;
}

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
  
  return span;
}

const getParamValue = (formCtx: any, upperCtx: any, schema: any) => (valueKey: string) => {
  return schema[valueKey] ?? upperCtx[valueKey] ?? formCtx[valueKey];
}

const getWidgetProps = (widgetName: string, schema: any, { widgets, methods, form, dependValues }) => {
  const widgetProps = {
    ...schema.props,
    addons: {
      ...form,
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
}

const createWidget = (Component: any, props: any, form: any, path: any, rootPath: any) => {
  const { onStatusChange, ...otherProps } = props;
  const { status } = Form.Item.useStatus();

  useEffect(() => {
    const errors = form.getFieldError([...(rootPath || []), ...path]);
    onStatusChange && onStatusChange(status, errors);
  }, [status]);

  return <Component { ...otherProps} />
};

export default (props: any) => {
  const { store, schema, path, children, dependValues, rootPath } = props;

  if (schema.hidden) {
    return null;
  }

  const form = Form.useFormInstance();
  const configContext = useContext(ConfigContext);
  const formCtx: any = useStore(store, (state: any) => state.context);
  const upperCtx: any = useContext(UpperContext);

  const { widgets, methods } = configContext;
  
  const { labelWidth } = formCtx;
  const { hidden, properties, dependencies, ...otherSchema } = schema;

  let widgetName = getWidgetName(schema);
  // Component not found
  if (!widgetName) {
    const ErrorSchema = widgets['errorSchemaWidget'];
    return <ErrorSchema schema={schema} />;
  }

  const getValueFromKey = getParamValue(formCtx, upperCtx, schema);
  let widget = widgets[widgetName] || widgets['html'];
 
  const widgetProps = getWidgetProps(widgetName, schema, { widgets, methods, form, dependValues });
  const displayType = getValueFromKey('displayType');
  const inlineMode = displayType === 'inline';

  // Render Container Components
  if (children) {
    let childElement = (
      <div style={{ display: 'flex'}}>
        {children}
      </div>
    );

    if (!inlineMode) {
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
          wrapperCol: schema.wrapperCol,
          displayType: schema.displayType
        }}
      > 
       {inlineMode ? content : (
          <Col span={24}>
            {content}
          </Col>
       )}
      </UpperContext.Provider>
    );
  }

  // Render field components
  let label = getLabel(schema, displayType, widgets);
  const span = getColSpan(formCtx, upperCtx, schema);
  const tooltip = getTooltip(schema, displayType);
  const ruleList = getRuleList(schema, form);
  const readOnly = getValueFromKey('readOnly');
 
  let noStyle = getValueFromKey('noStyle');
  const valuePropName = schema.valuePropName || valuePropNameMap[widgetName] || undefined;

  const _labelCol = getValueFromKey('labelCol');
  const _wrapperCol = getValueFromKey('wrapperCol');

  const { labelCol, wrapperCol } = getFormItemLayout(Math.floor(24/span*1), schema, { displayType, labelWidth, _labelCol, _wrapperCol });

  

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
 
  const content = (
    <Form.Item
      className={classnames('fr-field', { 'fr-hide-label': label === 'fr-hide-label'})}
      label={label}
      name={path}
      style={inlineMode ? { marginRight: '16px' } : null}
      valuePropName={valuePropName}
      rules={readOnly ? [] : ruleList}
      hidden={hidden}
      tooltip={tooltip}
      initialValue={schema.default}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      noStyle={noStyle}
      dependencies={dependencies}
    >
      {createWidget(widget, widgetProps, form, path, rootPath)}
    </Form.Item>
  );

  if (inlineMode) {
    return content;
  }

  return (
    <Col span={span}>
      {content}
    </Col>
  );
}