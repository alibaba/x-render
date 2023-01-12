import React, { useEffect, useContext } from 'react';
import { Form, Row, Col, Button, Space } from 'antd';
import shallow from 'zustand/shallow';
import { createStore, useStore } from 'zustand'

import { transformFieldsError, valuesWatch, transformProps } from './models/common';
import { getFormItemLayout } from '../utils/layout';
import { parseValuesWithBind } from '../utils/bindValues';
import RenderCore from '../render-core';
import './index.less';

import { FormRenderContext } from '../utils/context'

export { default as connectForm } from './models/connectForm';
export { default as useForm } from './models/useForm';

const FormCore = (props: any) => {
  const store = useContext(FormRenderContext);

 
  const schema = useStore(store, (state: any) => state.schema );
  const isInit = useStore(store, (state: any) => state.isInit, shallow);
  const flattenSchema = useStore(store, (state: any) => state.flattenSchema, shallow);
  const setContext = useStore(store, (state: any) => state.setContext, shallow);

  const { type, properties, ...schemProps } = schema;
  const { formProps, displayType, beforeFinish, watch, onMount, column, labelWidth, form, widgets, onFinish, readOnly, builtOperation } = transformProps({ ...props, ...schemProps });
  const _column = column || schema?.column || 1;

  const { labelCol, wrapperCol } = getFormItemLayout(_column, formProps, { labelWidth, displayType });
  
  
  useEffect(() => {
    form.init(props.schema, store);
    setTimeout(() => {
      onMount && onMount();
    }, 0);
  }, []);

  useEffect(() => {
    if (!isInit) {
      return;
    }
    form.resetSchema(props.schema);
  }, [props.schema]);

  useEffect(() => {
    const context = {
      column: _column,
      labelCol,
      wrapperCol,
      readOnly,
      widgets,
      labelWidth,
      displayType,
    };
    setContext(context);
  }, [_column, labelCol, wrapperCol, displayType, labelWidth]);

  const handleValuesChange = (changedValues: any, allValues: any) => {
    valuesWatch(changedValues, allValues, watch);
  };

  const handleFinish = async (_values: any) => {
    const values = parseValuesWithBind(_values, flattenSchema)
    let fieldsError = beforeFinish ? await beforeFinish({ data: values, schema, errors: [] }) : null;
    fieldsError = transformFieldsError(fieldsError);

    console.log(values);
    // Stop submit
    if (fieldsError) {
      form.setFields(fieldsError);
    }
    onFinish && onFinish(values);
  };

  return (
    <Form
      form={form}
      labelWrap={true}
      onFinish={handleFinish}
      {...formProps}
      onValuesChange={handleValuesChange}
    >
      <Row gutter={displayType === 'row' ? 16 : 24}>
        <RenderCore schema={schema} />
      </Row>
      {builtOperation && (
        <Row gutter={displayType === 'row' ? 16 : 24}>
          <Col span={24/_column}>
            <Form.Item label='xxx' labelCol={labelCol} className='xxxx'>
              <Space>
                <Button type='primary' htmlType='submit'>
                  提交
                </Button>
                <Button onClick={() => form.resetFields()}>重置</Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      )}
    </Form>
  );
}

export default FormCore;
