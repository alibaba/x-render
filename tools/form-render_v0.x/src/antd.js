/**
 * Created by Tw93 on 2018-08-28.
 * antd 主题入口文件
 */

import { ConfigProvider } from 'antd';
import 'antd/dist/antd.less';
import zhCN from 'antd/lib/locale/zh_CN';
import React, { forwardRef } from 'react';
import FormRender from './index';
import {
  mapping as defaultMapping,
  widgets as defaultWidgets,
} from './widgets/antd';

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
