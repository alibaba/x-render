export const basic = {
  labelWidth: 130,
  type: 'object',
  properties: {
    url: {
      title: 'url输入框',
      placeholder: '//www.taobao.com',
      type: 'string',
      format: 'url',
      required: true,
    },
    email: {
      title: 'email输入框',
      type: 'string',
      format: 'email',
    },
    string: {
      title: '正则校验字符串',
      description: 'a-z',
      type: 'string',
      hidden: false,
      disabled: true,
    },
  },
};
