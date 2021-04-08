import React from 'react';
import FormRender, { useForm } from 'form-render';

const Demo = ({ schema }) => {
  const form = useForm();
  return (
    <div style={{ width: '400px' }}>
      <FormRender form={form} schema={schema} />
    </div>
  );
};

export default Demo;
