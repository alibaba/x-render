/**
 * Created by Tw93 on 2019-12-07.
 * 抽离高阶日期组件
 */

import React from 'react';
import moment from 'moment';
import { getFormat } from '../base/utils';

export default (p, onChange) => RangeComponent => {
  return class extends React.Component {
    render() {
      // 只读模式
      // if (p.readonly) {
      //   if (Array.isArray(p.value)) {
      //     const from = p.value[0] || '';
      //     const to = p.value[1] || '';
      //     return <span>{`${from} ~ ${to}`}</span>;
      //   }
      //   return <span>-</span>;
      // }
      const { format = 'dateTime' } = p.schema;
      const dateFormat = getFormat(format);
      let defaultObj = {};
      if (p.value && Array.isArray(p.value) && p.value[0] && p.value[1]) {
        defaultObj = {
          defaultValue: [
            moment(p.value[0], dateFormat),
            moment(p.value[1], dateFormat),
          ],
        };
      }
      const datePrams = {
        ...p.options,
        ...defaultObj,
        style: { width: '100%' },
        showTime: format === 'dateTime',
        disabled: p.disabled || p.readonly,
        onChange,
      };
      return <RangeComponent {...datePrams} />;
    }
  };
};
