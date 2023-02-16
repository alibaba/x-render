import { SettingOutlined } from '@ant-design/icons';
import { Popover, Tooltip } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ColumnSetting = () => {
  const { t } = useTranslation()
  return (
    <Popover
      arrowPointAtCenter
      title={t('column_setting')}
      trigger='click'
      placement='bottomRight'
      content={t('column_setting')}
    >
      <Tooltip title={t('column_setting')}>
        <SettingOutlined />
      </Tooltip>
    </Popover>
  );
}

export default ColumnSetting;
