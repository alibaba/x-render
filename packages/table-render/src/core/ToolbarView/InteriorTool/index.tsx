import { Space } from 'antd';
import React from 'react';
import DensityIcon from './DensityIcon';
import FullScreenIcon from './FullScreenIcon';
import ReloadIcon from './ReloadIcon';
import ColumnSetting from './ColumnSetting';
import { ToolbarActionConfig } from '@/types';
import defaults from 'lodash.defaults';

const defaultConfig: ToolbarActionConfig = {
  enabled: ['all']
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

  const have = (key: ToolbarActionConfig['enabled'][number]) => {
    return enabled.includes('all') || enabled.includes(key)
  }

  if (!toolbarAction) return null;

  return (
    <Space size={14} style={{ fontSize: 18 }}>
      {have('refresh') && <ReloadIcon refresh={refresh} />}
      {have('density') && <DensityIcon />}
      {have('fullScreen') && <FullScreenIcon fullScreen={fullScreen} />}
      {have('columnsSetting') && <ColumnSetting columnsSettingValue={columnsSettingValue} onColumnsSettingChange={onColumnsSettingChange} />}
    </Space>
  );
};

export default ToolBar;
