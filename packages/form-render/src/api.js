import { extend } from 'umi-request';

// 最简单的 mock 方案，如果需求复杂，使用 umi 自带的 mock 功能，https://umijs.org/zh-CN/docs/mock
const IS_MOCK = false;

const delay = ms => new Promise(r => setTimeout(r, ms));
export const mockRequest = () => delay(500);

const mockData = {};

const mockApi = (api, params) =>
  delay(500).then(() => {
    const res = mockData[api];
    // TODO: 发布了记得去掉
    console.group(api);
    console.log('%cParams:', 'color: #00A7F7; font-weight: 700;', params);
    console.log('%cResponse:', 'color: #47B04B; font-weight: 700;', res);
    console.groupEnd();
    return res;
  });

const req = extend({
  // prefix: '/api', // 如果有统一的前缀
  // credentials: 'include', // 默认请求是否带上cookie
  // timeout: 1000,
  // headers: {
  //   'Content-Type': 'multipart/form-data',
  // },
});

const req2 = extend({});

// { type: 'award', schema: {}, formId: 1, formData: { a: 213234 } }
const sendData = params => {
  const options = { method: 'post' };
  options.data = params;
  return req2(`https://sms.alibaba-inc.com/api/rule/verify`, options);
};

const sendLog = params => {
  const img = document.createElement('img');
  img.src = `http://gm.mmstat.com/fliggy-form.form.verify_log?${new URLSearchParams(
    params,
  ).toString()}`;
};

const runApi = (api, params, method = 'get') => {
  if (IS_MOCK) return mockApi(api, params);
  const options = { method };
  if (method === 'get') {
    options.params = params;
  }
  if (method === 'post') {
    options.data = params;
  }
  return req(api, options)
    .then(res => {
      return res;
    })
    .catch(err => {
      // TODO: 发布了记得去掉
      console.group(api);
      console.log('%cParams:', 'color: #FF4D4F; font-weight: 700;', params);
      console.log('%cResponse:', 'color: #FF4D4F; font-weight: 700;', err);
      console.groupEnd();
    });
};

const order = {
  add: () => runApi('/order/add', {}, 'post'),
  edit: () => runApi('/order/edit', {}, 'post'),
  list: () => runApi('/order/queryList'),
};

const api = {
  sendData,
  sendLog,
};

export default api;
