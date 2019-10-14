/**
 * Created by Tw93 on 2019-04-28.
 * 表达式判断
 */

import { pope } from 'pope';

export function isDependShow({ formData, dependShow } = {}) {
  if (formData && dependShow) {
    try {
      return !parseString(pope(dependShow, formData)); //eslint-disable-line
    } catch (e) {
      console.error(e);
    }
  }
}

export function isHidden({ hidden, rootValue, formData } = {}) {
  // hidden 为表达式：
  if (typeof hidden === 'string') {
    // 支持 && 和 ||
    const hasAnd = string => string.indexOf('&&') > -1;
    const hasOr = string => string.indexOf('||') > -1;
    let hiddenList = [];
    if (!hasOr(hidden)) {
      if (!hasAnd(hidden)) {
        return calcHidden(hidden, rootValue, formData);
      } else {
        hiddenList = hidden.split('&&').map(item => item.trim());
        return hiddenList.every(item => calcHidden(item, rootValue, formData));
      }
    } else {
      hiddenList = hidden.split('||').map(item => item.trim());
      if (!hasAnd(hidden)) {
        return hiddenList.some(item => calcHidden(item, rootValue, formData));
      } else {
        return hiddenList.some(item => {
          if (hasAnd(item)) {
            const list = item.split('&&').map(item => item.trim());
            return list.every(x => calcHidden(x, rootValue, formData));
          } else {
            return calcHidden(item, rootValue, formData);
          }
        });
      }
    }
  }
  return hidden;
}

// 代替eval的函数
const parseString = string =>
  Function('"use strict";return (' + string + ')')();

// data = {a: b: {c: 1}}  getExpressionValue(data, 'a.b.c')
const getExpressionValue = (formData, expression) => {
  if (typeof expression !== 'string') return '';
  const keyList = expression.split('.') || [];
  if (keyList.length === 0) {
    return '';
  }
  if (keyList.length === 1) {
    return formData[keyList[0]];
  }
  return keyList.reduce((x, y) => {
    if (x && typeof x === 'object') return x[y];
    return '';
  }, formData);
};

// 计算单个表达式的hidden值
const calcHidden = (hiddenString, rootValue, formData) => {
  if (!rootValue || typeof rootValue !== 'object') {
    return false;
  }
  // 支持四种基本运算符
  const operators = ['==', '!=', '>', '<'];
  try {
    const op = operators.find(op => hiddenString.indexOf(op) > -1);
    const [key, value] = hiddenString.split(op).map(item => item.trim());
    let left = rootValue[key];
    // feature: 允许从 formData 取值
    if (key.substring(0, 9) === 'formData.' && formData) {
      const subKey = key.substring(9);
      left = getExpressionValue(formData, subKey);
    }
    const right = parseString(value);
    return parseString(`"${String(left)}"${op}"${String(right)}"`);
  } catch (e) {
    console.error(e);
  }
  return false;
};
