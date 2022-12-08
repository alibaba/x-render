import React, { useEffect } from 'react';
import { Form, Row, Button } from 'antd';

import FRender from './renderer';
import extractFormProps from './utils/extractFormProps';

const FR = (props) => {
  const { formProps, onMount, form } = extractFormProps(props);

	useEffect(() => {
		onMount && onMount();
	}, []);

  return (
    <Form
      labelWrap={true} 
      onFinish={(values) => {
          console.log(values);
      }}
      {...formProps}
    >
      <Row style={{ margin: 0 }}>
        <FRender schema={schema} />
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





