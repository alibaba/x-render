import React, { useContext } from 'react';
import { Popover, Tooltip, ConfigProvider } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { translation } from '../../../utils';

const ColumnSetting = () => {
  const configCtx = useContext(ConfigProvider.ConfigContext);
  const t = translation(configCtx);

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
