import React, { useContext } from 'react';
import { PictureOutlined } from '@ant-design/icons';
import { Input, Popover, ConfigProvider } from 'antd';
import { translation } from '../../utils';
import withFieldWrap from '../../utils/withFieldWrap';
import './index.less';

const DEFAULT_IMG =
  'https://img.alicdn.com/tfs/TB14tSiKhTpK1RjSZFKXXa2wXXa-354-330.png';

interface PreviewNodeProps {
  value: string;
}

const PreviewNode = ({ value }: PreviewNodeProps) => {
  const configCtx = useContext(ConfigProvider.ConfigContext);
  const t = translation(configCtx);
  
  return (
    <Popover
      content={
        <img
          src={value || DEFAULT_IMG}
          alt={t('img_src_error')}
          className='fr-preview-image'
        />
      }
      className='fr-preview'
      placement='bottom'
    >
      <PictureOutlined />
    </Popover>
  );
};

interface ImageInputProps {
  value: string;
}

const ImageInput = ({ value, ...rest }: ImageInputProps) => {
  return (
    <Input value={value} addonAfter={<PreviewNode value={value} />} {...rest} />
  );
}

export default withFieldWrap(ImageInput)



