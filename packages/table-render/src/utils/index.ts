import dayjs from 'dayjs';
import { set, get, cloneDeep, has, merge, isUndefined, omitBy } from 'lodash-es';

export const _set = set;
export const _get = get;
export const _cloneDeep = cloneDeep;
export const _has = has;
export const _merge = merge;
export const _isUndefined = isUndefined;
export const _omitBy = omitBy;

export const getDateTime = (time: any, format: string) => {
  if (!time) return null;
  return dayjs(time).format(format || 'YYYY-MM-DD HH:mm:ss');
};

export const getDate = (time: any, format: string) => {
  if (!time) return null;
  return dayjs(time).format(format || 'YYYY-MM-DD');
};

export const getDateRange = (value: any, { result, record } , _format?: string) => {
  let data = value;
  const { bind, format } = result.valueTypeProps || {}
  if (bind) {
    data = [record?.[bind[0]], record?.[bind[1]]];
  }


  if (!isArray(data)) return null;
  const start = getDate(data[0], _format || format);
  const end = getDate(data[1], _format || format);

  if (start && end) {
    return `${start} ~ ${end}`;
  }

  if (start) {
    return `${start}（开始时间）`;
  }

  if (end) {
    return `${end}（结束时间）`;
  }
};

// 格式化千分符
export const getMoneyType = (num: any) => {
  if (!num) return null;
  return `¥${num}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

// 如果是函数，则解析，如果不是，直接返回值
export const parseFunctionValue = (value, params, cb) => {
  let _value = value;
  if (typeof _value === 'function') {
    _value = _value(params);
  } else {
    cb && typeof cb === 'function' && cb();
  }
  return _value;
};

export const isObject = (data: any) => {
  const str = Object.prototype.toString.call(data);
  return str.indexOf('Object') > -1;
}

export const isArray = (data: any) => {
  const str = Object.prototype.toString.call(data);
  return str.indexOf('Array') > -1;
}

export const isFunction = (data: any) => typeof data === 'function';

export const translation = (configCtx: any) => (key: string) => {
  const locale = configCtx?.locale.TableRender;
  return locale[key];
}



