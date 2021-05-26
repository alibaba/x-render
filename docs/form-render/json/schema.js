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

export const expression = {
  type: 'object',
  properties: {
    input: {
      title: '{{formData.config.title || "输入框"}}',
      type: 'string',
      placeholder: '{{formData.config.placeholder}}',
      props: {
        size: '{{formData.config.size}}',
      },
      hidden: '{{formData.config.hidden === true}}',
      readOnly: '{{formData.config.readOnly === true}}',
      disabled: '{{formData.config.disabled === true}}',
    },
    rate: {
      title: 'rate',
      type: 'number',
      widget: 'rate',
    },
    config: {
      title: '配置',
      type: 'object',
      properties: {
        title: {
          title: 'title',
          type: 'string',
        },
        placeholder: {
          title: 'placeholder',
          type: 'string',
        },
        size: {
          title: 'input大小',
          type: 'string',
          enum: ['large', 'middle', 'small'],
          enumNames: ['大', '中', '小'],
          widget: 'radio',
        },
        hidden: {
          title: '是否隐藏',
          type: 'boolean',
        },
        readOnly: {
          title: '是否只读',
          type: 'boolean',
        },
        disabled: {
          title: '是否置灰',
          type: 'boolean',
        },
      },
    },
  },
  required: [],
};

export const titleTrick = {
  displayType: 'row',
  type: 'object',
  properties: {
    inputName1: {
      title: '简单输入框',
      type: 'string',
      width: '50%',
    },
    desc: {
      type: 'html',
      bind: false,
      default: "补充说明 <span style='color:red'>hello<span>",
      width: '50%',
    },
  },
};
