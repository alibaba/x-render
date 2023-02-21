import { PictureOutlined } from '@ant-design/icons';
import { Input, Popover, ConfigProvider } from 'antd';
import React, { useContext } from 'react';
import { translation } from '../../utils';

const DEFAULT_IMG =
  'https://img.alicdn.com/tfs/TB14tSiKhTpK1RjSZFKXXa2wXXa-354-330.png';

const PreviewNode = ({ value }) => {
  const configCtx = useContext(ConfigProvider.ConfigContext);
  const t = translation(configCtx);
  
  return (
    <Popover
      content={
        <img
          src={value || DEFAULT_IMG}
          alt={t('img_src_error')}
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

export default function imageInput({ value, ...rest }) {
  return (
    <Input value={value} addonAfter={<PreviewNode value={value} />} {...rest} />
  );
}
