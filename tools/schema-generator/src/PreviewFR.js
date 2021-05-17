import React, { useEffect } from 'react';
import FormRender, { useForm } from 'form-render';
import { useStore } from './hooks';
import { flattenToData, dataToFlatten } from './utils';

export default function PreviewFR({ schema }) {
  const form = useForm();
  const { flatten, widgets, mapping, onFlattenChange } = useStore();

  useEffect(() => {
    form.setValues(flattenToData(flatten));
  }, []);

  return (
    <FormRender
      schema={schema}
      form={form}
      widgets={widgets}
      mapping={mapping}
      watch={{
        '#': formData => {
          onFlattenChange(dataToFlatten(flatten, formData), 'data');
        },
      }}
    />
  );
}
