import { getValueFromKey, parseString } from '../utils/common';

const hasAnd = (string: string) => string.includes('&&');
const hasOr = (string: string) => string.includes('||');
const getList = (string: string, operator: string) =>
  string.split(operator).map((item: string) => item.trim());

const operators = ['===', '==', '!=', '>', '<', 'has', '!has']; // 支持四种基本运算符

// 计算单个表达式的hidden值
const calculate = (str: string, data: any, addons: any) => {
  if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
    return false;
  }

  try {
    const operator: any = operators.find((item) => {
      let flag = str.indexOf(item) > -1;
      if (item === 'has' && str.indexOf('!has') > -1) {
        flag = false;
      }
      return flag;
    });

    let [left, right]: any = str
      .replace(/\s+/g, '')
      .split(operator)
      .map((item) => item.trim());

    if (left.includes('data:')) {
      left = getValueFromKey({
        data,
        path: left.replace(/data:/g, ''),
        defaultValue: right === undefined ? '' : 'left-null',
        addons,
      });
    } else if (left.includes('source:')) {
      left = getValueFromKey({
        data: addons.getSourceData(),
        path: left.replace(/source:/g, ''),
        defaultValue: right === undefined ? '' : 'left-null',
        addons,
      });
    }

    if (right === undefined) {
      return left;
    }

    if (right?.includes('data:')) {
      right = getValueFromKey({
        data,
        path: right.replace(/data:/g, ''),
        defaultValue: left === undefined ? '' : 'right-null',
        addons,
      });
    } else if (right?.includes('source:')) {
      right = getValueFromKey({
        data: addons.getSourceData(),
        path: left.replace(/source:/g, ''),
        defaultValue: left === undefined ? '' : 'right-null',
        addons,
      });
    }

    if (operator.includes('!has')) {
      try {
        if (!Array.isArray(left)) {
          left = JSON.parse(left);
        }

        left = left.map((item: any) => item + '');
        return !left.includes(`${right}`);
      } catch (error) {
        return false;
      }
    }

    if (operator.includes('has')) {
      try {
        if (!Array.isArray(left)) {
          left = JSON.parse(left);
        }
        left = left.map((item: any) => item + '');
        return left.includes(`${right}`);
      } catch (error) {
        return false;
      }
    }

    return parseString(`'${left}'${operator}'${right}'`);
  } catch (e) {
    console.error(e);
  }
  return false;
};

/**
 * 表达式判断
 */
export default (key: any, data: any, addons: any) => {
  let newKey = key;

  // 说明是函数表达式
  if (
    newKey.substring(0, 2) === '{{' &&
    newKey.substring(newKey.length - 2, newKey.length) === '}}'
  ) {
    newKey = newKey.substring(2, newKey.length - 2);
  }

  // 相等，说明不是函数表达式
  if (newKey === key || operators.every((item) => !newKey.includes(item))) {
    return !getValueFromKey({ data, path: newKey, defaultValue: false, addons });
  }

  // 两种运算符都不存在
  if (!hasOr(newKey) && !hasAnd(newKey)) {
    return !calculate(newKey, data, addons);
  }

  // 只有 && 运算符
  if (!hasOr(newKey) && hasAnd(newKey)) {
    return !getList(newKey, '&&').every((item: string) => {
      const res = calculate(item, data, addons);
      return res;
    });
  }

  // 只有 || 运算符
  if (hasOr(newKey) && !hasAnd(newKey)) {
    return !getList(newKey, '||').some((item: string) => calculate(item, data, addons));
  }

  // 两种运算符都存在
  return !getList(newKey, '||').some((item: string) => {
    // 存在 && 运算符
    if (hasAnd(item)) {
      return getList(item, '&&').every((item: string) => calculate(item, data, addons));
    }
    return calculate(item, data, addons);
  });
};
