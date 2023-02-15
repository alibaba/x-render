import React from 'react';
import { Space } from 'antd';
import classNames from 'classnames';

import { _get, isFunction } from '../../utils';
import InteriorTool from './InteriorTool';

import TitleView from './TitleView';
import './index.less';

const ToolbarView = props => {
  const { 
    setState,
    getState,
    headerTitle, 
    toolbarRender, 
    toolbarAction = true, 
    api,
    tableSize,
    refresh,
    doSearch,
    fullScreen
  } = props;
  
  const toolbarArray = isFunction(toolbarRender) ? toolbarRender() : [];
  const showTableTop = headerTitle || (toolbarArray && toolbarArray.length) || Array.isArray(api);

  return (
    <div className={classNames('tr-toolbar', { 'tr-toolbar-nohead': !showTableTop })}>
      <div className='tr-toolbar-left'>
        <TitleView title={headerTitle} doSearch={doSearch} getState={getState} />
      </div>
      <div className='tr-toolbar-right'>
        <Space>
          <Space>{toolbarRender()}</Space>
          {toolbarAction && <InteriorTool fullScreen={fullScreen} />}
        </Space>
      </div>
    </div>
  );
}

export default ToolbarView;
