import React, { useState, useEffect } from 'react';
import FormRender, { useForm } from 'form-render';
import { defaultGlobalSettings } from '../Settings';
import { useStore, useGlobal } from '../hooks';

export default function GlobalSettings() {
  const form = useForm();
  const [innerUpdate, setInnerUpdate] = useState(false);
  const { widgets, frProps, userProps } = useStore();
  const setGlobal = useGlobal();
  const globalSettings =
    userProps && userProps.globalSettings
      ? userProps.globalSettings
      : defaultGlobalSettings;

  const onDataChange = value => {
    setInnerUpdate(true);
    setGlobal({ frProps: value });
  };

  useEffect(() => {
    if (innerUpdate) {
      setInnerUpdate(false);
    } else {
      form.setValues(frProps);
    }
  }, [frProps]);

  return (
    <div style={{ paddingRight: 24 }}>
      <FormRender
        form={form}
        schema={globalSettings}
        watch={{
          '#': v => onDataChange(v),
        }}
        widgets={widgets}
      />
    </div>
  );
}
