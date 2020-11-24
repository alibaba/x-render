/**
 * Created by Tw93 on 2018-08-28.
 * antd 主题入口文件
 */

import React, { forwardRef } from 'react';
import FormRender from './index';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import {
  mapping as defaultMapping,
  widgets as defaultWidgets,
} from './widgets/antd';
// import 'antd/dist/antd.css';

const AntdForm = (
  { mapping = {}, widgets = {}, configProvider = {}, ...rest },
  ref
) => {
  return (
    <ConfigProvider {...configProvider} locale={zhCN}>
      <FormRender
        mapping={{
          ...defaultMapping,
          ...mapping,
        }}
        widgets={{
          ...defaultWidgets,
          ...widgets,
        }}
        {...rest}
        forwardedRef={ref}
      />
    </ConfigProvider>
  );
};

export default forwardRef(AntdForm);
