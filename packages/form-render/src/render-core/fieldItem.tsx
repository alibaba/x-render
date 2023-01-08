import React, { createContext, useContext, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Form, Col } from 'antd';

import { getWidgetName } from './mapping';
import { useStore as useFormStore } from '../form-core/models/createFormStore';

import { isHasExpression, parseAllExpression } from '../utils/expression';
import { isCheckBoxType } from '../utils/index';
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
  const fieldRef = useRef();
  const { widgets, layout } = formCtx;
  const { hidden, properties, ...otherSchema } = schema;
 
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
          <Widget {...widgetProps} {...otherSchema} layout={layout} />
        </Col>
      </FieldContext.Provider>
    );
  }

  // Render formItem components
  const getValueFromKey = getParamValue(formCtx, parentCtx, schema);

  const span = getColSpan(formCtx, parentCtx, schema);
  const labelCol = getValueFromKey('labelCol');
  const wrapperCol = getValueFromKey('wrapperCol');
  const readOnly = getValueFromKey('readOnly');
  const noStyle = getValueFromKey('noStyle');

  let label = getLabel(schema);
  const tooltip = getTooltip(schema, layout);
  const valuePropName = getValuePropName(widgetName);
  const ruleList = getRuleList(schema);

  if (readOnly) {
    Widget = widgets['html'];
  }

  // useEffect(() => {
  //   const dom = document.querySelector(`.${path}`);
  //   if (!dom ){
  //     return;
  //   }
   
  //   const conx = dom.children[0].children[0].children[0];
  //   conx.append('1111');
   

   
  // }, [schema.description]);

  // checkbox 布局有点特殊
if (isCheckBoxType(schema, readOnly)) {
  widgetProps.title = label;
  label = null;
}


  return (
    <Col span={span}>
      <Form.Item
        label={label}
        name={path}
        valuePropName={valuePropName}
        rules={readOnly ? [] : ruleList}
        hidden={hidden}
        tooltip={tooltip}
        initialValue={schema.default}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        noStyle={noStyle}
        className={path}
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
