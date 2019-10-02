import React from 'react';
import { Switch } from '@alifd/next';

export default function sw(p) {
  return (
    <Switch
      disabled={p.disabled}
      onChange={checked => p.onChange(p.name, checked)}
      defaultChecked={p.value}
    />
  );
}
