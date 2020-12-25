import React from 'react';
import { Checkbox } from 'antd';

export default function radio(p) {
  return (
    <Checkbox
      disabled={p.disabled || p.readOnly}
      onChange={e => p.onChange(p.name, e.target.checked)}
      checked={p.value}
    />
  );
}
