import React from 'react';
import FRWrapper from '../FRWrapper';
import { defaultGlobalSettings } from '../Settings';
// import { widgets } from '../widgets/antd';
import { useStore, useGlobal } from '../hooks';

export default function ItemSettings() {
  const { widgets, frProps, userProps } = useStore();
  const setGlobal = useGlobal();
  const globalSettings =
    userProps && userProps.globalSettings
      ? userProps.globalSettings
      : defaultGlobalSettings;

  const onDataChange = frProps => {
    setGlobal({ frProps });
  };

  return (
    <div style={{ paddingRight: 24 }}>
      <FRWrapper
        schema={{ schema: globalSettings }}
        formData={frProps}
        onChange={onDataChange}
        widgets={widgets}
        preview={true}
        frProps={{ displayType: 'column', showDescIcon: true }}
      />
    </div>
  );
}
