import React, { useEffect } from 'react';
import { Form, Row, Col, Button, Space } from 'antd';
import shallow from 'zustand/shallow';

import { useStore, useStoreApi } from './store/createStore';
import { getFormItemLayout } from '../utils/layout';
import extractFormProps from '../utils/extractFormProps';
import RenderCore from '../render-core';

import './index.less';

const doWatch = (watchKey: any, value: any, watch: any) => {
  const fieldWatch = watch[watchKey];
  if (!fieldWatch) {
    return;
  }

  if (typeof fieldWatch === 'function') {
    try {
      fieldWatch(value);
    } catch (error) {
      console.log(`${watchKey}对应的watch函数执行报错：`, error);
    }
  } 
  
  if (typeof fieldWatch.handler === 'function') {
    try {
      fieldWatch.handler(value);
    } catch (error) {
      console.log(`${watchKey}对应的watch函数执行报错：`, error);
    }
  }
};

const watcher = (changedValues: any, allValues: any, watch: any) => {
  if (Object.keys(watch).length === 0) {
    return;
  }
  const _changedValues = {
    '#': allValues,
    ...changedValues
  }
  Object.keys(_changedValues).forEach(key => doWatch(key, _changedValues[key], watch))
  
}

const FormCore = (props: any) => {
  const storeApi = useStoreApi();
  const setContext = useStore(state => state.setContext, shallow);
  const [schema] = useStore(state => [state.schema, state.form], shallow);
  const { properties, ...schemProps } = schema;

  const { formProps, watch, onMount, column, form, widgets, onFinish, builtOperation } = extractFormProps({ ...props, ...schemProps });

  const _column = column || schema?.column || 1;
  const { labelCol, wrapperCol } = getFormItemLayout(_column, formProps);
 
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
  }, [_column, labelCol, wrapperCol]);

  const handleOnValuesChange = (changedValues: any, allValues: any) => {
    
    watcher(changedValues, allValues, watch)
  }

  

  
  

  return (
    <Form
      form={form}
      labelWrap={true}
      onFinish={values => {
        console.log(values);
        onFinish && onFinish();
      }}
      {...formProps}
      onValuesChange={handleOnValuesChange}
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
