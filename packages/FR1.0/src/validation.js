// 这个组件已经没用了，可以删了 TODO:

import { isObject } from './utils';

export const validateSingleRule = (rule, value) => {
  if (isObject(rule)) {
    if (rule.required === true) {
      if (value) return;
      return rule.message || `it is required`;
    }
    if (value === undefined || value === null) return;
    // 按一个个rule来写比较快
    if (!Number.isNaN(Number(rule.min))) {
      switch (typeof value) {
        case 'number':
          if (value <= rule.min) return rule.message || '太短';
          break;
        case 'string':
          if (value.length <= rule.min) return rule.message || '太短';
          break;
        default:
          break;
      }
      return;
    }
    if (!Number.isNaN(Number(rule.max))) {
      switch (typeof value) {
        case 'number':
          if (value > rule.max) return rule.message || '太长';
          break;
        case 'string':
          if (value.length > rule.max) return rule.message || '太长';
          break;
        default:
          break;
      }
      return;
    }
  }
};
