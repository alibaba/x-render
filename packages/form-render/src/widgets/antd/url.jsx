import React from 'react';
import { Input } from 'antd';
import { isUrl } from '../../base/utils';

const TestNode = ({ value }) => {
  const useUrl = isUrl(value);
  if (useUrl) {
    return (
      <a target="_blank" href={value}>
        测试链接
      </a>
    );
  }
  return <div>测试链接</div>;
};

export default function input(p) {
  const { options = {}, invalid, schema = {} } = p;
  const style = invalid
    ? { borderColor: '#ff4d4f', boxShadow: '0 0 0 2px rgba(255,77,79,.2)' }
    : {};
  const { format = 'text', maxLength } = schema;
  const type = format === 'image' ? 'text' : format;

  const handleChange = e => {
    p.onChange(p.name, e.target.value);
  };

  let suffix = undefined;
  try {
    let _value = p.value || '';
    if (typeof _value === 'number') {
      _value = String(_value);
    }
    suffix = options.suffix;
    if (!suffix && maxLength) {
      suffix = (
        <span
          style={
            _value.length > maxLength
              ? { fontSize: 12, color: '#ff4d4f' }
              : { fontSize: 12, color: '#999' }
          }
        >
          {_value.length + ' / ' + maxLength}
        </span>
      );
    }
  } catch (error) {}
  const config = {
    ...options,
    maxLength,
    suffix,
  };

  return (
    <Input
      style={style}
      {...config}
      value={p.value}
      type={type}
      disabled={p.disabled || p.readOnly}
      addonAfter={<TestNode value={p.value} />}
      onChange={handleChange}
    />
  );
}
