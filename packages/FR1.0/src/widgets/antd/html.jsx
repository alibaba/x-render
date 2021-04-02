import React from 'react';

export default function html({ value, defaultValue }) {
  let __html = '';
  try {
    __html = value ? value : defaultValue;
    if (typeof __html !== 'string') {
      __html = '';
    }
  } catch (error) {}
  return <div dangerouslySetInnerHTML={{ __html }} />;
}
