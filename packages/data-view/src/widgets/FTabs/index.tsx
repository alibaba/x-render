import React from 'react';
import { Tabs } from 'antd';
import { combineClass } from '../utils/common';

const { TabPane } = Tabs;

const FTabList: React.FC = (props: any) => {
  const { className, style, items = [], data, addons } = props;

  return (
    <Tabs className={combineClass('dv-tabs', className)} defaultActiveKey="0" style={style}>
      {items.map((item: any, index: number) => (
        <TabPane tab={item.label} key={index} style={{ paddingTop: '16px' }}>
          {addons.renderer({ schema: item.children, data, addons })}
        </TabPane>
      ))}
    </Tabs>
  );
};

export default FTabList;
