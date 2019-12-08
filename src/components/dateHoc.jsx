/**
 * Created by Tw93 on 2019-12-07.
 * 抽离高阶日期组件
 */

import React from 'react';
import moment from 'moment';
import { getFormat } from '../base/utils';

export default (p, onChange) => DateComponent => {
  return class extends React.Component {
    render() {
      const { format = 'dateTime' } = p.schema;
      const dateFormat = getFormat(format);
      let defaultObj = {};
      if (p.value) {
        defaultObj = {
          value: moment(p.value, dateFormat),
        };
      }

      const placeholderObj = p.description
        ? { placeholder: p.description }
        : {};

      const datePrams = {
        ...placeholderObj,
        ...p.options,
        ...defaultObj,
        style: { width: '100%' },
        showTime: format === 'dateTime',
        disabled: p.disabled,
        onChange,
      };
      return <DateComponent {...datePrams} />;
    }
  };
};
