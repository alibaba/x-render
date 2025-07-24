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
    style,
    gradientHeight: _gradientHeight,
  } = props;
  const IconBox = useMemo(() => createIconFont(iconFontUrl), [iconFontUrl]);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const renderDesc = () => (
    <>
      {!hideDesc && !!desc && (
        <TextEllipsis
          text={desc}
          rows={2}
          type="paragraph"
          className="node-desc"
        />
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

  const hasBody = !!children;
  const hasDesc = !!desc && !hideDesc;
  const gradientHeight = _gradientHeight || (hasBody || hasDesc || NodeWidget ? '20%' : '100%');
  debugger;

  return (
    <div
      ref={containerRef}
      className={classNames('custom-node-container', {
        [className]: !!className,
      })}
      onClick={onClick}
    >
      {/* 渐变头部，动态高度 */}
      <div
        className="node-gradient-header"
        style={{
          '--gradient-height': gradientHeight,
          ...style,
        }}
      />
      <div className="node-title" style={{ position: 'relative', zIndex: 1 }}>
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
      <div className="node-body-desc">{renderDescAndNodeWidget()}</div>
    </div>
  );
});
