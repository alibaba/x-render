import { Image } from 'antd';
import React from 'react';

export default function html({ value, checked, options, schema = {} }: any) {
  let __html = '-';

  if (schema.type === 'boolean') {
    __html = value === true || checked === true ? '✔' : '✘';
  } else if (options?.length > 0) {
    const flatOptions = options.flatMap(item => item.options || [item]);
    if (['string', 'number'].indexOf(typeof value) > -1) {
      const item = flatOptions.find((item: any) => item.value === value);
      __html = item?.label || '-';
    } else if (Array.isArray(value)) {
      let idxStr = '-';
      value.forEach(v => {
        const item = flatOptions.find(item => item.value === v);
        const name = item?.label;
        if (name) {
          idxStr += ',' + name;
        }
      });
      __html = idxStr.replace('-,', '');
    }
  } else if (typeof value === 'number') {
    __html = String(value);
  } else if (typeof value === 'string') {
    __html = value;
  } else if (
    schema.type === 'range' &&
    Array.isArray(value) &&
    value[0] &&
    value[1]
  ) {
    __html = `${value[0]} - ${value[1]}`;
  } else if (value && ['number', 'string'].indexOf(typeof value) === -1) {
    __html = JSON.stringify(value);
  }

  if (schema.format === 'image') {
    return <Image height={56} src={value} {...schema.imageProps} />;
  }
  return <div dangerouslySetInnerHTML={{ __html }} />;
}
