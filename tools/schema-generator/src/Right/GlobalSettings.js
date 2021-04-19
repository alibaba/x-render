import React, { useEffect } from 'react';
import _set from 'lodash.set';
import FormRender, { useForm } from 'form-render';
import { defaultGlobalSettings } from '../Settings';
// import { widgets } from '../widgets/antd';
import { useStore, useGlobal } from '../hooks';

export default function ItemSettings() {
  const form = useForm();
  const { widgets, frProps, userProps } = useStore();
  const setGlobal = useGlobal();
  const globalSettings =
    userProps && userProps.globalSettings
      ? userProps.globalSettings
      : defaultGlobalSettings;

  const onDataChange = (path, value) => {
    const newSchema = { ...form.getValues() };

    _set(newSchema, path, value);

    setGlobal({ frProps: newSchema });
  };

  useEffect(() => {
    form.setValues(frProps);
  }, [frProps]);

  return (
    <div style={{ paddingRight: 24 }}>
      <FormRender
        form={form}
        schema={globalSettings}
        onItemChange={onDataChange}
        widgets={widgets}
      />
    </div>
  );
}
