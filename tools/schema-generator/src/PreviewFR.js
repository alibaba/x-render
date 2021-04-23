import React from 'react';
import FormRender, { useForm } from 'form-render';

export default function PreviewFR({ schema }){
  const form = useForm();

  return <FormRender schema={schema} form={form} />;
}
