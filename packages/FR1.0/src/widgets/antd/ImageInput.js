import React from 'react';
import { PictureOutlined } from '@ant-design/icons';
import { Input, Popover } from 'antd';

const DEFAULT_IMG =
  'https://img.alicdn.com/tfs/TB14tSiKhTpK1RjSZFKXXa2wXXa-354-330.png';

const PreviewNode = ({ value }) => {
  return (
    <Popover
      content={
        <img
          src={value || DEFAULT_IMG}
          alt="图片地址错误"
          className="fr-preview-image"
        />
      }
      className="fr-preview"
      placement="bottom"
    >
      <PictureOutlined />
    </Popover>
  );
};

export default function imageInput({ value, defaultValue, ...rest }) {
  const _value = value || defaultValue;
  return (
    <Input
      value={_value}
      addonAfter={<PreviewNode value={_value} />}
      {...rest}
    />
  );
}
