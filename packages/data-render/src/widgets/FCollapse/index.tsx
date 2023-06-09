import React from 'react';
import { Skeleton, Empty } from 'antd';
import BaseCollapse from '../components/BaseCollapse';

interface IProps {
  data: any;
  childSchema: any[];
  title: string;
  header?: any[];
  className?: any;
  style?: object;
  addons?: any;
}

/**
 * 折叠面板
 */
const FCollapse = (props: IProps) => {
  const { data, header, childSchema, addons, ...collapseProps } = props;
  const sourceData = addons.getSourceData();

  let loading = false;
  if (!sourceData || !Object.keys(sourceData).length) {
    loading = true;
  }

  const content = addons.renderer({ schema: childSchema, data, addons, showEmpty: true });

  return (
    <BaseCollapse
      header={addons.renderer({ schema: header, data, addons })}
      {...collapseProps}
    >
      <Skeleton active loading={loading}>
        {content || (
          <Empty image="https://img.alicdn.com/imgextra/i2/O1CN01zkSBPx1w25lRyCZz0_!!6000000006249-55-tps-94-61.svg" />
        )}
      </Skeleton>
    </BaseCollapse>
  );
};

export default FCollapse;
