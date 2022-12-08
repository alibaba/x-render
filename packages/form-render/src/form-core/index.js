import React, { useEffect } from 'react';
import { Form, Row, Button } from 'antd';

import RenderCore from '../render-core';
import extractFormProps from '../utils/extractFormProps';

import schema from '../schema-mock';

const FR = (props) => {
  const { formProps, onMount } = extractFormProps(props);

  console.log(formProps, '------')

	useEffect(() => {
		onMount && onMount();
	}, []);

  return (
    <Form
      labelWrap={true} 
      onFinish={(values) => {
          console.log(values);
      }}
      // {...formProps}
    >
      <Row style={{ margin: 0 }}>
        <RenderCore schema={schema} />
      </Row>
      <Row>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Row>
    </Form>
  );
}

export default FR;





