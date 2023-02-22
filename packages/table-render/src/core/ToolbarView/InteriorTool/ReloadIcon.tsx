import React, { useContext} from 'react';
import { Tooltip, ConfigProvider } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { translation } from '../../../utils';

const ReloadIcon = ({ refresh }) => {
  const configCtx = useContext(ConfigProvider.ConfigContext);
  const t = translation(configCtx);
  return (
    <Tooltip title={t('reload')}>
      <ReloadOutlined onClick={() => refresh()} />
    </Tooltip>
  );
};

export default ReloadIcon;
