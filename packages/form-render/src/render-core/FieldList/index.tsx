import React, { createContext, useContext } from 'react';
import { Form, Col } from 'antd';
import { useStore } from 'zustand'
import { FRContext } from '../../models/context';

const UpperContext = createContext(() => {});

const getParamValue = (formCtx: any, upperCtx: any, schema: any) => (valueKey: string) => {
  return schema[valueKey] ?? upperCtx[valueKey] ?? formCtx[valueKey];
}

export default (props: any) => {
  const store = useContext(FRContext);

  const formCtx: any = useStore(store, (state: any) => state.context);
  const methods = useStore(store, (state: any) => state.methods);

  const upperCtx: any = useContext(UpperContext);

  const widgets = useStore(store, (state: any) => state.widgets)

  const { displayType } = formCtx;
  const isDisplayColumn = displayType === 'column';
  const { schema, path, parentLitPath, renderCore, max, rootPath } = props;
  const { display } = schema;
  
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

  const getValueFromKey = getParamValue(formCtx, upperCtx, schema);

  const labelCol = getValueFromKey('labelCol');
  const readyOnly = getValueFromKey('readyOnly');
  const preRootPath = (rootPath || []).splice(0, rootPath.length - 1);

  let isInline = display === 'inline';
  if (!value) {
    isInline = true;
  }
  
  return (
    <Col span={24}>
      {!isInline && !isDisplayColumn && (
        <Form.Item 
          label={label}
          labelAlign={'left'}
          colon={false}
          style={{ marginBottom: 0 }}
        >
        </Form.Item>
      )}
      <Form.Item label={label} wrapperCol={{ flex: 1 }} labelCol={labelCol} noStyle={!isInline} >
        <Widget
          name={path}
          schema={schema}
          parentLitPath={parentLitPath}
          rootPath={preRootPath}
          readyOnly={readyOnly}
          methods={methods}
        />
      </Form.Item>
    </Col>
  );
}