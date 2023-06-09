import React from 'react';
import { Progress } from 'antd';
import type { ProgressProps } from 'antd';
import { combineClass, isType } from '../utils/common';

interface FProgressBarProps extends Omit<ProgressProps, 'formatFunc' | 'percent'> {
  /** 内容的模版函数的 Key */
  formatFunc: string;
  data: any;
  addons: Record<string, (...params: any) => any>;
}

const FProgressBar: React.FC<FProgressBarProps> = (props) => {
  const { className, style, formatFunc, addons, data, ...restProps } = props;

  const handleformatFunc = (percent?: number, successPrecent?: number) => {
    if (formatFunc) {
      const func = addons.getMethod(formatFunc);
      if (typeof func === 'function') {
        return func(percent, successPrecent);
      }
    }

    return percent + '%';
  };

  return (
    <Progress
      className={combineClass('dtv-progess', className)}
      style={style}
      format={formatFunc ? handleformatFunc : undefined}
      percent={isType(data, ['number', 'string']) ? data : 0}
      {...restProps}
    />
  );
};

export default FProgressBar;
