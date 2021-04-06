import React from 'react';

export default function html({ value, schema, ...rest }) {
  let __html = '';
  try {
    __html = value ? value : schema.default;
    if (typeof __html !== 'string') {
      __html = '';
    }
  } catch (error) {}
  return <div dangerouslySetInnerHTML={{ __html }} />;
}
