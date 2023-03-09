import React, { useContext } from 'react';
import { message, Typography, ConfigProvider } from 'antd';
import { translation } from '../../utils';

const Copy = ({ item, text }) => {
  const configCtx = useContext(ConfigProvider.ConfigContext);
  const t = translation(configCtx);
  
  return (
    <Typography.Text
      style={{
        maxWidth: '100%',
        margin: 0,
        padding: 0,
      }}
      copyable={
        item.copyable && text
          ? {
            text,
            onCopy: () => message.success(t('copy_success')),
          }
          : undefined
      }
      ellipsis={item.ellipsis || false}
    >
      {text}
    </Typography.Text>
  );
};

export default Copy;
