import React, { useEffect, useMemo } from 'react';
import { Form, Row, Button } from 'antd';



import RenderCore from '../render-core';
import extractFormProps from '../utils/extractFormProps';
import { FormContext } from '../utils/context';

const FR = (props) => {
  const { formProps, onMount, schema, column } = extractFormProps(props);
  console.log(props, 'formProps------');

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
    wrapperCol
  };
  return (
    <FormContext.Provider value={context}>
      <Form
        labelWrap={true} 
        onFinish={(values) => {
          console.log(values);
        }}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        {...formProps}
      >
        <Row gutter={8}>
          <RenderCore 
            schema={schema}
          />
        </Row>
        {/* <Row>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Row> */}
      </Form>
    </FormContext.Provider>
  );
}

export default FR;





