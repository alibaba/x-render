/**
 * Created by Tw93 on 2018-09-04.
 * 校验表单格式
 */

import isLength from 'validator/lib/isLength';
import Color from 'color';
import { isHidden } from './isHidden';
import { hasRepeat, isFunction } from './utils';

const isEmptyObject = obj =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

// 值是是否为空
const isEmptyValue = (value, schema) => {
  // 多选组件的值为 [] 时，也判断为空值
  if (schema.type === 'array' && schema.enum) {
    return !value || value.length === 0;
  }
  if (value === 0) {
    return false;
  }
  return !value;
};

export const getValidateText = (obj = {}) => {
  const { value, defaultValue, required, schema = {} } = obj;

  const {
    type,
    pattern,
    message,
    format,
    'ui:widget': widget,
    minLength, // string
    maxLength, // string
    minimum, // number
    maximum, // number
    minItems, // list
    maxItems, // list
    uniqueItems, // list
  } = schema;
  let finalValue = value || defaultValue;
  // fix: number = 0 返回空字符串
  if (type === 'number' && value === 0) {
    finalValue = 0;
  }
  const needPattern = pattern && ['string', 'number'].indexOf(type) > -1;
  // schema 里面没有内容的，直接退出
  if (isEmptyObject(schema)) {
    return false;
  }

  // 校验是否为required
  if (required && isEmptyValue(finalValue, schema)) {
    return (message && message.required) || '不能为空';
  }
  // 字符串相关校验
  if (type === 'string') {
    if (finalValue && maxLength) {
      if (!isLength(finalValue, 0, parseInt(maxLength, 10))) {
        return (message && message.maxLength) || `长度不能大于 ${maxLength}`;
      }
    }
    if (finalValue && (minLength || minLength === 0)) {
      if (
        !finalValue ||
        !isLength(finalValue, parseInt(minLength, 10), undefined)
      ) {
        return (message && message.minLength) || `长度不能小于 ${minLength}`;
      }
    }

    if (format === 'color' || widget === 'color') {
      try {
        // if (!finalValue) return '请填写正确的颜色格式';
        Color(finalValue);
      } catch (e) {
        return '请填写正确的颜色格式';
      }
    }
  }

  // 数字相关校验
  if (type === 'number') {
    if (typeof finalValue !== 'number') {
      return '请填写数字';
    }
    if (maximum && parseInt(finalValue, 10) > maximum) {
      return (message && message.maximum) || `数值不能大于 ${maximum}`;
    }
    if ((minimum || minimum === 0) && parseInt(finalValue, 10) < minimum) {
      return (message && message.minimum) || `数值不能小于 ${minimum}`;
    }
  }

  // 正则只对数字和字符串有效果
  if (finalValue && needPattern && !new RegExp(pattern).test(finalValue)) {
    return (message && message.pattern) || '格式不匹配';
  }

  // 数组项目相关校验
  if (type === 'array') {
    if (maxItems && finalValue && finalValue.length > maxItems) {
      return (message && message.maxItems) || `组数长度不能大于 ${maxItems}`;
    }

    if (
      (minItems || minItems === 0) &&
      finalValue &&
      finalValue.length < minItems
    ) {
      return (message && message.minItems) || `组数长度不能小于 ${minItems}`;
    }

    if (uniqueItems && Array.isArray(finalValue) && finalValue.length > 1) {
      if (typeof uniqueItems === 'boolean') {
        if (hasRepeat(finalValue)) {
          return '存在重复元素';
        }
      }
      if (typeof uniqueItems === 'string') {
        const nameList = finalValue.map(item => item[uniqueItems]);
        const isRepeat = nameList.find(
          (x, index) => nameList.indexOf(x) !== index
        );
        if (isRepeat) {
          return '存在重复的 ' + uniqueItems + ' 值';
        }
      }
    }
  }

  return false;
};

export const dealTypeValidate = (key, value, schema = {}) => {
  const checkList = [];
  const { type, items } = schema;
  const obj = {
    value,
    schema,
  };
  if (type === 'object') {
    const list = getValidateList(value, schema); // eslint-disable-line
    checkList.push(...list);
  } else if (type === 'array') {
    value.forEach(v => {
      const list = dealTypeValidate(key, v, items);
      checkList.push(...list);
    });
  }
  if (getValidateText(obj)) {
    checkList.push(key);
  }
  return checkList;
};

// for backward compatibility
const keyHidden = (schema, val) => {
  let hidden = schema && schema['ui:hidden'];
  if (typeof hidden === 'string' && isFunction(hidden) === false) {
    hidden = isHidden({ hidden, rootValue: val });
  }
  return hidden;
};

export const getValidateList = (val = {}, prop = {}) => {
  const checkList = [];
  const { properties, required } = prop;
  // 校验必填（required 属性只在 type:object 下存在）
  if (required && required.length > 0) {
    required.forEach(key => {
      const schema = (properties && properties[key]) || {};
      const hidden = keyHidden(schema, val);
      const itemValue = val && val[key];
      if (isEmptyValue(itemValue, schema) && !hidden) {
        checkList.push(key);
      }
    });
  }

  if (properties && val && Object.keys(val) && Object.keys(val).length > 0) {
    Object.keys(val).forEach(key => {
      const value = val[key];
      const schema = properties[key] || {};
      const hidden = keyHidden(schema, val);
      if (!hidden) {
        const list = dealTypeValidate(key, value, schema);
        checkList.push(...list);
      }
    });
  }

  return checkList;
};
