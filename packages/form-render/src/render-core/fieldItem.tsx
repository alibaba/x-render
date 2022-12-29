import React, { useContext } from 'react';
import { Form, Col } from 'antd';
import { widgets } from '../widgets';

import { getWidgetName } from './mapping';
import { isObject, getArray } from '../utils/common';
import { FormContext, BoxContext } from '../utils/context';

import { isHasExpression, parseAllExpression } from '../utils/expression';

const valuePropNameMap = {
  checkbox: 'checked',
  switch: 'checked'
};

const fieldPropsList = ['placeholder', 'disabled', 'format'];

const ErrorSchema = (schema: any) => {
  return (
    <div>
      <div style={{ color: 'red' }}>schema未匹配到展示组件：</div>
      <div>{JSON.stringify(schema)}</div>
    </div>
  );
};

const getRuleList = (schema: any) => {
  let { type, required, max, min, maxLength, minLength, rules: ruleList = [], title } = schema;
  let rules: any = [...ruleList];

  max = max ?? maxLength;
  min = min ?? minLength;

  if (max) {
    let message = `字符最大长度${min}`;
    if (type === 'number') {
      message = `数值最大值${min}`;
    }
    if (type === 'array') {
      message = `数组最大长度${min}`;
    }
    rules.push({ type, max: max * 1, message });
  }

  if (min) {
    let message = `字符最小长度${min}`;
    if (type === 'number') {
      message = `数值最小值${min}`;
    }
    if (type === 'array') {
      message = `数组最小长度${min}`;
    }
    rules.push({ type, min: min * 1, message });
  }
  
  if (required) {
    rules.push({ required: true, message: `${title}不能为空` });
  }

  rules = rules.map(((item: any) => {
    if (item.validator && !item.transformed) {
      const validator = item.validator;
      item.validator = async (_: any, value: any) => {
        const result = await validator(_, value);
        return result ? Promise.resolve() : Promise.reject(new Error(item.message));
      };;
      item.transformed = true;
    }
    return item;
  }));

  return rules;
}

const getColSpan = (formCtx: any, schema: any, boxCtx: any) => {
  let span = 24;
  if (boxCtx.column) {
    span = 24 / boxCtx.column;
  }else if (formCtx.column) {
    span = 24 / formCtx.column;
  }

  if (schema.width === '100%') {
    span = 24;
  }
  return span;
};

const getLabel = (schema: any) => {
  const { title, description, descType } = schema;
  if (descType === 'icon') {
    return title;
  }
  return (
    <>
      {title}
      {description && (
        <span className='fr-desc ml2'>
          ({description})
        </span>
      )}
    </>
  )
};

const getTooltip = (schema: any) => {
  const { descType, description } = schema;
  if (descType === 'icon' && description) {
    return {
      title: description
    }
  }

  return null;
};

const FieldView = (props: any) => {
  const { schema, children, path, renderCore } = props;
  const formCtx: any = useContext(FormContext);
  const boxCtx: any = useContext(BoxContext);

  const labelCol = boxCtx.labelCol || formCtx.labelCol;
  const wrapperCol = boxCtx.wrapperCol || formCtx.wrapperCol;

  console.log(props, 'fieldProps');
 
  const { hidden } = schema;
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

  fieldPropsList.forEach(key => {
    if (schema[key]) {
      widgetProps[key] = schema[key];
    }
  });

  if (schema.enum && !schema.props?.options) {
    const { enumNames, enum: enums } = schema;
    widgetProps.options = getArray(enums).map((item: any, idx: number) => {
      let label = enumNames && Array.isArray(enumNames) ? enumNames[idx] : item;
      const isHtml = typeof label === 'string' && label[0] === '<';
      if (isHtml) {
        label = <span dangerouslySetInnerHTML={{ __html: label }} />;
      }
      return { label, value: item };
    });
  }

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
      // <Col span={24} style={{ margin: '8px 0 12px 0' }}>
      <Col span={24}>
        <BoxContext.Provider value={{ column: widgetProps.column, labelCol: widgetProps.labelCol, wrapperCol: widgetProps.wrapperCol }}>
          <Widget {...widgetProps} />
        </BoxContext.Provider>
      </Col>
    );
  }
  
  const valuePropName = valuePropNameMap[widgetName] || undefined;
  const span = getColSpan(formCtx, schema, boxCtx);
  const ruleList = getRuleList(schema);
  const label = getLabel(schema);
  const tooltip = getTooltip(schema);
  
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
        console.log(formData, rootPath, '-----')
        const newSchema = parseAllExpression(schema, formData, rootPath);
        return <FieldView schema={newSchema} {...otherProps} />
      }}
    </Form.Item>
  );
}
