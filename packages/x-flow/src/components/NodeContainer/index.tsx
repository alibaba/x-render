import { Popover, Tooltip, Typography } from 'antd';
import classNames from 'classnames';
import React, { memo, useMemo } from 'react';
import createIconFont from '../../utils/createIconFont';
import { MenuTooltip } from '../NodesMenu';
import './index.less';

const { Text, Paragraph } = Typography;

export default memo((props: any) => {
  const {
    className,
    onClick,
    children,
    icon,
    title,
    desc,
    hideDesc,
    NodeWidget,
    iconFontUrl,
  } = props;
  const IconBox = useMemo(() => createIconFont(iconFontUrl), [iconFontUrl]);

  return (
    <div
      className={classNames('custom-node-container', {
        [className]: !!className,
      })}
      onClick={onClick}
    >
      <div className="node-title">
        <Popover
          title={<MenuTooltip {...props} />}
          placement="bottomLeft"
          trigger="click"
        >
          <Tooltip
            title="点击图标查看节点信息"
            arrow={false}
            placement="topLeft"
            color="#fff"
            overlayInnerStyle={{
              color: '#354052',
              fontSize: '12px',
            }}
          >
            <span className="icon-box" style={{ background: icon?.bgColor }}>
              <IconBox {...icon} />
            </span>
          </Tooltip>
        </Popover>
        <Text
          style={{ width: 188, marginLeft: '8px' }}
          ellipsis={{
            tooltip: {
              title: title,
              placement: 'topRight',
              color: '#ffff',
              overlayInnerStyle: {
                color: '#354052',
                fontSize: '12px',
              },
            },
          }}
        >
          {title}
        </Text>
      </div>

      <div className="node-body">{children}</div>
      {NodeWidget && <div className="node-widget">{NodeWidget}</div>}
      {!hideDesc && !!desc && (
        <Paragraph
          ellipsis={{
            rows: 2,
            tooltip: {
              title: desc,
              placement: 'bottomRight',
              color: '#ffff',
              overlayInnerStyle: {
                color: '#354052',
                fontSize: '12px',
              },
            },
          }}
          className="node-desc"
        >
          {desc}
        </Paragraph>
      )}
    </div>
  );
});
