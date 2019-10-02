import React from 'react';
import { Input } from '@alifd/next';
// import { Input, Icon, Balloon } from '@alifd/next';

// TODO: fusion图片预览效果不佳，暂不支持
// const defaultImg =
//   'https://img.alicdn.com/tfs/TB14tSiKhTpK1RjSZFKXXa2wXXa-354-330.png';
// const previewNode = (format, value) => {
//   if (format !== 'image') {
//     return null;
//   }
//   const content = (
//     <img
//       src={value || defaultImg}
//       alt="图片地址错误"
//       className="fr-preview-image"
//     />
//   );
//   return (
//     <Balloon
//       trigger={<Icon type="picture" />}
//       className="fr-preview"
//       align="tl"
//     >
//       {content}
//     </Balloon>
//   );
// };
export default function input(p) {
  const { options = {} } = p;
  const { addonBefore, addonAfter, ...rest } = options;
  // const { format = 'text' } = p.schema;
  const handleChange = value => p.onChange(p.name, value);
  return (
    <Input
      {...rest}
      value={p.value}
      disabled={p.disabled}
      readOnly={p.readonly}
      addonTextBefore={addonBefore ? addonBefore : ''}
      addonTextAfter={addonAfter ? addonAfter : ''}
      onChange={handleChange}
    />
  );
}
