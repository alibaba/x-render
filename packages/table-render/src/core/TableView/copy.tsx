import React from 'react';
import { message, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { getEnumValue } from './field';

const Copy = ({ item, text }) => {
  const { t } = useTranslation()
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
      {getEnumValue(text, item)}
    </Typography.Text>
  );
};

export default Copy;
