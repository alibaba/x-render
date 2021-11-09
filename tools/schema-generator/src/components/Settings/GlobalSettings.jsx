import React, { useState, useEffect } from 'react';
import FormRender, { useForm } from 'form-render';
import { defaultGlobalSettings } from '../../settings';
import { useStore, useGlobal } from '../../utils/hooks';

export default function GlobalSettings({ widgets }) {
  const form = useForm();
  const [innerUpdate, setInnerUpdate] = useState(false);
  const { widgets: globalWidgets, frProps, userProps = {} } = useStore();
  const setGlobal = useGlobal();
  const globalSettings = userProps.globalSettings || defaultGlobalSettings;

  const onDataChange = value => {
    setInnerUpdate(!!Object.keys(value).length);
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
        widgets={{ ...globalWidgets, ...widgets }}
      />
    </div>
  );
}
