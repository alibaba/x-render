import React from 'react';
import Form, { useForm } from 'form-render';

const schema = {
  type: 'object',
  properties: {
    string: {
      title: '自定义 desc',
      type: 'string',
      descWidget: 'MyDesc',
      description: '这是一段描述',
    },
  },
};

const MyDesc = (props) => {
  const { schema } = props;
  console.log('props:', props)
  return (
    <div style={{color: 'red', fontWeight: 'bolder'}}>{schema.description}</div>
  )
}

const Demo = () => {
  const form = useForm();
  return (
    <Form
      form={form}
      schema={schema}
      widgets={{ MyDesc }}
    />
  );
};

export default Demo;
