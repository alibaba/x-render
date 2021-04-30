import React, { useEffect } from 'react';
import FormRender, { useForm } from 'form-render';
import { useGlobal, useStore } from './hooks';
import { flattenToData } from './utils';

export default function PreviewFR({ schema }){
  const form = useForm();
  const setGlobal = useGlobal();
  const { flatten } = useStore();

  useEffect(() => {
    form.setValues(flattenToData(flatten));
  }, [])

  return <FormRender
    schema={schema}
    form={form}
    watch={{
      '#': (formData) => {
        setGlobal({ formData });
      },
    }}
  />;
}
