import React, { useEffect } from 'react';
import FormRender, { useForm } from 'form-render';
import { defaultGlobalSettings } from '../Settings';
import { useStore, useGlobal } from '../hooks';

export default function GlobalSettings() {
  const form = useForm();
  const { widgets, frProps, userProps } = useStore();
  const setGlobal = useGlobal();
  const globalSettings =
    userProps && userProps.globalSettings
      ? userProps.globalSettings
      : defaultGlobalSettings;

  const onDataChange = (value) => {
    if (value.displayType) {
      setGlobal({ frProps: value });
    }
  };

  useEffect(() => {
    form.setValues(frProps);
  }, [frProps]);

  return (
    <div style={{ paddingRight: 24 }}>
      <FormRender
        form={form}
        schema={globalSettings}
        watch={{
          '#': v => onDataChange(v)
        }}
        widgets={widgets}
      />
    </div>
  );
}
