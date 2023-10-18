import request from 'umi-request';

const requestData = (params: any) => {
  return request
    .get(
      'https://www.fastmock.site/mock/62ab96ff94bc013592db1f67667e9c76/getTableList/api/basic',
      { params }
    )
    .then(res => ({ success: true, data: res.data }))
    .catch(() => ({ success: false, data: {} }))
}


export const searchApi = async (params) => {
  const { success, data } = await requestData(params);
  if (success) {
    return {
      data: data,
      total: data.length,
    }
  } else {
    // 必须返回 data 和 total
    return {
      data: [],
      total: 0,
    }
  }
};

export const searchApi2 = async (params) => {
  const { success, data } = await requestData(params);
  if (success) {
    return {
      data: data.slice(1),
      total: data.length - 1,
    }
  } else {
    // 必须返回 data 和 total
    return {
      data: [],
      total: 0,
    }
  }
};