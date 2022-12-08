import React from 'react';
import { Form, Col } from 'antd';
import { widgets } from '../widgets';

import { extraSchemaList, getWidgetName } from '../form-render-core/src/mapping';
import { isListType, isObject, isObjType } from '../form-render-core/src/utils';

const ErrorSchema = schema => {
  return (
    <div>
      <div style={{ color: 'red' }}>schema未匹配到展示组件：</div>
      <div>{JSON.stringify(schema)}</div>
    </div>
  );
};

const transformProps = props => {
  const {
    onChange,
    value,
    defaultValue,
    schema: ownSchema,
    readOnly,
    ...rest
  } = props;

  const schema = { ...ownSchema };
  const { trigger, valuePropName } = schema || {};
  const controlProps = {};
  let _valuePropName = 'value';

  const _value = value === undefined ? defaultValue : value;
  if (valuePropName && typeof valuePropName === 'string') {
    _valuePropName = valuePropName;
    controlProps[valuePropName] = _value;
  } else {
    controlProps.value = _value;
  }

  // const _onChange = (...args) => {
  //   const newValue = defaultGetValueFromEvent(_valuePropName, ...args);
  //   onChange(newValue);
  // };

  // if (trigger && typeof trigger === 'string') {
  //   controlProps.onChange = _onChange;
  //   controlProps[trigger] = _onChange;
  // } else {
  //   controlProps.onChange = _onChange;
  // }

  const usefulPropsFromSchema = {
    disabled: schema.disabled || schema['ui:disabled'],
    readOnly: schema.readOnly || schema['ui:readonly'] || readOnly,
    hidden: schema.hidden || schema['ui:hidden'],
  };

  const _props = {
    ...controlProps,
    schema,
    ...usefulPropsFromSchema,
    ...rest,
  };

  return _props;
};

const FiledItem = (props: any) => {
  const {
    schema,
    onChange,
    children,
    readOnly,
    disabled,
    name,
  } = props;
  
  let widgetName = getWidgetName(schema);
  const customName = schema.widget || schema['ui:widget'];
  if (customName && widgets[customName]) {
    widgetName = customName;
  }
  const readOnlyName = schema.readOnlyWidget || 'html';
  if (readOnly && !isObjType(schema) && !isListType(schema)) {
    widgetName = readOnlyName;
  }
  if (!widgetName) {
    widgetName = 'input';
    return <ErrorSchema schema={schema} />;
  }
  const Widget = widgets[widgetName] || widgets['html'];
 
  const extraSchema = extraSchemaList[widgetName];

  let widgetProps = {
    schema: { ...schema, ...extraSchema },
    onChange,
    children,
    disabled,
    readOnly,
    ...schema.props,
  };

  if (schema.type === 'string' && typeof schema.max === 'number') {
    widgetProps.maxLength = schema.max;
  }

  ['title', 'placeholder', 'disabled', 'format'].forEach(key => {
    if (schema[key]) {
      widgetProps[key] = schema[key];
    }
  });

  if (schema.props) {
    widgetProps = { ...widgetProps, ...schema.props };
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


  const finalProps = transformProps(widgetProps);

  console.log(finalProps, '------------finalProps', name)



  const { title: label } = finalProps;



  if (widgetName === 'list') {

  }



  



  if (!name) {
    return (
      <Col span={24}>
        <Widget {...finalProps} />
      </Col>
    )
  }

  return (
    <Col span={24}>
      <Form.Item
        label={label}
        name={name}
        className={name}
      >
        <Widget {...finalProps} />
      </Form.Item>
    </Col>
  )
};

export default FiledItem;
