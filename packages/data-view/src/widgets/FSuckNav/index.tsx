import React from 'react';
import { combineClass } from '../utils/common';
import Tabs from '../components/SuckTabs';

/**
 *
 * 自定义 Tabs组件
 */
const FSuckNav = (props: any) => {
  const {
    scrollContainer,
    items = [],
    tabsId = 'tab',
    startY = 68,
    className,
    style,
    fixed = true,
    addons,
    ...otherProps
  } = props;

  const childSchema: any[] = [];
  const tabs = items.map((item: any) => {
    const { children, ...otherItem } = item;
    childSchema.push(children);
    return otherItem;
  });

  return (
    <Tabs
      className={className}
      tabsId={tabsId}
      tabs={tabs}
      startY={startY}
      fixed={fixed}
      style={style}
      scrollContainer={scrollContainer}
    >
      {childSchema.map((item: any, index: number) =>
        addons.renderer({ key: index, schema: item, addons, ...otherProps }),
      )}
    </Tabs>
  );
};

export default FSuckNav;
