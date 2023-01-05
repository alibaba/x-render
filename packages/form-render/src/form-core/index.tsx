import React, { useEffect } from 'react';

import { Form, Row, Col, Button, Space } from 'antd';
import shallow from 'zustand/shallow';
import RenderCore from '../render-core';
import extractFormProps from '../utils/extractFormProps';

import { useStore, useStoreApi } from './store/createStore';

import './index.less';

const FR = (props: any) => {
  const [schema] = useStore(state => [state.schema, state.form], shallow);
  const storeApi = useStoreApi();
  const setContext = useStore(state => state.setContext, shallow);
  const { formProps, onMount, column, form, widgets, onFinish, builtOperation } = extractFormProps(props);
 
  useEffect(() => {
    onMount && onMount();
  }, []);

  useEffect(() => {
    form.init(props.schema, storeApi);
  }, []);

  let labelCol = { span: 4 };
  // if (schema?.labelWidth) {
  //   labelCol.flex = schema.labelWidth + 'px';
  // } else {
  //   labelCol.span = schema?.labelSpan || 6;
  // }

  let wrapperCol = { span: 8 };

  const _column = column || schema?.column || 1;
  if (_column === 2) {
    labelCol = { span: 8 };
    wrapperCol = { span: 14 }
  }

  if (_column === 3) {
    labelCol = { span: 8 };
    wrapperCol = { span: 16 }
  }


  const context = {
    column: _column,
    labelCol,
    wrapperCol,
    // readyOnly: true,
    widgets
  };

  setContext(context);

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
