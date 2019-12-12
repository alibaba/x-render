import React from 'react';
import { Switch } from 'antd';

export default function sw(p) {
  return (
    <Switch
      disabled={p.disabled || p.readonly}
      onChange={checked => p.onChange(p.name, checked)}
      defaultChecked={p.value}
    />
  );
}
