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
  storeMethod?: any;
}

/**
 * 折叠面板
 */
const FCollapse = (props: IProps) => {
  const { data, header, childSchema, storeMethod, ...collapseProps } = props;
  const sourceData = storeMethod.getSourceData();

  let loading = false;
  if (!sourceData || !Object.keys(sourceData).length) {
    loading = true;
  }

  const content = storeMethod.renderer({ schema: childSchema, data, storeMethod, showEmpty: true });

  return (
    <BaseCollapse
      header={storeMethod.renderer({ schema: header, data, storeMethod })}
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
