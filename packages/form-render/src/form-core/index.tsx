import React, { useEffect } from 'react';
import { Form, Row, Col, Button, Space } from 'antd';
import shallow from 'zustand/shallow';

import { useStore, useStoreApi } from './models/createFormStore';
import { transformFieldsError, valuesWatch, transformProps } from './models/common';
import { getFormItemLayout } from '../utils/layout';
import RenderCore from '../render-core';
import './index.less';

export { default as connectForm } from './models/connectForm';
export { default as useForm } from './models/useForm';

const FormCore = (props: any) => {
  const storeApi = useStoreApi();
  const setContext = useStore(state => state.setContext, shallow);
  const [schema] = useStore(state => [state.schema, state.form], shallow);

  const { properties, ...schemProps } = schema;
  const { formProps, beforeFinish, watch, onMount, column, labelWidth, form, widgets, onFinish, readOnly, builtOperation } = transformProps({ ...props, ...schemProps });
  const _column = column || schema?.column || 1;
  const { labelCol, wrapperCol } = getFormItemLayout(_column, formProps, labelWidth);
 
  useEffect(() => {
    form.init(props.schema, storeApi);
    setTimeout(() => {
      onMount && onMount();
    }, 0);
  }, []);

  useEffect(() => {
    const context = {
      column: _column,
      labelCol,
      wrapperCol,
      readOnly,
      widgets,
      layout: formProps.layout
    };
    setContext(context);
  }, [_column, labelCol, wrapperCol]);

  const handleValuesChange = (changedValues: any, allValues: any) => {
    valuesWatch(changedValues, allValues, watch);
  };

  const handleFinish = async (values: any) => {
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
      <Row gutter={8}>
        <RenderCore schema={schema} />
      </Row>
      {builtOperation && (
        <Row gutter={8}>
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
