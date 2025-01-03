import { Badge, Divider, Space, Typography } from 'antd';
import classNames from 'classnames';
import { isString } from 'lodash';
import React, { memo, useContext } from 'react';
import { ConfigContext } from '../../../models/context';
import { getTransparentColor, transformNodeStatus } from '../../../utils';
import '../index.less';

const { Text, Paragraph } = Typography;

const StatusItem = ({ title, content, isBadge, color, colorLabel }) => {
  return (
    <div className="log-status-item">
      <Space style={{ width: '100%' }} direction="vertical" size={2}>
        <Text
          className="log-status-item-title"
          ellipsis={{
            tooltip: {
              title: title,
              color: '#ffff',
              overlayInnerStyle: {
                color: '#354052',
                fontSize: '12px',
              },
              getPopupContainer: () =>
                document.getElementById('xflow-container') as HTMLElement,
            },
          }}
        >
          {title}
        </Text>
        {isBadge ? (
          <Badge
            color={color}
            text={content || colorLabel}
            className="log-status-item-badge"
          />
        ) : (
          <Text
            className="log-status-item-content"
            ellipsis={{
              tooltip: {
                title: title,
                color: '#ffff',
                overlayInnerStyle: {
                  color: '#354052',
                  fontSize: '12px',
                },
                getPopupContainer: () =>
                  document.getElementById('xflow-container') as HTMLElement,
              },
            }}
          >
            {content}
          </Text>
        )}
      </Space>
    </div>
  );
};

export default memo((props: any) => {
  const { currentStatus, statusPanelData: renderData } = props;
  const { globalConfig } = useContext(ConfigContext);
  const {
    nodeView: { status = [] },
  } = globalConfig;
  const statusObj = transformNodeStatus(status || []);
  const statusColor = statusObj[currentStatus]?.color;
  const bgColor = getTransparentColor(statusColor, 0.1);
  const boxShadowColor = getTransparentColor(statusColor, 0.2);

  return (
    <div
      className="log-status-panel"
      style={{
        '--status-color': statusColor,
        '--status-bg-color': bgColor,
        '--status-box-shadow': boxShadowColor,
      } as React.CSSProperties}
    >
      <div
        className={classNames('log-status-panel-wrap', {
          'log-status-panel-single': renderData?.status?.length == 1,
        })}
      >
        {(renderData?.status || [])?.map((item, index) => (
          <StatusItem
            title={item?.label}
            content={item?.value}
            key={index}
            isBadge={item?.isBadge || false}
            color={statusColor}
            colorLabel={statusObj[currentStatus]?.name}
          />
        ))}
      </div>
      {renderData?.status?.length && renderData?.extra && (
        <Divider style={{ margin: '6px 0' }} />
      )}
      {renderData?.extra && (
        <div className="log-status-panel-extra">
          {isString(renderData?.extra) ? (
            <Paragraph
              ellipsis={{
                rows: 3,
                tooltip: {
                  title: renderData?.extra,
                  placement: 'bottomRight',
                  color: '#ffff',
                  overlayInnerStyle: {
                    color: '#354052',
                    fontSize: '12px',
                  },
                  getPopupContainer: () =>
                    document.getElementById('xflow-container') as HTMLElement,
                },
              }}
              className="log-status-panel-extra-text"
            >
              {renderData?.extra}
            </Paragraph>
          ) : (
            <>{renderData?.extra}</>
          )}
        </div>
      )}
    </div>
  );
});
