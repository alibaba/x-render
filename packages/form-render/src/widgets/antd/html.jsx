import React from 'react';

export default function html({ value, schema }) {
  let __html = '-';
  if (schema.type === 'boolean') {
    __html = value === true ? '✔' : '✘';
  } else if (Array.isArray(schema.enum) && Array.isArray(schema.enumNames)) {
    const idx = schema.enum.indexOf(value);
    __html = schema.enumNames[idx] || '-';
  } else if (typeof value === 'number') {
    __html = String(value);
  } else if (typeof value === 'string') {
    __html = value;
  }

  return (
    <div
      style={{ marginTop: 5, minHeight: 22 }}
      dangerouslySetInnerHTML={{ __html }}
    />
  );
}
