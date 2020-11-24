/**
 * Created by Tw93 on 2018-08-28.
 * fusion 主题入口文件
 */

import React, { forwardRef } from 'react';
import FormRender from './index';
import {
  mapping as defaultMapping,
  widgets as defaultWidgets,
} from './widgets/fusion';

const FusionForm = ({ mapping = {}, widgets = {}, ...rest }, ref) => {
  return (
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
  );
};

export default forwardRef(FusionForm);
