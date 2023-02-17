import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { message, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FullScreenIcon = props => {
  const { t } = useTranslation()
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
