import { Space } from 'antd';
import React from 'react';
import DensityIcon from './DensityIcon';
import FullScreenIcon from './FullScreenIcon';
import ReloadIcon from './ReloadIcon';
import ColumnSetting from './ColumnSetting';
import { ToolbarActionConfig } from '@/types';
import defaults from 'lodash.defaults';

const defaultConfig: ToolbarActionConfig = {
  enabled: ['columnsSetting', 'density', 'fullScreen', 'refresh']
}

const ToolBar: React.FC<{
  fullScreen: () => Promise<void>,
  refresh: () => void,
  toolbarAction: ToolbarActionConfig,
}> = ({ refresh, fullScreen, toolbarAction = false }) => {


  const toolbarActionConfig = (typeof toolbarAction === 'boolean' && toolbarAction)
    ? defaultConfig
    : defaults(toolbarAction, defaultConfig)

  const { columnsSettingValue, onColumnsSettingChange, enabled } = toolbarActionConfig;

  if (!toolbarAction) return null;

  return (
    <Space size={14} style={{ fontSize: 18 }}>
      {enabled.includes('refresh') && <ReloadIcon refresh={refresh} />}
      {enabled.includes('density') && <DensityIcon />}
      {enabled.includes('fullScreen') && <FullScreenIcon fullScreen={fullScreen} />}
      {enabled.includes('columnsSetting') && <ColumnSetting columnsSettingValue={columnsSettingValue} onColumnsSettingChange={onColumnsSettingChange} />}
    </Space>
  );
};

export default ToolBar;
