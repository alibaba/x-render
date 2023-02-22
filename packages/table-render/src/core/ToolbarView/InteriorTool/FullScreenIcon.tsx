import React, { useState, useContext } from 'react';
import { message, Tooltip, ConfigProvider } from 'antd';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { translation } from '../../../utils';

const FullScreenIcon = props => {
  const configCtx = useContext(ConfigProvider.ConfigContext);
  const t = translation(configCtx);
  const [isFullScreen, setFullScreen] = useState(false);
  const { fullScreen } = props;

  return isFullScreen ? (
    <Tooltip title={t('exit_full_screen')}>
      <FullscreenExitOutlined
        onClick={() => {
          document.exitFullscreen();
          setFullScreen(false);
        }}
      />
    </Tooltip>
  ) : (
    <Tooltip title={t('full_screen')}>
      <FullscreenOutlined
        onClick={() => {
          if (!document.fullscreenEnabled) {
            message.warning(t('cannot_full_screen'));
            return;
          }
          if (!document.fullscreenElement) {
            setFullScreen(true);
            fullScreen().catch((err: any) => message.error(err.message));
          }
        }}
      />
    </Tooltip>
  );
};

export default FullScreenIcon;
