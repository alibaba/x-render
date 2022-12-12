import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale/zh_CN';
import React, { FC, ReactNode } from 'react';
import { createStore, Provider } from '../../utils/store';

const ChartProvider: FC<{ children?: ReactNode }> = ({ children }) => (
  <ConfigProvider locale={zh_CN}>
    {/* @ts-ignore */}
    <Provider createStore={createStore}>{children}</Provider>
  </ConfigProvider>
);

// @ts-ignore
const withChart = Component => props => {
  return (
    <ChartProvider>
      <Component {...props} />
    </ChartProvider>
  );
};

export { ChartProvider, withChart };
