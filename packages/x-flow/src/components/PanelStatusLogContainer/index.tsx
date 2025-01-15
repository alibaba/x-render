import { Drawer, Popover } from 'antd';
import classNames from 'classnames';
import { isNumber } from 'lodash';
import React, { FC, useContext, useMemo } from 'react';
import { ConfigContext } from '../../models/context';
import createIconFont from '../../utils/createIconFont';
import IconView from '../IconView';
import TitleMenuTooltip from '../NodeContainer/TitleMenuTooltip';
import './index.less';

interface IPanelProps {
  nodeType: string;
  onClose: () => void;
  id: string;
  data: any; // data值
  children?: any;
}

const PanelStatusLogContainer: FC<IPanelProps> = (props: IPanelProps) => {
  const { onClose, children, nodeType } = props;
  // 1.获取节点配置信息
  const {
    settingMap,
    iconFontUrl,
    globalConfig,
    logPanel,
    widgets,
    antdVersion,
  }: any = useContext(ConfigContext);
  const nodeSetting = settingMap[nodeType] || {};
  const { nodePanel, iconSvg } = nodeSetting;

  const Icon = useMemo(() => createIconFont(iconFontUrl), [iconFontUrl]);
  const CustomWidget = widgets[logPanel?.logWidget]; // 内置setting组件
  const isCustomWidget = !Boolean(logPanel?.logWidget && CustomWidget);
  const width =isNumber(logPanel?.width) ? logPanel?.width : 400;

  const drawerVersionProps = useMemo(() => {
    if (antdVersion === 'V5') {
      return {
        rootClassName: classNames('node-log-panel', {
          'no-header-line': isCustomWidget,
        }),
        open: true,
      };
    }
    // V4
    return {
      className: classNames('node-log-panel', {
        'no-header-line': isCustomWidget,
      }),
      visible: true,
    };
  }, []);

  return (
    <Drawer
      {...drawerVersionProps}
      getContainer={false}
      width={width}
      mask={false}
      onClose={onClose}
      headerStyle={{
        paddingBottom: '12px',
      }}
      style={{
        position: 'absolute',
      }}
      title={
        <>
          <div className="title-box">
            <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <Popover
                overlayClassName="nodes-popover"
                content={
                  <TitleMenuTooltip
                    {...nodeSetting}
                    iconFontUrl={iconFontUrl}
                  />
                }
                placement="bottom"
                trigger="hover"
                getPopupContainer={() =>
                  document.getElementById('xflow-container') as HTMLElement
                }
                overlayInnerStyle={{ padding: '12px 16px' }}
              >
                <span
                  className="icon-box"
                  style={{
                    background: nodeSetting?.icon?.bgColor || '#F79009',
                  }}
                >
                  {iconSvg ? (
                    iconSvg
                  ) : (
                    <Icon
                      style={{ fontSize: 14, color: '#fff' }}
                      type={nodeSetting?.icon?.type}
                    />
                  )}
                </span>
              </Popover>
              <span className="title-content">执行日志</span>
            </div>
            <div className="title-actions">
              <IconView
                type="icon-remove"
                style={{ fontSize: 16 }}
                onClick={onClose}
              />
            </div>
          </div>
        </>
      }
    >
      {children}
    </Drawer>
  );
};

export default React.memo(PanelStatusLogContainer);
