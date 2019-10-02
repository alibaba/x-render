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

export function isHidden({ hidden, rootValue } = {}) {
  // hidden 为表达式：
  if (typeof hidden === 'string') {
    // 支持 && 和 ||
    const hasAnd = string => string.indexOf('&&') > -1;
    const hasOr = string => string.indexOf('||') > -1;
    let hiddenList = [];
    if (!hasOr(hidden)) {
      if (!hasAnd(hidden)) {
        return calcHidden(hidden, rootValue);
      } else {
        hiddenList = hidden.split('&&').map(item => item.trim());
        return hiddenList.every(item => calcHidden(item, rootValue));
      }
    } else {
      hiddenList = hidden.split('||').map(item => item.trim());
      if (!hasAnd(hidden)) {
        return hiddenList.some(item => calcHidden(item, rootValue));
      } else {
        return hiddenList.some(item => {
          if (hasAnd(item)) {
            const list = item.split('&&').map(item => item.trim());
            return list.every(x => calcHidden(x, rootValue));
          } else {
            return calcHidden(item, rootValue);
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

// 计算单个表达式的hidden值
const calcHidden = (hiddenString, rootValue) => {
  if (!rootValue || typeof rootValue !== 'object') {
    return false;
  }
  // 支持四种基本运算符
  const operators = ['==', '!=', '>', '<'];
  try {
    const op = operators.find(op => hiddenString.indexOf(op) > -1);
    const [key, value] = hiddenString.split(op).map(item => item.trim());
    const left = rootValue[key];
    const right = parseString(value);
    return parseString(`"${String(left)}"${op}"${String(right)}"`);
  } catch (e) {
    console.error(e);
  }
  return false;
};
