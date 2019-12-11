import React from 'react';
import { Input, Icon, Balloon } from '@alifd/next';
import previewContent from '../../components/previewContent';

const previewNode = (format, value) => {
  if (format !== 'image') {
    return null;
  }
  return (
    <Balloon
      trigger={<Icon type="picture" />}
      className="fr-preview"
      align="tl"
    >
      {previewContent(format, value)}
    </Balloon>
  );
};
export default function input(p) {
  const { options = {}, invalid } = p;
  const style = invalid ? { borderColor: '#f5222d' } : {};
  const { addonBefore, addonAfter, ...rest } = options;
  const { format = 'text' } = p.schema;
  const handleChange = value => p.onChange(p.name, value);
  return (
    <Input
      style={style}
      {...rest}
      value={p.value}
      disabled={p.disabled}
      readOnly={p.readonly}
      addonTextBefore={addonBefore ? addonBefore : ''}
      addonTextAfter={addonAfter ? addonAfter : previewNode(format, p.value)}
      onChange={handleChange}
    />
  );
}
