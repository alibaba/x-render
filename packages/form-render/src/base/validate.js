/**
 * Created by Tw93 on 2018-09-04.
 * 校验表单格式
 */

import isLength from 'validator/lib/isLength';
import Color from 'color';
import { isHidden } from './isHidden';
import {
  hasRepeat,
  isFunction,
  baseGet,
  convertValue,
  isEmail,
  isUrl,
} from './utils';

const isNotEmpty = val => [undefined, null].indexOf(val) === -1;

const isEmptyObject = obj =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

// 值是是否为空
const isEmptyValue = (value, schema) => {
  // 多选组件的值为 [] 时，也判断为空值
  if (schema.type === 'array' && schema.enum) {
    return !value || value.length === 0;
  }
  // boolean里的false, number里的0, 都不要认为是空值
  if (value === 0 || value === false) {
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
    minLength, // string
    maxLength, // string
    minimum, // number
    maximum, // number
    minItems, // list
    maxItems, // list
    uniqueItems, // list
    'ui:widget': widget,
    'ui:options': options,
  } = schema;
  // TODO: 这里要不要把 null 算进去呢？感觉算进去更合理一点
  let finalValue = [undefined, null].indexOf(value) > -1 ? defaultValue : value;
  // fix: number = 0 返回空字符串
  if (type === 'number' && value === 0) {
    finalValue = 0;
  }
  const usePattern = pattern && ['string', 'number'].indexOf(type) > -1;
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
    // TODO： 考虑了下，目前先允许 string 类的填入值是 undefined null 和 数字，校验的时候先转成 string
    let _finalValue = finalValue;
    if (typeof finalValue !== 'string') {
      if (finalValue === null || finalValue === undefined) {
        _finalValue = '';
      } else {
        _finalValue = String(finalValue);
        // return '内容不是字符串，请修改'; // 这里可以强制提示，但旧项目有修改成本
      }
    }
    // TODO: 为了一个 isLength 去引入一个包有点过分了，有空自己改写一下，而且 antd 用的 async-validator，是不是可以考虑看看

    // 添加检查，是否两侧有空格
    const noTrim = options && options.noTrim; // 配置项，不需要trim
    const trimedValue = _finalValue.trim();
    if (trimedValue !== _finalValue && !noTrim) {
      return (message && message.trim) || `输入的内容有多余空格`;
    }
    if (_finalValue && maxLength) {
      if (!isLength(_finalValue, 0, parseInt(maxLength, 10))) {
        return (message && message.maxLength) || `长度不能大于 ${maxLength}`;
      }
    }
    if (_finalValue && (minLength || minLength === 0)) {
      if (
        !_finalValue ||
        !isLength(_finalValue, parseInt(minLength, 10), undefined)
      ) {
        return (message && message.minLength) || `长度不能小于 ${minLength}`;
      }
    }
    // TODO: 为了一个Color引入了一个挺大的包，可以优化
    if (format === 'color' || widget === 'color') {
      try {
        Color(finalValue || null); // 空字符串无法解析会报错，出现空的情况传 null
      } catch (e) {
        return '请填写正确的颜色格式';
      }
    }
    if (format === 'image') {
      const imagePattern =
        '([/|.|w|s|-])*.(?:jpg|gif|png|bmp|apng|webp|jpeg|json)';
      // image 里也可以填写网络链接
      const _isUrl = isUrl(finalValue);
      const _isImg = new RegExp(imagePattern).test(finalValue);
      if (usePattern) {
      } else if (finalValue && !_isUrl && !_isImg) {
        return (message && message.image) || '请输入正确的图片格式';
      }
    }
    if (format === 'url') {
      if (usePattern) {
      } else if (finalValue && !isUrl(finalValue)) {
        return (message && message.url) || '请输入正确的url格式';
      }
    }

    if (format === 'email') {
      if (usePattern) {
      } else if (finalValue && !isEmail(finalValue)) {
        return (message && message.email) || '请输入正确的email格式';
      }
    }
  }

  // 数字相关校验
  if (type === 'number') {
    if (typeof finalValue !== 'number') {
      return '请填写数字';
    }
    if (maximum && parseFloat(finalValue, 10) > maximum) {
      return (message && message.maximum) || `数值不能大于 ${maximum}`;
    }
    if ((minimum || minimum === 0) && parseFloat(finalValue, 10) < minimum) {
      return (message && message.minimum) || `数值不能小于 ${minimum}`;
    }
  }

  // 正则只对数字和字符串有效果
  // finalValue 有值的时候才去算 pattern。从场景反馈还是这样好
  if (finalValue && usePattern && !new RegExp(pattern).test(finalValue)) {
    return (message && message.pattern) || '格式不匹配';
  }

  // 数组项目相关校验
  if (type === 'array') {
    if (maxItems && finalValue && finalValue.length > maxItems) {
      return (message && message.maxItems) || `数组长度不能大于 ${maxItems}`;
    }

    if (
      (minItems || minItems === 0) &&
      finalValue &&
      finalValue.length < minItems
    ) {
      return (message && message.minItems) || `数组长度不能小于 ${minItems}`;
    }

    if (uniqueItems && Array.isArray(finalValue) && finalValue.length > 1) {
      if (typeof uniqueItems === 'boolean') {
        if (hasRepeat(finalValue)) {
          return '存在重复元素';
        }
      }
      if (typeof uniqueItems === 'string') {
        try {
          const nameList = finalValue.map(item => baseGet(item, uniqueItems));
          // 只考虑非object的情况
          const isRepeat = nameList.find(
            (x, index) => nameList.indexOf(x) !== index
          );
          if (isRepeat) {
            return uniqueItems + ' 的值存在重复的';
          }
        } catch (e) {}
      }
    }
  }

  return false;
};

export const dealTypeValidate = (key, value, schema = {}, _formData) => {
  const checkList = [];
  const { type, items } = schema;
  const obj = {
    value,
    schema,
  };
  if (type === 'object') {
    const list = getValidateList(value, schema, _formData); // eslint-disable-line
    checkList.push(...list);
  } else if (type === 'array') {
    value.forEach(v => {
      const list = dealTypeValidate(key, v, items, _formData);
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

export const getValidateList = (val = {}, schema = {}, formData) => {
  const _formData = formData || val;
  const checkList = [];
  const { properties, required } = schema;
  // 校验必填（required 属性只在 type:object 下存在）
  if (required && required.length > 0) {
    required.forEach(key => {
      const schema = (properties && properties[key]) || {};
      const hidden = keyHidden(schema, val);
      const _hidden = convertValue(hidden, _formData, val);
      const itemValue = val && val[key];
      if (isEmptyValue(itemValue, schema) && !_hidden) {
        checkList.push(key);
      }
    });
  }

  if (properties && val && Object.keys(val) && Object.keys(val).length > 0) {
    Object.keys(val).forEach(key => {
      const value = val[key];
      const schema = properties[key] || {};
      const hidden = keyHidden(schema, val);
      const _hidden = convertValue(hidden, _formData, val);
      if (!_hidden) {
        const list = dealTypeValidate(key, value, schema, _formData);
        checkList.push(...list);
      }
    });
  }

  return checkList;
};
