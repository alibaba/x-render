import React, { createContext, useContext } from 'react';
import { Form, Col } from 'antd';

import { useStore as useFormStore } from '../form-core/models/createFormStore';
import { getParamValue } from './methods';

const FieldContext = createContext(() => {});

const FieldList = (props: any) => {
  const formCtx: any = useFormStore(state => state.context);
  const parentCtx: any = useContext(FieldContext);

  const widgets = formCtx.widgets;

  // const widgets = formCtx.widgets;

  const { schema, path, parentLitPath, renderCore, max, rootPath } = props;
  const { display } = schema;
  // console.log(props, 'fieldProps');
  const { title: label, widget } = schema;
  let widgetName = widget || 'list1';
  const Widget = widgets[widgetName];

  let span = 24;
  if (formCtx.column) {
    span = 24 / formCtx.column;
  }

  if (schema.width === '100%') {
    span = 24;
  }


  const form = Form.useFormInstance();
  const value = Form.useWatch(path, form);

  const handleOnAdd = () => { };

  const handleOnRemove = () => { };

  const handleOnMove = () => { };

  const getValueFromKey = getParamValue(formCtx, parentCtx, schema);

  const labelCol = getValueFromKey('labelCol');
  const readyOnly = getValueFromKey('readyOnly');
  const preRootPath = (rootPath || []).splice(0, rootPath.length - 1);
  let isInline = display === 'inline';
  if (!value) {
    isInline = true;
  }
 
  return (
    <Col span={24}>
      {!isInline && (
        <Form.Item 
          label={label}
          labelAlign={'left'}
          colon={false}
          style={{ marginBottom: 0 }}
        >
        </Form.Item>
      )}
      <Form.Item label={label} wrapperCol={{ flex: 1 }} labelCol={labelCol} noStyle={!isInline}>
        <Widget
          name={path}
          schema={schema}
          parentLitPath={parentLitPath}
          rootPath={preRootPath}
          readyOnly={readyOnly}
        />
      </Form.Item>
    </Col>
  );
};

export default FieldList;
