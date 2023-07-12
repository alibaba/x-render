import { message } from 'antd';
import classnames from 'classnames';
import dayjs from 'dayjs';

import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { isNumber, isObject, isString, get } from 'lodash-es';
dayjs.extend(utc);
dayjs.extend(timezone);

export const combineClass = (name: any, data: any, extra = {}) => {
  let result: any = {};

  if (typeof data === 'string') {
    result = { [data]: true };
  }
  if (Array.isArray(data)) {
    data.forEach((item) => {
      result[item] = true;
    });
  }

  return classnames(name, { ...result, ...extra });
};

/**
 *
 * @param string
 * @returns
 */
export const parseString = (string: string) => Function('"use strict";return (' + string + ')')();

/**
 * @param path // 对应数据的路径，例如：'a.b.c'
 * @param defaultValue // 默认值
 * @param data // 数据
 * @param addons // 渲染器方法集，访问 getSourceData
 * @returns value
 */
export const getValueFromKey = (props: {
  path: string;
  data?: any;
  defaultValue?: any;
  addons: any;
  valueType?: string;
}): string | boolean => {
  const { data, path = '', defaultValue = '', addons, valueType } = props;

  let result = null;
  let negation = null; // 否定标识 ！
  let dataPath = path;

  if (path.substring(0, 2) === '!!') {
    negation = '!!';
    dataPath = path.substring(2);
  } else if (path.substring(0, 1) === '!') {
    negation = '!';
    dataPath = path.substring(1);
  }

  // 带 source 标识，表示从顶层获取数据
  if (dataPath.includes('source:')) {
    const [_, sourcePath]: any = dataPath.split('source:');
    const sourceData = addons.getSourceData();
    result = get(sourceData, sourcePath);
  } else {
    result = get(data, dataPath);
  }

  if (!result && result !== 0 && typeof result !== 'boolean') {
    result = defaultValue;
  }

  // 根据 negation 取反, 返回结果
  if (negation === '!') {
    return !result;
  }

  if (negation === '!!') {
    return !!result;
  }

  if (result && valueType === '!object' && typeof result === 'object') {
    return '';
  }

  return result;
};

/**
 * 数据格式转换
 */
export const transformData = (value: any, format: any, parentData?: any, addons?: any) => {
  if (!format || (!value && value !== 0 && format.type !== 'dateTime-range')) {
    return value;
  }

  const getValue = (value: any, item: any) => {
    const { type, config, conn = ' ~ ' }: any = item;
    let result = value;

    if (type === 'dateTime-range') {
      const { startKey, endKey }: any = config;
      let startTime: any = getValueFromKey({ data: parentData, path: startKey, addons });
      if (startTime) {
        startTime = dayjs.tz(startTime).format(config.format || 'YYYY-MM-DD HH:mm:ss');
      }

      let endTime: any = getValueFromKey({ data: parentData, path: endKey, addons });
      if (endTime) {
        endTime = dayjs.tz(endTime).format(config.format || 'YYYY-MM-DD HH:mm:ss');
      }

      if (startTime !== 'Invalid Date') {
        result = startTime;
      }

      if (endTime !== 'Invalid Date') {
        result += conn + endTime;
      }
    }
    // 日期
    if (type === 'date') {
      result = dayjs.tz(value).format(config || 'YYYY-MM-DD');
    }

    // 时间
    if (type === 'dateTime') {
      result = dayjs.tz(value).format(config || 'YYYY-MM-DD HH:mm:ss');
    }

    // 枚举
    if (type === 'enum' && typeof config === 'object') {
      result = config[value] || config.default || value;
    }

    // 单位: 左边
    if (type === 'leftUnit' && config) {
      if (config.includes('dataKey:')) {
        result = `${getValueFromKey({
          data: parentData,
          path: config.split('dataKey:')[1],
          addons,
          defaultValue: '',
        })} ${value}`;
      } else {
        result = `${config} ${value}`;
      }
    }

    // 单位: 右边
    if (type === 'rightUnit' && config) {
      if (config.includes('dataKey:')) {
        result = `${value} ${getValueFromKey({
          data: parentData,
          path: config.split('dataKey:')[1],
          addons,
          defaultValue: '',
        })}`;
      } else {
        result = `${value} ${config}`;
      }
    }

    // 一分
    if (type === 'penny') {
      result = (value * 100).toFixed(config || 2);
    }

    // 分转元
    if (type === 'spunYuan') {
      result = value / 100;
    }

    // 百分比
    if (type === 'percent') {
      result = (value * 100).toFixed(config || 2) + '%';
    }

    // 浮点数转换
    if (type === 'float') {
      result = (value * 1).toFixed(config || 2);
    }

    // 函数
    if (type === 'function') {
      result = parseString(config)(value);
    }

    if (result === 'Invalid Date') {
      result = '';
      console.warn('日期转换错误');
    }

    if (result === 'NaN%') {
      result = '';
      console.warn('百分率转换错误');
    }

    return result;
  };

  return Array.isArray(format)
    ? format.reduce((preValue, item) => getValue(preValue, item), value)
    : getValue(value, format);
};

// 是否是数组
export function isArray(input: any): input is any[] {
  return Array.isArray(input);
}

// 获取请求参数
export const getRequestParams = (cond: any, data: any, insideData?: any) => {
  if (!cond) {
    return {};
  }

  let params: any = {};
  for (let key in cond) {
    let value = get(data, cond[key], null);
    if (cond[key].includes('dataKey:')) {
      value = get(insideData, cond[key].split(':')[1], null);
    }
    params[key] = value;
  }

  return params;
};

// 复制
export const clipboardCopy = (url: string) => {
  navigator.clipboard.writeText(url).then(
    function () {
      /* clipboard successfully set */
      message.success('复制成功');
    },
    function () {
      /* clipboard write failed */
      message.error('复制失败');
    },
  );
};

// 判断数据为空
export const isDataEmpty = (data: any, level: 1 | 2) => {
  if (
    Object.prototype.toString.call(data) === '[object Object]' &&
    Object.keys(data).length === 0
  ) {
    return true;
  }

  if (isArray(data) && data.length === 0) {
    return true;
  }

  if (level === 1 && (!data || data === '0')) {
    return true;
  }

  if (level === 2 && !data && data !== 0) {
    return true;
  }
};

// 判断是否是子协议
export const isReactNodeSchema = (schema: any = {}) => {
  return JSON.stringify(schema).includes('widget');
};

export const startsWith = (str: string, startStr: string) => {
  const reg = new RegExp('^' + startStr);
  return reg.test(str);
};

export const isThenable = (func: any) => {
  return Boolean(func && typeof func.then === 'function');
};

const validatorMap = {
  string: isString,
  number: isNumber,
  object: isObject,
  array: isArray,
};

export const isType = (val: any, types: Array<keyof typeof validatorMap>) => {
  return types.some((t) => {
    const func = validatorMap[t];
    return func(val);
  });
};

export const transDataKeyToData = (object: any, { data, addons }: any) => {
  // 进行动态数据绑定
  Object.keys(object).forEach((key) => {
    const item = object[key];
    if (typeof item !== 'string') {
      return;
    }

    if (startsWith(item, 'source:')) {
      object[key] = getValueFromKey({ path: item, data, addons });
      return;
    }

    if (startsWith(item, 'data:')) {
      const path = item.split('data:')[1]?.trim();
      object[key] = getValueFromKey({ path, data, addons });
    }
  });
};
