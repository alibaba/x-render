export const basic = {
  type: 'object',
  column: 3,
  displayType: 'row',
  properties: {
    input1: {
      title: 'Input A',
      type: 'string'
    },
    input2: {
      title: 'Input B',
      type: 'string'
    },
    input3: {
      title: 'Input C',
      type: 'string'
    },
    input4: {
      title: 'Input D',
      type: 'string'
    }
  }
};

export const expression = {
  type: 'object',
  displayType: 'column',
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


