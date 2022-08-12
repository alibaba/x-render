import FormRender, { useForm } from 'form-render';
import React, { useEffect, useState } from 'react';
import { defaultGlobalSettings } from '../../settings';
import { useGlobal, useStore } from '../../utils/hooks';

export default function GlobalSettings({ widgets }) {
  const form = useForm();
  const [innerUpdate, setInnerUpdate] = useState(false);
  const {
    widgets: globalWidgets,
    frProps,
    userProps = {},
    mapping,
  } = useStore();
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

  useEffect(() => {
    setGlobal({ settingsForm: form });
  }, []);

  return (
    <div style={{ paddingRight: 24 }}>
      <FormRender
        form={form}
        schema={globalSettings}
        watch={{
          '#': v => onDataChange(v),
        }}
        widgets={{ ...globalWidgets, ...widgets }}
        mapping={mapping}
      />
    </div>
  );
}
