import { isEmpty, isObject } from 'lodash-es';
import React, { memo } from 'react';
import CodePanel from './CodePanel';
import StatusPanel from './StatusPanel';

export default memo((props: any) => {
  const { detailData, currentStatus } = props;
  const isRenderStatus =
    isObject(detailData?.statusPanel) && !isEmpty(detailData?.statusPanel);

  return (
    <div className="log-detail-panel">
      {isRenderStatus && (
        <StatusPanel
          currentStatus={currentStatus}
          statusPanelData={detailData?.statusPanel}
        />
      )}
      {(detailData?.codePanel || [])?.map((item, index) => (
        <CodePanel codeData={item} key={index} />
      ))}
    </div>
  );
});
