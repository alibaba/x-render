import React, { createContext, useContext, useRef, useEffect } from 'react';
import { Form, Col, Row } from 'antd';
import { useStore } from 'zustand';
import classnames from 'classnames';

import { isCheckBoxType, _get } from '../../utils';
import { getWidgetName, getWidget } from '../../models/mapping';
import { getFormItemLayout } from '../../models/layout';
import getRuleList from '../../models/validates';

const UpperContext: any = createContext(() => {});
const valuePropNameMap = {
  checkbox: 'checked',
  switch: 'checked',
  Checkbox: 'checked',
  Switch: 'checked'
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
  const { configCtx, store, schema, path, children, dependValues, rootPath } = props;

  const fieldRef: any = useRef();
  const formCtx: any = useStore(store, (state: any) => state.context);
  const upperCtx: any = useContext(UpperContext);

  const { form, widgets, methods, globalProps } = configCtx;
  const { reserveLabel, hidden, properties, dependencies, inlineMode: _inlineMode, remove, removeText, visible = true, ...otherSchema } = schema;
  const getValueFromKey = getParamValue(formCtx, upperCtx, schema);
  
  const widgetName = getWidgetName(schema);
  let Widget = getWidget(widgetName, widgets);

  const fieldProps = getFieldProps(widgetName, schema, {
    widgets,
    methods,
    form,
    dependValues,
    globalProps,
    path: getPath(path),
    rootPath,
    fieldRef
  });

  useEffect(() => {
    form.setFieldRef(fieldProps.addons.dataPath, fieldRef);
  }, []);

  if (schema?.hidden) {
    return null;
  }

  // Component not found
  if (!widgetName) {
    const ErrorSchema = widgets['errorSchema'] || widgets['ErrorSchema'];
    return <ErrorSchema schema={schema} />;
  }

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
        {inlineSelf ? content : <Col span={24} className={classnames('fr-obj-col', { [schema.className] : !!schema.className })}>{content}</Col>}
      </UpperContext.Provider>
    );
  }

  // Render field components
  let label = getLabel(schema, displayType, widgets, fieldProps.addons);
  let noStyle = getValueFromKey('noStyle');

  const span = getColSpan(formCtx, upperCtx, schema);
  const extra = getExtraView('extra', schema, widgets);
  const help = getExtraView('help', schema, widgets);

  const tooltip = getTooltip(schema, displayType);
  const ruleList = getRuleList(schema, form, methods, fieldRef);
  const readOnly = getValueFromKey('readOnly');
  const disabled = getValueFromKey('disabled');
  const validateTrigger = getValueFromKey('validateTrigger');

  const _labelCol = getValueFromKey('labelCol');
  const _fieldCol = getValueFromKey('fieldCol');
  const maxWidth = getValueFromKey('maxWidth');
  const { labelCol, fieldCol } = getFormItemLayout(Math.floor(24 / span * 1), schema, { displayType, labelWidth, _labelCol, _fieldCol });
  const valuePropName = schema.valuePropName || valuePropNameMap[widgetName] || undefined;

  if (readOnly) {
    fieldProps.readOnly = readOnly;
  }

  if (disabled) {
    fieldProps.disabled = disabled;
  }

  if (reserveLabel && !label && displayType !== 'column') {
    label = 'fr-hide-label';
  }

  if (readOnly) {
    Widget = widgets[schema.readOnlyWidget] || widgets['Html'];
  }

  // checkbox 布局有点特殊
  if (isCheckBoxType(schema, readOnly)) {
    fieldProps.title = label;

    label = null;
    if (displayType === 'row') {
      label = 'fr-hide-label';
    } 
  }

  const initialValue = schema.default ?? schema.defaultValue;
  const classRest = { 'fr-hide-label': label === 'fr-hide-label', 'fr-inline-field': inlineSelf, 'fr-field-visibility': !visible, [schema.className] : !! schema.className };

  const formItem = (
    <Form.Item
      className={classnames('fr-field', classRest)}
      label={label}
      name={path}
      valuePropName={valuePropName}
      rules={readOnly ? [] : ruleList}
      hidden={hidden}
      tooltip={tooltip}
      extra={extra}
      help={help}
      initialValue={initialValue}
      labelCol={labelCol}
      wrapperCol={fieldCol}
      noStyle={noStyle}
      dependencies={dependencies}
      validateTrigger={ validateTrigger ?? fieldRef?.current?.validator ? 'onSubmit' : 'onChange' }
    >
      {fieldProps.onStatusChange ? (
        <FieldWrapperStatus 
          Field={Widget}
          fieldProps={fieldProps}
          maxWidth={maxWidth}
          initialValue={initialValue}
        />
      ) : (
        <FieldWrapper
          Field={Widget}
          fieldProps={fieldProps}
          maxWidth={maxWidth}
          initialValue={initialValue}
        />
      )}
    </Form.Item>
  );

  if (inlineSelf) {
    if (noStyle) {
      return (
        <div 
          className={classnames('fr-inline-field', { 'fr-field-visibility': !visible, [schema.className] : !! schema.className })}
        >
          {formItem}
        </div>
      );
    }
    return formItem;
  }

  return (
    <Col 
      span={span} 
      className={classnames(null, { 'fr-field-visibility': !visible })}
    >
      {formItem}
    </Col>
  );
}