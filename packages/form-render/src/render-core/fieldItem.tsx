import React, { createContext, useContext } from 'react';
import { Form, Col } from 'antd';

import { getWidgetName } from './mapping';
import { useStore as useFormStore } from '../form-core/models/createFormStore';

import { isHasExpression, parseAllExpression } from '../utils/expression';
import {
  getParamValue,
  getColSpan,
  getLabel,
  getRuleList,
  getTooltip,
  getValuePropName,
  getWidgetProps,
  ErrorSchema,
} from './methods';

const FieldContext = createContext(() => {});

const FieldItem = (props: any) => {
  const { schema, children, path } = props;

  const formCtx: any = useFormStore(state => state.context);
  const parentCtx: any = useContext(FieldContext);
  const widgets = formCtx.widgets;
  const { hidden } = schema;
 
  let widgetName = getWidgetName(schema);

  // Component not found
  if (!widgetName) {
    return <ErrorSchema schema={schema} />;
  }

  let Widget = widgets[widgetName] || widgets['html'];
  const widgetProps = getWidgetProps({ schema, children, widgets });
  
  // Render Container Components
  if (children) {
    return (
      // <Col span={24} style={{ margin: '8px 0 12px 0' }}>
      <FieldContext.Provider
        value={{
          column: schema.column,
          labelCol: schema.labelCol,
          wrapperCol: schema.wrapperCol,
        }}
      > 
        <Col span={24}>
          <Widget {...widgetProps} />
        </Col>
      </FieldContext.Provider>
    );
  }

  // Render formItem components
  const getValueFromKey = getParamValue(formCtx, parentCtx, schema);

  const span = getColSpan(formCtx, parentCtx, schema);
  const labelCol = getValueFromKey('labelCol');
  const wrapperCol = getValueFromKey('wrapperCol');
  const readyOnly = getValueFromKey('readyOnly');
  const noStyle = getValueFromKey('noStyle');

  const label = getLabel(schema);
  const tooltip = getTooltip(schema);
  const valuePropName = getValuePropName(widgetName);
  const ruleList = getRuleList(schema);

  if (readyOnly) {
    Widget = widgets['html'];
  }

  return (
    <Col span={span}>
      <Form.Item
        label={label}
        name={path}
        valuePropName={valuePropName}
        rules={readyOnly ? [] : ruleList}
        hidden={hidden}
        tooltip={tooltip}
        initialValue={schema.default}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        noStyle={noStyle}
      >
        <Widget {...widgetProps} />
      </Form.Item>
    </Col>
  );
};

export default (props: any) => {
  const { schema, rootPath, ...otherProps } = props;

  // No function expressions exist
  if (!isHasExpression(schema)) {
    return <FieldItem {...props} />;
  }

  // Need to listen to form values for dynamic rendering
  return (
    <Form.Item
      noStyle
      shouldUpdate={(prevValues, curValues) => {
        // Observe whether the value of a function expression dependency has changed
        // TODO 进行优化
        return true;
      }}
    >
      {(form: any) => {
        const formData = form.getFieldsValue(true);
        const newSchema = parseAllExpression(schema, formData, rootPath);
        return <FieldItem schema={newSchema} {...otherProps} />;
      }}
    </Form.Item>
  );
};
