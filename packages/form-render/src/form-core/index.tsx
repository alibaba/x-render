import React, { useEffect, useContext } from 'react';
import { Form, Row, Col, Button, Space } from 'antd';
import { useStore } from 'zustand';
import shallow from 'zustand/shallow';

import { FRContext } from '../models/context';
import transformProps from '../models/transformProps';
import { getFormItemLayout } from '../models/layout';
import { parseValuesWithBind } from '../models/bindValues';
import { transformFieldsError, valuesWatch, } from '../models/formCoreUtils';
import RenderCore from '../render-core';

import './index.less';

const FormCore = (props: any) => {
  const store = useContext(FRContext);
  const schema = useStore(store, (state: any) => state.schema);
  const isInit = useStore(store, (state: any) => state.isInit);
  const flattenSchema = useStore(store, (state: any) => state.flattenSchema);
  const setContext = useStore(store, (state: any) => state.setContext);

  const { type, properties, ...schemProps } = schema;
  const { formProps, displayType, beforeFinish, watch, onMount, column, labelWidth, form, widgets, onFinish, readOnly, builtOperation } = transformProps({ ...props, ...schemProps });
 
  // const { labelCol, wrapperCol } = getFormItemLayout(_column, formProps, { labelWidth, displayType });
  const { labelCol, wrapperCol } = formProps;

  
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
      column,
      labelCol,
      wrapperCol,
      readOnly,
      labelWidth,
      displayType,
    };
    setContext(context);
  }, [column, labelCol, wrapperCol, displayType, labelWidth]);


  const handleValuesChange = (changedValues: any, allValues: any) => {
    valuesWatch(changedValues, allValues, watch);
  };

  const handleFinish = async (_values: any) => {
    const values = parseValuesWithBind(_values, flattenSchema);
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
      labelWrap={true}
      {...formProps}
      form={form}
      onFinish={handleFinish}
      onValuesChange={handleValuesChange}
    >
      <Row gutter={displayType === 'row' ? 16 : 24}>
        <RenderCore schema={schema} />
      </Row>
      {builtOperation && (
        <Row gutter={displayType === 'row' ? 16 : 24}>
          <Col span={24/column}>
            <Form.Item label='hideLabel' labelCol={labelCol} className='fr-oper-hide-label'>
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