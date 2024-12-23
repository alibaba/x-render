import { Popover, Typography } from 'antd';
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
    iconSvg,
    hideTitleTips,
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
        {!hideTitleTips ? (
          <Popover
            content={<MenuTooltip {...props} />}
            placement="bottomLeft"
            trigger="hover"
            getPopupContainer={() =>
              document.getElementById('xflow-container') as HTMLElement
            }
          >
            <span className="icon-box" style={{ background: icon?.bgColor }}>
              {iconSvg ? iconSvg : <IconBox {...icon} />}
            </span>
          </Popover>
        ) : (
          <span className="icon-box" style={{ background: icon?.bgColor }}>
            {iconSvg ? iconSvg : <IconBox {...icon} />}
          </span>
        )}
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
              getPopupContainer: () =>
                document.getElementById('xflow-container') as HTMLElement,
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
              getPopupContainer: () =>
                document.getElementById('xflow-container') as HTMLElement,
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
