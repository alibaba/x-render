import React, { useContext } from 'react';
import { Form, Col } from 'antd';
import { widgets } from '../widgets';

import { getWidgetName } from './mapping';
import { isObject } from '../utils/common';
import { FormContext } from '../utils/context';
import { isHasExpression, parseAllExpression } from '../utils/expression';

const valuePropNameMap = {
  checkbox: 'checked',
  switch: 'checked'
};

const ErrorSchema = (schema: any) => {
  return (
    <div>
      <div style={{ color: 'red' }}>schema未匹配到展示组件：</div>
      <div>{JSON.stringify(schema)}</div>
    </div>
  );
};

const getRuleList = (schema: any) => {
  const rules: any = [];
  if (schema.type === 'string' && typeof schema.max === 'number') {
    rules.push({ type: schema.type, max: schema.max });
  }
  return rules;
}

const getColSpan = (formCtx: any, schema: any) => {
  let span = 24;
  if (formCtx.column) {
    span = 24 / formCtx.column;
  }

  if (schema.width === '100%') {
    span = 24;
  }
  return span;
}



const FieldView = (props: any) => {
  const { schema, children, path, parentLitPath, renderCore } = props;
  const formCtx: any = useContext(FormContext);

  console.log(props, 'fieldProps');
 
  const { title, hidden } = schema;
  const widgetName = getWidgetName(schema);

  // 未匹配到协议组件
  if (!widgetName) {
    return <ErrorSchema schema={schema} />;
  }

  const Widget = widgets[widgetName] || widgets['html'];

  const widgetProps = {
    children,
    ...schema.props,
  };

  ['placeholder', 'disabled', 'format'].forEach(key => {
    if (schema[key]) {
      widgetProps[key] = schema[key];
    }
  });

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

  // 容器组件
  if (children) {
    return (
      <Col span={24} style={{ marginBottom: '20px' }}>
        <Widget {...widgetProps} />
      </Col>
    );
  }
  
  const valuePropName = valuePropNameMap[widgetName] || undefined;
  const span = getColSpan(formCtx, schema);
  const ruleList = getRuleList(schema);


  return (
    <Col span={span}>
      <Form.Item 
        label={title} 
        name={path} 
        valuePropName={valuePropName}
        rules={ruleList}
        hidden={hidden}
      >
        <Widget {...widgetProps} />
      </Form.Item>
    </Col>
  );
}

export default (props: any) => {
  const { schema, ...otherProps } = props;

  // 不存在函数表达式
  if (!isHasExpression(schema)) {
    return <FieldView {...props} />
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
        const newSchema = parseAllExpression(schema, formData, parentLitPath);
        return <FieldView schema={newSchema} {...otherProps} />
      }}
    </Form.Item>
  )
};
