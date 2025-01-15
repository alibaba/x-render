import { Popover } from 'antd';
import classNames from 'classnames';
import React, { memo, useMemo } from 'react';
import createIconFont from '../../utils/createIconFont';
import TextEllipsis from '../TextEllipsis';
import './index.less';
import TitleMenuTooltip from './TitleMenuTooltip';

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
    isSwitchBottom,
    nodeSettingTitle,
  } = props;
  const IconBox = useMemo(() => createIconFont(iconFontUrl), [iconFontUrl]);

  const renderDesc = () => (
    <>
      {!hideDesc && !!desc && (
        <TextEllipsis text={desc} rows={2} type="paragraph" className='node-desc' />
      )}
    </>
  );

  const renderDescAndNodeWidget = () => {
    if (isSwitchBottom) {
      // 条件节点且为TB布局
      return (
        <>
          {renderDesc()}
          {NodeWidget && <div className="node-widget">{NodeWidget}</div>}
        </>
      );
    } else {
      return (
        <>
          {NodeWidget && <div className="node-widget">{NodeWidget}</div>}
          {renderDesc()}
        </>
      );
    }
  };

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
            overlayClassName="nodes-popover"
            content={<TitleMenuTooltip {...props} />}
            placement="bottomLeft"
            trigger="hover"
            getPopupContainer={() =>
              document.getElementById('xflow-container') as HTMLElement
            }
            overlayInnerStyle={{ padding: '12px 16px' }}
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
        <TextEllipsis text={title} style={{ width: 188, marginLeft: '8px' }} />
      </div>

      <div className="node-body">{children}</div>
      {renderDescAndNodeWidget()}
    </div>
  );
});
