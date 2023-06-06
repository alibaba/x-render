import React, { FC, isValidElement } from 'react';
import { Tag } from 'antd';
import { get } from 'lodash-es';
import { combineClass, transformData } from '../utils/common';
import InnerHtml from '../components/InnerHtml';

const renderTag = (tagProps: any, storeMethod: any) => (data: any, index: number) => {
  const { dataKey, format, ...otherProps } = tagProps || {};
  let value = data;
  if (dataKey) {
    value = get(data, dataKey, null);
  }

  // 数据进行格式化
  if (['html'].includes(format?.type)) {
    value = <InnerHtml data={value} />;
  } else {
    value = transformData(value, format, storeMethod);
  }

  if (!value || (typeof value === 'object' && !isValidElement(value))) {
    return null;
  }

  return (
    <Tag key={index} {...otherProps}>
      {value}
    </Tag>
  );
};

const FTags: FC = (props: any) => {
  const { className, style, data, tagProps, storeMethod } = props;

  let list = data || [];

  if (!Array.isArray(list)) {
    list = [data];
  }

  return (
    <div className={combineClass('dtv-tags', className)} style={style}>
      {list.map(renderTag(tagProps, storeMethod))}
    </div>
  );
};

export default FTags;
