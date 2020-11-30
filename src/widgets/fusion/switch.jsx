import React from 'react';
import { Switch } from '@alifd/next';

export default function sw(p) {
  return (
    <Switch
      disabled={p.disabled || p.readOnly}
      onChange={checked => p.onChange(p.name, checked)}
      checked={!!p.value}
    />
  );
}
