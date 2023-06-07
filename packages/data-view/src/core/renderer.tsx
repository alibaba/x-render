import React from 'react';
import { Empty, Skeleton } from 'antd';
import { get } from 'lodash-es';
import decorator from '../models/resolver';

// 对 schema 进行处理
const transformSchema = (schema: any, data: any) => {
  if (!schema || typeof schema !== 'object') {
    return [];
  }

  const arrayList = Array.isArray(schema) ? schema : [schema];

  // 处理 repeat 组件按数据多次进行展示
  const result: any[] = [];
  arrayList.forEach((widget: any) => {
    const { repeat, ...ohterProps } = widget;

    // 不存在多次展示，直接返回
    if (!repeat) {
      result.push(widget);
      return;
    }

    // 如果 repeat 是数组，直接根据 repeat 数据进行展示
    if (Array.isArray(repeat)) {
      repeat.forEach((item: any) => {
        result.push({ ...ohterProps, ...item });
      });
      return;
    }

    if (repeat.dataKey) {
      const array = get(data, repeat.dataKey, []);
      array.forEach((item: any) => {
        result.push({ ...ohterProps, data: item });
      });
    }

    if (Array.isArray(data)) {
      data.forEach((_, index: number) => {
        result.push({ ...ohterProps, repeatIndex: index });
      });
    }
  });

  return result;
};

/**
 * 渲染器
 */
export default (props: any): any => {
  const { schema, data, addons, showEmpty } = props;
  const List = transformSchema(schema, data);

  const componentList = List.map((item: any, index: number) => {
    let currData = data;
    if ((data && item.repeatIndex) || item.repeatIndex === 0) {
      currData = data[item.repeatIndex];
    }
    const componentInfo = decorator(item, currData, addons);

    if (!componentInfo) {
      return;
    }

    const { component: Component, componentData, componentProps, asyncComptProps } = componentInfo;

    return (
      <Component
        key={index}
        {...componentProps}
        data={componentData}
        {...asyncComptProps}
        addons={{
          ...addons,
          dataKey: item.dataKey,
          getParentData: () => {
            return currData;
          }
        }}
      />
    );
  });

  if (componentList.length === 0) {
    if (showEmpty) {
      return (
        <Skeleton active loading={!addons.getSourceData()}>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </Skeleton>
      );
    }
    return null;
  }

  return componentList;
};
