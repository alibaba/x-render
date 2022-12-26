import React, { useEffect, useMemo } from 'react';
import { Form, Row, Button, Col, Space } from 'antd';
import shallow from 'zustand/shallow';
import RenderCore from '../render-core';
import extractFormProps from '../utils/extractFormProps';
import { FormContext } from '../utils/context';
import { useStore } from './useForm';

const FR = props => {
  const [schema] = useStore(state => [state.schema, state.form], shallow);
  const { formProps, onMount, column, form, onFinish } =
    extractFormProps(props);

  useEffect(() => {
    onMount && onMount();
  }, []);

  const context = {
    column: column || schema?.column || 1,
    form: props.form,
  };

  const labelCol = {};
  if (schema?.labelWidth) {
    labelCol.flex = schema.labelWidth + 'px';
  } else {
    labelCol.span = schema?.labelSpan || 6;
  }

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
