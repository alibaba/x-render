import FormRender, { useForm } from 'form-render';
import React from 'react';

const Demo = ({ schema, ...otherProps }) => {
  const form = useForm();
  
  return <FormRender form={form} schema={schema} {...otherProps} displayType='row' />
};

export default Demo;
