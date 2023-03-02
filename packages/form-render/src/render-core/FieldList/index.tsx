import React, { createContext, useContext } from 'react';
import { Form, Col } from 'antd';
import { useStore } from 'zustand'
import { FRContext, ConfigContext } from '../../models/context';

import Main from './main';

const UpperContext = createContext(() => {});

const getParamValue = (formCtx: any, upperCtx: any, schema: any) => (valueKey: string) => {
  return schema[valueKey] ?? upperCtx[valueKey] ?? formCtx[valueKey];
};


export default (props: any) => {
  const store = useContext(FRContext);
  const configContext = useContext(ConfigContext);

  const formCtx: any = useStore(store, (state: any) => state.context);
  const upperCtx: any = useContext(UpperContext);
  const { form, widgets, methods } = configContext;

  const { displayType } = formCtx;
  const isDisplayColumn = displayType === 'column';
  const { schema, path } = props;
  
  const { title: label, widget } = schema;
  let widgetName = widget || 'list1';

  let span = 24;
  if (formCtx.column) {
    span = 24 / formCtx.column;
  }

  if (schema.width === '100%') {
    span = 24;
  }

 
  const value = Form.useWatch(path, form);

  const getValueFromKey = getParamValue(formCtx, upperCtx, schema);

  const labelCol = getValueFromKey('labelCol');

  let isInline = schema.display === 'inline';
  if (!value && widgetName !== 'drawerList') {
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
      <Form.Item 
        label={label} 
        labelCol={labelCol} 
        noStyle={!isInline && !isDisplayColumn}
      >
        <Main
          {...props}
          form={form}
          methods={methods}
          formCtx={formCtx}
          upperCtx={upperCtx}
          widgets={widgets}
          configContext={configContext}
        />
      </Form.Item>
    </Col>
  );
}