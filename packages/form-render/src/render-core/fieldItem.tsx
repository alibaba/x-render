import React, { useContext } from 'react';
import { Form, Col } from 'antd';

import { widgets } from '../widgets';
import { getWidgetName } from './mapping';
import { FormContext, ParentContext } from '../utils/context';
import { isHasExpression, parseAllExpression } from '../utils/expression';
import { getParamValue, getColSpan, getLabel, getRuleList, getTooltip, getValuePropName, getWidgetProps, ErrorSchema } from './common';

const FieldItem = (props: any) => {
  const { schema, children, path } = props;

  const formCtx: any = useContext(FormContext);
  const parentCtx: any = useContext(ParentContext);

  const { hidden } = schema;
  console.log(props, 'fieldProps');

  let widgetName = getWidgetName(schema);

  // 未匹配到协议组件
  if (!widgetName) {
    return <ErrorSchema schema={schema} />;
  }

  let Widget =  widgets[widgetName] || widgets['html'];
 
  const widgetProps = getWidgetProps({ schema, children, widgets });

  // 容器组件
  if (children) {
    return (
      // <Col span={24} style={{ margin: '8px 0 12px 0' }}>
      <Col span={24}>
        <ParentContext.Provider value={{ column: schema.column, labelCol: schema.labelCol, wrapperCol: schema.wrapperCol }}>
          <Widget {...widgetProps} />
        </ParentContext.Provider>
      </Col>
    );
  }


  const getValueFromKey = getParamValue(formCtx, parentCtx, schema);

  const span = getColSpan(formCtx, parentCtx, schema);
  const labelCol = getValueFromKey('labelCol');
  const wrapperCol = getValueFromKey('wrapperCol');
  const readyOnly = getValueFromKey('readyOnly');

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
        rules={ruleList}
        hidden={hidden}
        tooltip={tooltip}
        initialValue={schema.default}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
      >
        <Widget {...widgetProps} />
      </Form.Item>
    </Col>
  );
}

export default (props: any) => {
  const { schema, rootPath, ...otherProps } = props;
  
  // 不存在函数表达式
  if (!isHasExpression(schema)) {
    return <FieldItem {...props} />
  }

  // 需要监听表单值，进行动态渲染
  return (
    <Form.Item noStyle shouldUpdate={(prevValues, curValues) => {
      // 观察函数表达式依赖的值是否发生变更
      // TODO 进行优化
      return true;
    }}>
      {(form: any) => {
        const formData = form.getFieldsValue(true);
       
        const newSchema = parseAllExpression(schema, formData, rootPath);
        return <FieldItem schema={newSchema} {...otherProps} />
      }}
    </Form.Item>
  );
}
