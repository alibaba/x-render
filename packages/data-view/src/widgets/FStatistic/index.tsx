import React from 'react';
import { Statistic } from 'antd';
import type { StatisticProps } from 'antd';
import { combineClass, isReactNodeSchema, isType } from '../utils/common';

interface FStatisticProps extends Omit<StatisticProps, 'value'> {
  data: any;
  storeMethod: Record<string, (...params: any) => any>;
}

const FStatistic: React.FC<FStatisticProps> = (props) => {
  const { className, data, storeMethod, style, formatter, title, suffix, prefix, ...restProps } =
    props;

  let titleNode = title;
  let suffixNode = suffix;
  let prefixNode = prefix;

  if (isReactNodeSchema(title)) {
    titleNode = storeMethod.renderer({ schema: title, data, storeMethod });
  }

  if (isReactNodeSchema(suffix)) {
    suffixNode = storeMethod.renderer({ schema: suffix, data, storeMethod });
  }

  if (isReactNodeSchema(prefix)) {
    prefixNode = storeMethod.renderer({ schema: prefix, data, storeMethod });
  }

  const handleFormatter = (value: any) => {
    let result = value;
    if (formatter) {
      const func = storeMethod.getMethod(formatter);
      result = func(value);
    }

    return result;
  };

  return (
    <Statistic
      className={combineClass('dtv-statistic', className)}
      style={style}
      value={isType(data, ['number', 'string']) ? data : 0}
      title={titleNode}
      suffix={suffixNode}
      prefix={prefixNode}
      formatter={handleFormatter}
      {...restProps}
    />
  );
};

export default FStatistic;
