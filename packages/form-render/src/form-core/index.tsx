import React, { useEffect } from 'react';
import { Form, Row, Col, Button, Space } from 'antd';
import shallow from 'zustand/shallow';

import { useStore, useStoreApi } from './store/createStore';
import { getFormItemLayout } from '../utils/layout';
import extractFormProps from '../utils/extractFormProps';
import RenderCore from '../render-core';

import './index.less';

const FormCore = (props: any) => {
  const [schema] = useStore(state => [state.schema, state.form], shallow);
  const storeApi = useStoreApi();
  const setContext = useStore(state => state.setContext, shallow);
  const { formProps, onMount, column, form, widgets, onFinish, builtOperation } = extractFormProps(props);

  const _column = column || schema?.column || 1;
  const { labelCol, wrapperCol } = getFormItemLayout(_column)
 
  useEffect(() => {
    onMount && onMount();
  }, []);

  useEffect(() => {
    form.init(props.schema, storeApi);
  }, []);

  useEffect(() => {
    const context = {
      column: _column,
      labelCol,
      wrapperCol,
      // readyOnly: true,
      widgets
    };
    setContext(context);
  }, [_column]);

  return (
    <Form
      form={form}
      labelWrap={true}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      onFinish={values => {
        console.log(values);
        onFinish && onFinish();
      }}
      {...formProps}
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
