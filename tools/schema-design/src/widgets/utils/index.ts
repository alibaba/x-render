export { default as get } from 'lodash/get';
export { default as set } from 'lodash/set';
export { default as has } from 'lodash/has';
export { default as isNumber } from 'lodash/isNumber';


// simple uuid
export function uuid() {
  return ((Math.random() * 1e6) >> 0).toString(36);
}

export function isObject (value: any) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

export function getStringToNumber (str: any) {
  const reg = /^[\d]+$/;
  if (reg.test(str)) {
    return parseInt(str);
  }
  return str;
}

export function isUrl(url: string) {
  const protocolRE = /^(?:\w+:)?\/\/(\S+)$/;
  // const domainRE = /^[^\s\.]+\.\S{2,}$/;
  if (typeof url !== 'string') return false;
  return protocolRE.test(url);
}