import React from 'react';
import { Space } from 'antd';
import classNames from 'classnames';

import { _get, isFunction, isArray } from '../../utils';
import InteriorTool from './InteriorTool';

import TitleView from './TitleView';
import './index.less';

const ToolbarView = props => {
  const { 
    setState,
    getState,
    title, 
    toolbarRender, 
    toolbarAction = false, 
    request,
    refresh,
    doSearch,
    fullScreen,
    currentTab
  } = props;
  
  const content = isFunction(toolbarRender) ? toolbarRender() : (toolbarRender || []);
  const isTopHead = title || (!!content && content?.length !== 0) || (isArray(request) && request.length > 1);
 
  return (
    <div className={classNames('tr-toolbar', { 'tr-toolbar-nohead': !isTopHead })}>
      <div className='tr-toolbar-left'>
        <TitleView title={title} doSearch={doSearch} setState={setState} request={request} currentTab={currentTab} />
      </div>
      <div className='tr-toolbar-right'>
        <Space>
          <Space>{content}</Space>
          {toolbarAction && <InteriorTool fullScreen={fullScreen} refresh={refresh} />}
        </Space>
      </div>
    </div>
  );
}

export default ToolbarView;
