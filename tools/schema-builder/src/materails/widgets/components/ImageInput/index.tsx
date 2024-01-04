import { PictureOutlined } from '@ant-design/icons';
import { Input, Popover } from 'antd';
import React from 'react';

const DEFAULT_IMG =
  'https://img.alicdn.com/tfs/TB14tSiKhTpK1RjSZFKXXa2wXXa-354-330.png';

const PreviewNode = ({ value }: any) => {
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

const ImageInput = (props: any) => {
  const { value, ...rest } = props

  return (
    <Input value={value} addonAfter={<PreviewNode value={value} />} {...rest} />
  );
}

export default ImageInput;
