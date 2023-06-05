export const normalSchema = {
  type: 'object',
  properties: {
    input1: {
      title: '简单输入框',
      type: 'string',
      required: true,
      default: '简单输入框',
      placeholder: '尝试在此输入',
      className: 'input-with-px',
      props: {
        addonAfter: 'px',
      },
    },
    numberDemo: {
      title: '数字',
      description: '数字输入框',
      type: 'number',
      min: 10,
      max: 100,
      step: 10,
    },
    textareaDemo: {
      title: '输入框',
      type: 'string',
      widget: 'textarea',
      default: 'FormRender\nHello World!',
      required: true,
    },
    imgDemo: {
      title: '图片',
      type: 'string',
      format: 'image',
      default:
        'https://img.alicdn.com/tfs/TB1P8p2uQyWBuNjy0FpXXassXXa-750-1334.png',
    },
    uploadDemo: {
      title: '文件上传',
      type: 'string',
      default:
        'https://img.alicdn.com/tfs/TB1P8p2uQyWBuNjy0FpXXassXXa-750-1334.png',
      widget: 'upload',
      props: {
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      },
    },
    disabledDemo: {
      title: '不可用',
      type: 'string',
      default: '我是一个被 disabled 的值',
      disabled: true,
    },
    select: {
      title: '单选',
      type: 'string',
      enum: ['a', 'b', 'c'],
      enumNames: ['<span>早</span>', '中', '晚'],
      default: 'a',
      props: {
        showSearch: true,
        onSearch: 'onSearch',
      },
    },
    select1: {
      title: '单选',
      type: 'string',
      default: 'a',
      props: {
        options: [
          { label: '早', value: 'a' },
          { label: '晚', value: 'b' },
        ],
      },
    },
    select2: {
      title: '复选',
      type: 'array',
      enum: ['a', 'b', 'c'],
      enumNames: ['早', '中', '晚'],
      widgets: 'checkboxes',
      default: 'a',
    },
    select3: {
      title: '多选',
      type: 'array',
      enum: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
      enumNames: ['早', '中', '晚', 'd', 'e', 'f', 'g'],
      default: 'a',
    },
    radio: {
      title: '单选radio',
      type: 'string',
      enum: ['a', 'b'],
      enumNames: ['早', '中'],
      default: 'a',
    },
    fontSize: {
      title: '字体大小',
      readOnly: false,
      required: false,
      type: 'number',
      widget: 'slider',
      default: 24,
      min: 12,
      max: 64,
    },
    width: {
      title: '宽度',
      readOnly: false,
      required: false,
      type: 'number',
      widget: 'slider',
      default: 280,
      min: 100,
      max: 560,
      props: {
        hideInput: true,
      },
    },
    time: {
      title: '时间',
      type: 'string',
      format: 'time',
    },
    time2: {
      title: '时间范围',
      type: 'range',
      format: 'time',
    },
    link: {
      title: '链接',
      type: 'string',
      format: 'url',
      props: {
        prefix: 'https://',
        suffix: '.com',
      },
    },
    dateDemo: {
      title: '时间',
      format: 'dateTime',
      type: 'string',
      widget: 'date',
      width: '50%',
      default: '2018-11-22',
      required: true,
    },
    dateRange: {
      title: '时间范围',
      format: 'dateTime',
      type: 'range',
      width: '50%',
    },
    objDemo: {
      title: '单个对象',
      description: '这是一个对象类型',
      type: 'object',
      properties: {
        isLike: {
          title: '是否显示颜色选择',
          type: 'boolean',
          default: true,
        },
        background: {
          title: '颜色选择',
          description: '特殊面板',
          format: 'color',
          type: 'string',
          hidden: '{{rootValue.isLike === false}}',
          default: '#ffff00',
        },
        wayToTravel: {
          title: '旅行方式',
          type: 'string',
          enum: ['self', 'group'],
          enumNames: ['自驾', '跟团'],
          widget: 'radio',
        },
        canDrive: {
          title: '是否拥有驾照',
          type: 'boolean',
          default: false,
          hidden: "{{rootValue.wayToTravel !== 'self'}}",
        },
      },
      required: ['background'],
    },
    html1: {
      title: '纯字符串',
      type: 'html',
      default: 'hello world',
    },
    list: {
      title: 'list',
      type: 'array',
    },
    objectName: {
      type: 'object',
      description: '这是一个对象类型',
      collapsed: false,
      properties: {
        input1: {
          title: '简单输入框',
          type: 'string',
          required: true,
        },
      },
    },
  },
};

export const listSchema = {
  type: 'object',
  properties: {
    listName2: {
      title: '对象数组',
      description: '对象数组嵌套功能',
      type: 'array',
      // widget: 'cardList',
      items: {
        type: 'object',
        properties: {
          input1: {
            title: '简单输入框',
            type: 'string',
            required: true,
          },
          select1: {
            title: '单选',
            type: 'string',
            enum: ['a', 'b', 'c'],
            enumNames: ['早', '中', '晚'],
            default: 'a',
          },
          obj: {
            title: '对象',
            type: 'object',
            properties: {
              input1: {
                title: '简单输入框',
                type: 'string',
                required: true,
                default: '卡片列表',
              },
              select1: {
                title: '单选',
                type: 'string',
                enum: ['a', 'b', 'c'],
                enumNames: ['早', '中', '晚'],
              },
            },
          },
        },
      },
    },
    listName3: {
      title: '对象数组',
      description: '对象数组嵌套功能',
      type: 'array',
      widget: 'simpleList',
      items: {
        type: 'object',
        properties: {
          input1: {
            title: '简单输入框',
            type: 'string',
            required: true,
          },
          select1: {
            title: '单选',
            type: 'string',
            enum: ['a', 'b', 'c'],
            enumNames: ['早', '中', '晚'],
          },
        },
      },
    },
    listName4: {
      title: '对象数组',
      description: '对象数组嵌套功能',
      type: 'array',
      widget: 'tableList',
      items: {
        type: 'object',
        properties: {
          input1: {
            title: '简单输入框',
            type: 'string',
            required: true,
          },
          input2: {
            title: '简单输入框2',
            type: 'string',
          },
          input3: {
            title: '简单输入框3',
            type: 'string',
          },
          select1: {
            title: '单选',
            type: 'string',
            enum: ['a', 'b', 'c'],
            enumNames: ['早', '中', '晚'],
            widget: 'select',
          },
        },
      },
    },
  },
};
