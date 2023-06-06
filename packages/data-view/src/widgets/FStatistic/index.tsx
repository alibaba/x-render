import React from 'react';
import { Statistic } from 'antd';
import type { StatisticProps } from 'antd';
import { combineClass, isReactNodeSchema, isType } from '../utils/common';

interface FStatisticProps extends Omit<StatisticProps, 'value'> {
  data: any;
  addons: Record<string, (...params: any) => any>;
}

const FStatistic: React.FC<FStatisticProps> = (props) => {
  const { className, data, addons, style, formatter, title, suffix, prefix, ...restProps } =
    props;

  let titleNode = title;
  let suffixNode = suffix;
  let prefixNode = prefix;

  if (isReactNodeSchema(title)) {
    titleNode = addons.renderer({ schema: title, data, addons });
  }

  if (isReactNodeSchema(suffix)) {
    suffixNode = addons.renderer({ schema: suffix, data, addons });
  }

  if (isReactNodeSchema(prefix)) {
    prefixNode = addons.renderer({ schema: prefix, data, addons });
  }

  const handleFormatter = (value: any) => {
    let result = value;
    if (formatter) {
      const func = addons.getMethod(formatter);
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
