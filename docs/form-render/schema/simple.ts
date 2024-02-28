export default {
  type: "object",
  displayType: "row", // 默认 column
  column: 2,
  properties: {
    input1: {
      title: "输入框",
      displayType: "row",
      type: "string",
      widget: "input",
    },
    number1: {
      title: "数字输入框",
      type: "number",
      widget: "inputNumber",
    },
    select1: {
      title: "下啦单选",
      widget: "select",
      props: {
        options: [
          { label: "东", value: "east" },
          { label: "西", value: "west" },
        ],
      },
    },
    cpt: {
      title: "自定义组件",
      widget: "Cpt",
      foo: "xxx",
      props: {
        foo: "xxxx",
      },
    },
    input2: {
      title: "输入框",
      displayType: "row",
      type: "string",
      widget: "input",
    },
    obj: {
      type: "object",
      title: "卡片主题",
      description: "这是一个对象类型",
      widget: "collapse",
      properties: {
        input1: {
          title: "输入框 A",
          type: "string",
        },
        input2: {
          title: "输入框 B",
          type: "string",
        },
        input3: {
          title: "输入框 C",
          type: "string",
        },
        input4: {
          title: "输入框 D",
          type: "string",
        },
      },
    },
    list: {
      title: "活动模版",
      type: "array",
      widget: "simpleList",
      items: {
        type: "object",
        properties: {
          input1: {
            title: "输入框 A",
            type: "string",
          },
          input2: {
            title: "输入框 B",
            type: "string",
          },
          input3: {
            title: "输入框 C",
            type: "string",
          },
          input4: {
            title: "输入框 4",
            type: "string",
          },
          input5: {
            title: "输入框 5",
            type: "string",
          },
        },
      },
    },
    void1: {
      title: "常用组件",
      type: "void",
      widget: "voidTitle",
    },
    multiSelect1: {
      title: "多选",
      type: "array",
      widget: "multiSelect",
      description: "下拉多选",
      props: {
        options: [
          { label: "杭州", value: "a" },
          { label: "武汉", value: "b" },
          { label: "湖州", value: "c" },
          { label: "贵阳", value: "d" },
        ],
      },
    },
    radio1: {
      title: "点击单选",
      type: "string",
      widget: "radio",
      props: {
        options: [
          { label: "早", value: "a" },
          { label: "中", value: "b" },
          { label: "晚", value: "c" },
        ],
      },
    },
    checkboxes1: {
      title: "点击多选",
      type: "array",
      widget: "checkboxes",
      props: {
        options: [
          { label: "杭州", value: "a" },
          { label: "武汉", value: "b" },
          { label: "湖州", value: "c" },
          { label: "贵阳", value: "d" },
        ],
      },
    },
    textarea1: {
      title: "长文本",
      type: "string",
      widget: "textArea",
    },
    date1: {
      title: "日期选择",
      type: "string",
      widget: "datePicker",
    },
    dateRange1: {
      title: "日期范围",
      type: "range",
      widget: "dateRange",
    },
    time1: {
      title: "时间选择",
      type: "string",
      widget: "timePicker",
    },
    timeRange1: {
      title: "时间范围",
      type: "range",
      widget: "timeRange",
    },
    void2: {
      title: "其他组件",
      type: "void",
      widget: "voidTitle",
    },
    html1: {
      title: "HTML",
      type: "string",
      widget: "html",
    },
    switch1: {
      title: "开关",
      type: "boolean",
      widget: "switch",
    },
    checkbox1: {
      title: "是否选择",
      type: "boolean",
      widget: "checkbox",
    },
    slider1: {
      title: "带滑动条",
      type: "number",
      widget: "slider",
    },
    image1: {
      title: "图片展示",
      type: "string",
      widget: "imageInput",
    },
    color1: {
      title: "颜色选择",
      type: "string",
      widget: "color",
    },
    url1: {
      title: "链接",
      type: "string",
      widget: "urlInput",
    },
  },
};

// export default {
//   type: 'object',
//   properties: {
//     a: {
//       title: 'lala',
//       type: 'string',
//       widget: 'Cpt',
//       foo: 'xxx',
//       props: {
//         foo: 'xxxx',
//       },
//     },
//     tel: {
//       title: '自定义 Input',
//       type: 'string',
//       widget: 'CaptchaInput',
//       foo: 'xxx',
//       props: {
//         foo: 'xxxx',
//       },
//     },
//     obj: {
//       title: '容器',
//       type: 'string',
//       widget: 'Contanier',
//       foo: 'xxx',
//       props: {
//         foo: 'xxxx',
//       },
//     },
//   },
// };
// export default {

//   type: 'object',
//   displayType: 'row',
//   column: 2,
//   properties: {
//     aaa: {
//       title: '验证码',
//       type: 'stting',
//       widget: 'CaptchaInput',
//     },
//     // void1: {
//     //   title: '常用组件',
//     //   type: 'void',
//     //   widget: 'voidTitle',
//     // },
//     // input1: {
//     //   title: '输入框',
//     //   type: 'string',
//     //   widget: 'input',
//     // },
//     // number1: {
//     //   title: '数字输入框',
//     //   type: 'number',
//     //   widget: 'inputNumber',
//     // },
//     // select1: {
//     //   title: '下拉单选',
//     //   type: 'string',
//     //   widget: 'select',
//     //   props: {
//     //     options: [
//     //       { label: '早', value: 'a' },
//     //       { label: '中', value: 'b' },
//     //       { label: '晚', value: 'c' },
//     //     ],
//     //   },
//     // },
//     // multiSelect1: {
//     //   title: '多选',
//     //   type: 'array',
//     //   widget: 'multiSelect',
//     //   description: '下拉多选',
//     //   props: {
//     //     options: [
//     //       { label: '杭州', value: 'a' },
//     //       { label: '武汉', value: 'b' },
//     //       { label: '湖州', value: 'c' },
//     //       { label: '贵阳', value: 'd' },
//     //     ],
//     //   },
//     // },
//     // radio1: {
//     //   title: '点击单选',
//     //   type: 'string',
//     //   widget: 'radio',
//     //   props: {
//     //     options: [
//     //       { label: '早', value: 'a' },
//     //       { label: '中', value: 'b' },
//     //       { label: '晚', value: 'c' },
//     //     ],
//     //   },
//     // },
//     // checkboxes1: {
//     //   title: '点击多选',
//     //   type: 'array',
//     //   widget: 'checkboxes',
//     //   props: {
//     //     options: [
//     //       { label: '杭州', value: 'a' },
//     //       { label: '武汉', value: 'b' },
//     //       { label: '湖州', value: 'c' },
//     //       { label: '贵阳', value: 'd' },
//     //     ],
//     //   },
//     // },
//     // textarea1: {
//     //   title: '长文本',
//     //   type: 'string',
//     //   widget: 'textArea',
//     // },
//     // date1: {
//     //   title: '日期选择',
//     //   type: 'string',
//     //   widget: 'datePicker',
//     // },
//     // dateRange1: {
//     //   title: '日期范围',
//     //   type: 'range',
//     //   widget: 'dateRange',
//     // },
//     // time1: {
//     //   title: '时间选择',
//     //   type: 'string',
//     //   widget: 'timePicker',
//     // },
//     // timeRange1: {
//     //   title: '时间范围',
//     //   type: 'range',
//     //   widget: 'timeRange',
//     // },
//     // void2: {
//     //   title: '其他组件',
//     //   type: 'void',
//     //   widget: 'voidTitle',
//     // },
//     // html1: {
//     //   title: 'HTML',
//     //   type: 'string',
//     //   widget: 'html',
//     // },
//     // switch1: {
//     //   title: '开关',
//     //   type: 'boolean',
//     //   widget: 'switch',
//     // },
//     // checkbox1: {
//     //   title: '是否选择',
//     //   type: 'boolean',
//     //   widget: 'checkbox',
//     // },
//     // slider1: {
//     //   title: '带滑动条',
//     //   type: 'number',
//     //   widget: 'slider',
//     // },
//     // image1: {
//     //   title: '图片展示',
//     //   type: 'string',
//     //   widget: 'imageInput',
//     // },
//     // color1: {
//     //   title: '颜色选择',
//     //   type: 'string',
//     //   widget: 'color',
//     // },
//     // url1: {
//     //   title: '链接',
//     //   type: 'string',
//     //   widget: 'urlInput',
//     // },
//   },
// };
