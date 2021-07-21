import React from 'react';
import { Input } from 'antd';
import { isUrl } from '../../utils';

const UrlNode = ({ value, addonText = '测试链接' }) => {
  const useUrl = isUrl(value);

  if (useUrl) {
    return (
      <a target="_blank" href={value}>
        {addonText}
      </a>
    );
  }

  return <div>{addonText}</div>;
};

export default function UrlInput({
  value,
  prefix,
  suffix,
  addonText,
  onChange,
  ...rest
}) {
  let _value = value || '';

  if (prefix) {
    _value = _value.replace(prefix, '');
  }

  if (suffix) {
    _value = _value.replace(suffix, '');
  }

  const handleChange = e => {
    let _value = e.target.value;
    if (!_value) {
      onChange(_value);
      return;
    }
    if (prefix) {
      _value = prefix + _value;
    }
    if (suffix) {
      _value = _value + suffix;
    }
    onChange(_value);
  };

  return (
    <Input
      value={_value}
      prefix={prefix}
      suffix={suffix}
      onChange={handleChange}
      addonAfter={
        <UrlNode
          value={value}
          prefix={prefix}
          suffix={suffix}
          addonText={addonText}
        />
      }
      {...rest}
    />
  );
}
