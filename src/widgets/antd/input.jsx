import React from 'react';
import { Input, Icon, Popover } from 'antd';

const defaultImg =
  'https://img.alicdn.com/tfs/TB14tSiKhTpK1RjSZFKXXa2wXXa-354-330.png';
const previewNode = (format, value) => {
  if (format !== 'image') {
    return null;
  }
  const content = (
    <img
      src={value || defaultImg}
      alt="图片地址错误"
      className="fr-preview-image"
    />
  );
  return (
    <Popover content={content} className="fr-preview" placement="bottom">
      <Icon type="eye" />
    </Popover>
  );
};
export default function input(p) {
  const { options = {} } = p;
  const { format = 'text' } = p.schema;
  const type = format === 'image' ? 'text' : format;
  const handleChange = e => p.onChange(p.name, e.target.value);
  return (
    <Input
      {...options}
      value={p.value}
      type={type}
      disabled={p.disabled}
      readOnly={p.readonly}
      addonAfter={
        options.addonAfter ? options.addonAfter : previewNode(format, p.value)
      }
      onChange={handleChange}
    />
  );
}
