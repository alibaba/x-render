import { RightOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSet, useStore } from '../../utils/hooks';
import GlobalSettings from './GlobalSettings';
import './index.less';
import ItemSettings from './ItemSettings';

const { TabPane } = Tabs;

export default function Settings({ widgets }) {
  const { t } = useTranslation();
  const [state, setState] = useSet({
    tabsKey: 'globalSettings',
    showRight: true,
    showItemSettings: false,
  });
  const { selected, userProps = {} } = useStore();
  const { tabsKey, showRight, showItemSettings } = state;

  const toggleRight = () => setState({ showRight: !showRight });

  const ToggleIcon = () => (
    <div
      className="absolute top-0 left-0 pointer"
      style={{ height: 30, width: 30, padding: '8px 0 0 8px' }}
      onClick={toggleRight}
    >
      <RightOutlined style={{color: '#666'}} />
    </div>
  );

  const HideRightArrow = () => (
    <div
      className="absolute right-0 top-0 h2 flex-center"
      style={{ width: 40, transform: 'rotate(180deg)' }}
    >
      <ToggleIcon />
    </div>
  );

  // 如果没有选中任何item，或者是选中了根节点，object、list的内部，显示placeholder
  useEffect(() => {
    if ((selected && selected[0] === '0') || selected === '#' || !selected) {
      setState({ tabsKey: 'globalSettings', showItemSettings: false });
    } else {
      setState({ tabsKey: 'itemSettings', showItemSettings: true });
    }
  }, [selected]);

  const globalSettingHide =
    userProps.globalSettings === null ||
    (userProps.globalSettings && !Object.keys(userProps.globalSettings).length);

  return showRight ? (
    <div className="right-layout relative pl2">
      <ToggleIcon />
      <Tabs activeKey={tabsKey} onChange={key => setState({ tabsKey: key })}>
        {showItemSettings && (
          <TabPane tab={t("组件配置")} key="itemSettings">
            <ItemSettings widgets={widgets} />
          </TabPane>
        )}
        {!globalSettingHide && (
          <TabPane tab="表单配置" key="globalSettings">
            <GlobalSettings widgets={widgets} />
          </TabPane>
        )}
      </Tabs>
    </div>
  ) : (
    <HideRightArrow />
  );
}
