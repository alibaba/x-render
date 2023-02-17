import { ReloadOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ReloadIcon = ({ refresh }) => {
  const { t } = useTranslation()
  return (
    <Tooltip title={t('reload')}>
      <ReloadOutlined onClick={() => refresh()} />
    </Tooltip>
  );
};

export default ReloadIcon;
