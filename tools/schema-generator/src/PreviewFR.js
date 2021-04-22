import React from 'react';
import { useForm } from 'form-render';
import { useStore } from './hooks';

export default function PreviewFR({ schema }){
  const { FormRender } = useStore();
  const form = useForm();

  return <FormRender schema={schema} form={form} />;
}
