import React, { useEffect, useMemo } from 'react';
import { widgets as defaultWidgets } from '../widgets';

import { Form, Row, Button, Col, Space } from 'antd';
import shallow from 'zustand/shallow';
import RenderCore from '../render-core';
import extractFormProps from '../utils/extractFormProps';
import { FormContext } from '../utils/context';
import { useStore } from './useForm';

const FR = props => {
  const [schema] = useStore(state => [state.schema, state.form], shallow);
  const { formProps, onMount, column, form, widgets, onFinish } = extractFormProps(props);

  useEffect(() => {
    onMount && onMount();
  }, []);


  const labelCol = { span : 6 };
  // if (schema?.labelWidth) {
  //   labelCol.flex = schema.labelWidth + 'px';
  // } else {
  //   labelCol.span = schema?.labelSpan || 6;
  // }

  const wrapperCol = { span: 18 };

  const context = {
    column: column || schema?.column || 1,
    labelCol,
    wrapperCol,
    readyOnly: true,
    widgets: {
      ...defaultWidgets,
      widgets
    }
  };

  return (
    <FormContext.Provider value={context}>
      <Form
        labelWrap={true}
        onFinish={values => {
          console.log(values);
        }}
        labelCol={labelCol}
        form={form}
        {...formProps}
        initialValues={{
          a: "1",
          b: "2",
          c: "online",
          e: [{
            input_3XWgl7: '1111'
          }]
        }}
      >
        <Row gutter={8}>
          <RenderCore schema={schema} />
        </Row>
        <Row>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button onClick={() => form.resetFields()}>Reset</Button>
          </Space>
        </Row>
      </Form>
    </FormContext.Provider>
  );
};

export default FR;