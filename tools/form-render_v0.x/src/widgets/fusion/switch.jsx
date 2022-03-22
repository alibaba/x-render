import { Switch } from '@alifd/next';
import React from 'react';

export default function sw(p) {
  return (
    <Switch
      disabled={p.disabled || p.readOnly}
      onChange={checked => p.onChange(p.name, checked)}
      checked={!!p.value}
    />
  );
}
