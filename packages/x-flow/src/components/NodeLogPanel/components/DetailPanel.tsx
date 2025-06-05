import classNames from 'classnames';
import { isEmpty, isObject } from 'lodash-es';
import React, { memo, useContext, useState } from 'react';
import { ConfigContext } from '../../../models/context';
import '../index.less';
import CodePanel from './CodePanel';
import StatusPanel from './StatusPanel';

export default memo((props: any) => {
  const { detailData, currentStatus } = props;
  const isRenderStatus =
    isObject(detailData?.statusPanel) && !isEmpty(detailData?.statusPanel);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { widgets, logPanel } = useContext(ConfigContext);
  const CustomTitleWidget = widgets[detailData?.groupTitle]; // 自定义标题组件
  const DetailLogWidget = widgets[logPanel?.detailLogWidget]; // 自定义组件
  const isShowDetailLogWidget =Boolean(detailData?.showDetailLogWidget!==false)&&Boolean(DetailLogWidget);

  return (
    <div
      className={classNames('log-detail-panel', {
        ['log-detail-panel-code-full']: isFullScreen,
      })}
    >
      {Boolean(CustomTitleWidget) ? (
        <CustomTitleWidget logData={detailData} currentStatus={currentStatus} />
      ) : (
        detailData?.groupTitle && (
          <div className="log-detail-panel-title">
            <span className="log-detail-panel-title-text">
              {detailData.groupTitle}
            </span>
            <div className="log-detail-panel-title-line" />
          </div>
        )
      )}
      {Boolean(isRenderStatus) && (
        <StatusPanel
          currentStatus={currentStatus}
          statusPanelData={detailData?.statusPanel}
        />
      )}
      {(detailData?.codePanel || [])?.map((item, index) => (
        <CodePanel
          codeData={item}
          key={index}
          onFullScreenChange={isFullScreen => {
            setIsFullScreen(isFullScreen);
          }}
        />
      ))}
      {Boolean(isShowDetailLogWidget) && <DetailLogWidget data={detailData} logList={logPanel?.logList} currentStatus={currentStatus} logPanel={logPanel} />}
    </div>
  );
});
