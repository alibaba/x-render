import React, { createContext, useContext } from 'react';
import { Form, Col, Row } from 'antd';
import { useStore } from 'zustand';
import classnames from 'classnames';

import { isCheckBoxType, _get } from '../../utils';
import { ConfigContext } from '../../models/context';
import { getWidgetName } from '../../models/mapping';
import { getFormItemLayout } from '../../models/layout';
import getRuleList from '../../models/validates';

const UpperContext: any = createContext(() => {});
const valuePropNameMap = {
  checkbox: 'checked',
  switch: 'checked'
};

import {
  FieldWrapper,
  FieldWrapperStatus
} from './field';

import { 
  getParamValue, 
  getFieldProps,
  getPath,
  getLabel,
  getColSpan,
  getExtraView,
  getTooltip
} from './module';

export default (props: any) => {
  const { store, schema, path, children, dependValues, rootPath } = props;

  if (schema?.hidden) {
    return null;
  }

  const formCtx: any = useStore(store, (state: any) => state.context);
  const upperCtx: any = useContext(UpperContext);
  const configCtx = useContext(ConfigContext);
  const { form, widgets, methods, globalProps } = configCtx;

  const { hidden, properties, dependencies, inlineMode: _inlineMode, remove, removeText, visible = true, ...otherSchema } = schema;

  let widgetName = getWidgetName(schema);
  // Component not found
  if (!widgetName) {
    const ErrorSchema = widgets['errorSchemaWidget'];
    return <ErrorSchema schema={schema} />;
  }

  const getValueFromKey = getParamValue(formCtx, upperCtx, schema);
  let Widget = widgets[widgetName] || widgets['html'];

  const fieldProps = getFieldProps(widgetName, schema, {
    widgets,
    methods,
    form,
    dependValues,
    globalProps,
    path: getPath(path),
    rootPath
  });

  if (schema.type === 'void') {
    return ( 
      <Col span={24}>
        <Widget {...fieldProps } />
      </Col>
    );
  }

  const displayType = getValueFromKey('displayType');

  let inlineSelf = _inlineMode || upperCtx?.displayType === 'inline';
  // inexistence containers
  if (!upperCtx.exist) {
    inlineSelf = _inlineMode || formCtx?.displayType === 'inline';
  }
  const inlineChild = displayType === 'inline';
  const labelWidth = getValueFromKey('labelWidth');

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

    fieldProps.children = childElement;
    const content = <Widget labelWidth={labelWidth} displayType={schema.displayType} {...fieldProps} {...otherSchema} />;

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
  const extra = getExtraView('extra', schema, widgets);
  const help = getExtraView('help', schema, widgets);

  const tooltip = getTooltip(schema, displayType);
  const ruleList = getRuleList(schema, form, methods);
  const readOnly = getValueFromKey('readOnly');

  const _labelCol = getValueFromKey('labelCol');
  const _fieldCol = getValueFromKey('fieldCol');
  const maxWidth = getValueFromKey('maxWidth');
  const { labelCol, fieldCol } = getFormItemLayout(Math.floor(24 / span * 1), schema, { displayType, labelWidth, _labelCol, _fieldCol });
  const valuePropName = schema.valuePropName || valuePropNameMap[widgetName] || undefined;


  if (readOnly) {
    fieldProps.readOnly = readOnly;
  }

  if (!label) {
    noStyle = true;
  }

  if (readOnly) {
    Widget = widgets[schema.readOnlyWidget] || widgets['html'];
  }

  // checkbox 布局有点特殊
  if (isCheckBoxType(schema, readOnly)) {
    fieldProps.title = label;

    label = 'fr-hide-label';
    if (displayType === 'inline') {
      label = null;
    }
  }

  const defaultValue = schema.default ?? schema.defaultValue;

  const formItem = (
    <Form.Item
      className={classnames('fr-field', { 'fr-hide-label': label === 'fr-hide-label', 'fr-inline-field': inlineSelf, 'fr-field-visibility': !visible })}
      label={label}
      name={path}
      valuePropName={valuePropName}
      rules={readOnly ? [] : ruleList}
      hidden={hidden}
      tooltip={tooltip}
      extra={extra}
      help={help}
      initialValue={defaultValue}
      labelCol={labelCol}
      wrapperCol={fieldCol}
      noStyle={noStyle}
      dependencies={dependencies}
    >
      {fieldProps.onStatusChange ? (
        <FieldWrapperStatus 
          Field={Widget}
          fieldProps={fieldProps}
          maxWidth={maxWidth}
          defaultValue={defaultValue}
        />
      ) : (
        <FieldWrapper
          Field={Widget}
          fieldProps={fieldProps}
          maxWidth={maxWidth}
          defaultValue={defaultValue}
        />
      )}
    </Form.Item>
  );

  if (inlineSelf) {
    if (noStyle) {
      return (
        <div className={classnames('fr-inline-field', { 'fr-field-visibility': !visible })}>
          {formItem}
        </div>
      );
    }

    return formItem;
  }

  return <Col span={span} className={classnames(null, { 'fr-field-visibility': !visible })}>{formItem}</Col>;
}