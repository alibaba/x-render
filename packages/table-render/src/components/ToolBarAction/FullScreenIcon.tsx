import React, { useEffect, useState } from 'react';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { message, Tooltip } from 'antd';

const FullScreenIcon = props => {
  const [isFullScreen, setFullScreen] = useState(false);
  const { fullScreen } = props;

  return isFullScreen ? (
    <Tooltip title="退出全屏">
      <FullscreenExitOutlined
        onClick={() => {
          document.exitFullscreen();
          setFullScreen(false);
        }}
      />
    </Tooltip>
  ) : (
    <Tooltip title="全屏">
      <FullscreenOutlined
        onClick={() => {
          if (!document.fullscreenEnabled) {
            message.warning('当前页面不支持全屏功能');
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
