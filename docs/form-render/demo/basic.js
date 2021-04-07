export default {
  type: 'object',
  properties: {
    dateRangeExample: {
      title: '日期范围',
      bind: ['startDate', 'endDate'],
      type: 'range',
      format: 'date',
      required: true,
      disabled: '{{formData.percentage == 20}}',
      default: ['2021-04-13', '2021-05-11'],
    },
    inputTest: {
      title: '地址输入',
      type: 'string',
    },
    percentage: {
      title: '百分比',
      type: 'number',
      widget: 'percent',
      rules: [
        {
          min: 10,
          message: '要大于10哦~',
        },
        {
          max: 40,
        },
        {
          validator: (_, value) => value !== 30,
          message: '测试值不为30',
        },
      ],
    },
    list: {
      required: false,
      title: '对象数组',
      description: '对象数组嵌套功能',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          userName: {
            bind: false,
            title: 'User Name',
            required: true,
            type: 'string',
            rules: [
              {
                min: 5,
                message: '长度需要大于5',
              },
              {
                max: 12,
              },
              {
                pattern: '^[A-Za-z0-9]+$',
              },
            ],
          },
          selectName: {
            title: '单选',
            type: 'string',
            enum: ['a', 'b', 'c'],
            enumNames: ['早', '中', '晚'],
            required: true,
          },
          checkboxName: {
            title: '是否判断',
            type: 'boolean',
            valuePropName: 'checked',
          },
          objectName: {
            title: '对象',
            description: '这是一个对象类型',
            type: 'object',
            properties: {
              inputName: {
                title: '简单输入框',
                type: 'string',
              },
            },
          },
        },
      },
    },

    AllString: {
      title: 'string类',
      type: 'object',
      properties: {
        input: {
          title: '简单输入框',
          type: 'string',
          placeholder: 'haha',
          required: false,
        },
        textarea: {
          title: '简单文本编辑框',
          type: 'string',
          format: 'textarea',
          default: '123',
          hidden: "{{formData.AllString.input === '123'}}",
        },
        color: {
          title: '颜色选择',
          type: 'string',
          format: 'color',
          default: '#000000',
        },
        date: {
          title: '日期选择',
          type: 'string',
          format: 'date',
          default: '1999-12-12',
        },
        image: {
          bind: false,
          title: '图片展示',
          type: 'string',
          format: 'image',
          default:
            'https://img.alicdn.com/imgextra/i1/O1CN01jfLqRq1pixRWuFJ2J_!!6000000005395-2-tps-332-256.png',
        },
        uploader: {
          title: '上传文件',
          type: 'string',
          format: 'upload',
          props: {
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
          },
        },
        objectName: {
          title: '对象',
          description: '这是一个对象类型',
          type: 'object',
          properties: {
            inputName: {
              required: true,
              title: '简单输入框',
              type: 'string',
              rules: [
                {
                  pattern: '^[A-Za-z0-9]+$',
                  message: '只允许英文字母 & 数字',
                },
              ],
            },
          },
        },
      },
    },
    allNumber: {
      title: 'number类',
      type: 'object',
      properties: {
        number1: {
          title: '数字输入框',
          description: '10 - 100',
          type: 'number',
          placeholder: 'nihao',
          rules: [{ min: 10, max: 100 }],
        },
        number2: {
          title: '带滑动条',
          description: '20 - 50',
          type: 'number',
          widget: 'slider',
          rules: [{ min: 20 }, { max: 50 }],
        },
      },
    },
    allBoolean: {
      title: 'boolean类',
      type: 'object',
      properties: {
        checkbox: {
          title: '是否通过',
          type: 'boolean',
          default: true,
        },
        switch: {
          title: '开关控制',
          type: 'boolean',
          widget: 'switch',
          default: true,
        },
      },
    },
    allRange: {
      title: 'range类',
      type: 'object',
      properties: {
        dateRange: {
          title: '日期范围',
          type: 'range',
          format: 'dateTime',
          placeholder: ['开始时间', '结束时间'],
        },
      },
    },
    allEnum: {
      title: '选择类',
      type: 'object',
      properties: {
        select: {
          title: '单选1',
          description: '选项超过5个',
          type: 'number',
          enum: [1, 2, 3, 4, 5, 6, 7],
          enumNames: ['红', '橙', '黄', '绿', '青', '蓝', '紫'],
        },
        radio: {
          title: '单选2',
          type: 'string',
          enum: ['a', 'b', 'c'],
          enumNames: ['早', '中', '晚'],
        },
        multiSelect: {
          title: '多选1',
          description: '选项超过5个',
          type: 'array',
          items: {
            type: 'number',
          },
          default: [1, 5],
          enum: [1, 2, 3, 4, 5, 6, 7],
          enumNames: ['红', '橙', '黄', '绿', '青', '蓝', '紫'],
        },
        boxes: {
          title: '多选2',
          type: 'array',
          items: {
            type: 'string',
          },
          enum: ['A', 'B', 'C', 'D'],
          enumNames: ['杭州', '武汉', '湖州', '贵阳'],
          default: ['A', 'B'],
        },
      },
    },
  },
};
