import classNames from 'classnames';
import React, { CSSProperties, FC, memo } from 'react';
import './index.less';

const ChartContainer: FC<{
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}> = ({ children, className, style }) => (
  <div className={classNames('cr-chart-container', className)} style={style}>
    {children}
  </div>
);

export default memo(ChartContainer);
