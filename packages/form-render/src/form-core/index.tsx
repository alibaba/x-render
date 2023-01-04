import React, { useEffect } from 'react';

import { Form, Row, Col, Button, Space } from 'antd';
import shallow from 'zustand/shallow';
import RenderCore from '../render-core';
import extractFormProps from '../utils/extractFormProps';
import { useStore } from './useForm';
import { useRootStore } from '../store/form';

import './index.less';

const FR = props => {
  const [schema] = useStore(state => [state.schema, state.form], shallow);
  const setRootStore = useRootStore(state => state.setStore, shallow);
  const { formProps, onMount, column, form, widgets, onFinish, builtOperation } = extractFormProps(props);

  useEffect(() => {
    onMount && onMount();
  }, []);

  const labelCol = { span: 4 };
  // if (schema?.labelWidth) {
  //   labelCol.flex = schema.labelWidth + 'px';
  // } else {
  //   labelCol.span = schema?.labelSpan || 6;
  // }

  const wrapperCol = { span: 8 };

  const context = {
    column: column || schema?.column || 1,
    labelCol,
    wrapperCol,
    // readyOnly: true,
    widgets
  };
  
  setRootStore(context);

  console.log(context, '------');

  return (
    <Form
      labelWrap={true}
      onFinish={values => {
        console.log(values);
        onFinish && onFinish();
      }}
      labelCol={labelCol}
      form={form}
      {...formProps}
    >
      <Row gutter={8}>
        <RenderCore schema={schema} />
      </Row>
      {builtOperation && (
        <Row gutter={8}>
          <Col span={24/context.column}>
              <Form.Item label='xxx' labelCol={labelCol} className='xxxx'>
                
                <Space>
                  <Button type="primary" htmlType="submit">
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
};

export default FR;
