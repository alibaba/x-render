import React from 'react';
import Form, { useForm } from 'form-render';

const schema = {
  type: 'object',
  properties: {
    string: {
      title: '自定义 label',
      type: 'string',
      labelWidget: 'MyLabel',
    },
  },
};

const MyLabel = (props) => {
  const { schema } = props;
  console.log('props:', props)
  return (
    <div style={{color: 'red', fontWeight: 'bolder'}}>{schema.title}</div>
  )
}

const Demo = () => {
  const form = useForm();
  return (
    <Form
      form={form}
      schema={schema}
      widgets={{ MyLabel }}
    />
  );
};

export default Demo;
