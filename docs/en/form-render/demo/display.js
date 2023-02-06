import FormRender, { useForm } from 'form-render';
import React from 'react';

const Demo = props => {
  const form = useForm();
  return <FormRender form={form} {...props} />;
};

export default Demo;
