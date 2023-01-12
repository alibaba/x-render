import React, { createContext, useContext, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Form, Col, Row } from 'antd';
import { useStore } from 'zustand'


import { getWidgetName } from './mapping';
import { FRContext } from '../models/context'

import { isHasExpression, parseAllExpression } from '../models/expression';
import { isCheckBoxType, _get } from '../utils/index';
import { getFormItemLayout } from '../models/layout';
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

const FieldContext: any = createContext(() => {});

const FieldItem = (props: any) => {
  const { schema, children, path, dependValues } = props;

  const form = Form.useFormInstance();

  const store = useContext(FRContext);

  const formCtx: any = useStore(store, (state: any) => state.context);
  
  
  const parentCtx: any = useContext(FieldContext);
  const fieldRef = useRef();
  const { widgets, labelWidth } = formCtx;
  const { hidden, properties, dependencies, ...otherSchema } = schema;

  let widgetName = getWidgetName(schema);
  
  // Component not found
  if (!widgetName) {
    return <ErrorSchema schema={schema} />;
  }

  let Widget = widgets[widgetName] || widgets['html'];
  const widgetProps = getWidgetProps({ schema, children, widgets });
  const getValueFromKey = getParamValue(formCtx, parentCtx, schema);
  const displayType = getValueFromKey('displayType');
  const isInline = displayType === 'inline';

  
  widgetProps.addons = {
    ...form,
    dependValues
  };

  if (dependValues?.length > 0) {
    widgetProps.dependValues = dependValues;
  }
  
  // Render Container Components
  if (children) {
    // const { labelCol, wrapperCol } = getFormItemLayout(schema.column, schema, { layout, labelWidth });

    let childJsx = (
      <div style={{ display: 'flex'}}>
        {children}
      </div>
    );

    if (!isInline) {
      const gutter = { row: 16, column: 24 }[displayType];
      childJsx = (
        <Row gutter={gutter}>
          {children}
        </Row>
      );
    }
    widgetProps.children = childJsx;
   
    return (
      <FieldContext.Provider
        value={{
          column: schema.column,
          labelCol: schema.labelCol,
          wrapperCol: schema.wrapperCol,
          displayType: schema.displayType
        }}
      > 
       {isInline ? (
         <Widget {...widgetProps} {...otherSchema} displayType={schema.displayType} />

       ) : (

          <Col span={24}>
          <Widget {...widgetProps} {...otherSchema} displayType={schema.displayType} />
          </Col>
       )}
       
      </FieldContext.Provider>
    );
  }

  // Render formItem components
  const span = getColSpan(formCtx, parentCtx, schema);
  // const labelCol = getValueFromKey('labelCol');
  // const wrapperCol = getValueFromKey('wrapperCol');
  const readOnly = getValueFromKey('readOnly');
  const noStyle = getValueFromKey('noStyle');
  const { labelCol, wrapperCol } = getFormItemLayout(Math.floor(24/span*1), schema, { displayType, labelWidth });


  let label = getLabel(schema);
  const tooltip = getTooltip(schema, displayType);
  const valuePropName = getValuePropName(widgetName);
  const ruleList = getRuleList(schema, form);

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

  const formItem = (
    <Form.Item
      label={label}
      name={path}
      style={isInline ? { marginRight: '16px' } : null}
      valuePropName={valuePropName}
      rules={readOnly ? [] : ruleList}
      hidden={hidden}
      tooltip={tooltip}
      initialValue={schema.default}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      noStyle={noStyle}
      className={path}
      dependencies={dependencies}
    >
      <Widget {...widgetProps} />
    </Form.Item>
  );

  if (isInline) {
    return formItem;
  }
 
  return (
    <Col span={span}>
      {formItem}
    </Col>
  );
};

export default (props: any) => {
  const { schema, rootPath, ...otherProps } = props;
  const store = useContext(FRContext);
  const { schema: formSchema } = store.getState();

  

  // No function expressions exist
  if (!isHasExpression(schema) && !schema.dependencies) {
    return <FieldItem {...props} />;
  }

  // Need to listen to form values for dynamic rendering
  return (
    <Form.Item
      noStyle
      //dependencies={schema.dependencies}
      shouldUpdate={(prevValues, curValues) => {
        // Observe whether the value of a function expression dependency has changed
        // TODO 进行优化
        return true;
      }}
    >
      {(form: any) => {
        const formData = form.getFieldsValue(true);
        const dependValues = (schema.dependencies || []).map((item: any) => _get(formData, item))
        const newSchema = parseAllExpression(schema, formData, rootPath, formSchema);
      
        return <FieldItem schema={newSchema} {...otherProps} dependValues={dependValues} />;
      }}
    </Form.Item>
  );
};
