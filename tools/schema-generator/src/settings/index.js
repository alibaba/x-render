// 只需写配置，方便可扩展
export const baseCommonSettings = {
  type: {
    title: '类型',
    type: 'string',
    hidden: '{{true}}',
  },
  widget: {
    title: '组件',
    type: 'string',
    hidden: '{{true}}',
  },
  format: {
    title: '格式',
    type: 'string',
    hidden: '{{true}}',
  },
};

export const defaultCommonSettings = {
  $id: {
    title: 'ID',
    description: '字段名称/英文',
    type: 'string',
    widget: 'idInput',
    required: true,
  },
  title: {
    title: '标题',
    type: 'string',
  },
  displayType: {
    title: '标题展示模式',
    type: 'string',
    enum: ['row', 'column'],
    enumNames: ['同行', '单独一行'],
    widget: 'radio',
  },
  description: {
    title: '说明',
    type: 'string',
  },
  default: {
    title: '默认值',
    type: 'string',
  },
  required: {
    title: '必填',
    type: 'boolean',
  },
  placeholder: {
    title: '占位符',
    type: 'string',
  },
  bind: {
    title: 'Bind',
    type: 'string',
  },
  min: {
    title: '最小值',
    type: 'number',
  },
  max: {
    title: '最大值',
    type: 'number',
  },
  disabled: {
    title: '禁用',
    type: 'boolean',
  },
  readOnly: {
    title: '只读',
    type: 'boolean',
  },
  hidden: {
    title: '隐藏',
    type: 'boolean',
  },
  readOnlyWidget: {
    title: '只读组件',
    type: 'string',
  },
  width: {
    title: '元素宽度',
    type: 'string',
    widget: 'percentSlider',
  },
  labelWidth: {
    title: '标签宽度',
    description: '默认值120',
    type: 'number',
    widget: 'slider',
    max: 400,
    props: {
      hideNumber: true,
    },
  },
};

// widget 用于指定 schema 右侧配置对应的 setting
export const elements = [
  {
    text: '输入框',
    name: 'input',
    schema: {
      title: '输入框',
      type: 'string',
    },
    setting: {
      props: {
        title: '选项',
        type: 'object',
        labelWidth: 80,
        properties: {
          allowClear: {
            title: '是否带清除按钮',
            description: '填写内容后才会出现x哦',
            type: 'boolean',
          },
          addonBefore: {
            title: '前tab',
            type: 'string',
          },
          addonAfter: {
            title: '后tab',
            type: 'string',
          },
          prefix: {
            title: '前缀',
            type: 'string',
          },
          suffix: {
            title: '后缀',
            type: 'string',
          },
        },
      },
      minLength: {
        title: '最短字数',
        type: 'number',
      },
      maxLength: {
        title: '最长字数',
        type: 'number',
      },
      pattern: {
        title: '校验正则表达式',
        type: 'string',
        props: {
          placeholder: '填写正则表达式',
        },
      },
    },
  },
  {
    text: '大输入框',
    name: 'textarea',
    schema: {
      title: '编辑框',
      type: 'string',
      format: 'textarea',
    },
    setting: {
      props: {
        title: '选项',
        type: 'object',
        labelWidth: 80,
        properties: {
          autoSize: {
            title: '高度自动',
            type: 'boolean',
          },
          row: {
            title: '指定高度',
            type: 'number',
          },
        },
      },
      minLength: {
        title: '最短字数',
        type: 'number',
      },
      maxLength: {
        title: '最长字数',
        type: 'number',
      },
      pattern: {
        title: '校验正则表达式',
        type: 'string',
        props: {
          placeholder: '填写正则表达式',
        },
      },
    },
  },
  {
    text: '日期选择',
    name: 'date',
    schema: {
      title: '日期选择',
      type: 'string',
      format: 'date',
    },
    setting: {
      format: {
        title: '格式',
        type: 'string',
        enum: ['dateTime', 'date', 'time'],
        enumNames: ['日期时间', '日期', '时间'],
      },
    },
  },
  {
    text: '数字输入框',
    name: 'number',
    schema: {
      title: '数字输入框',
      type: 'number',
    },
    setting: {},
  },
  {
    text: '是否选择',
    name: 'checkbox',
    schema: {
      title: '是否选择',
      type: 'boolean',
      widget: 'checkbox',
    },
    setting: {
      default: {
        title: '是否默认勾选',
        type: 'boolean',
      },
    },
  },
  {
    text: '是否switch',
    name: 'switch',
    schema: {
      title: '是否选择',
      type: 'boolean',
      widget: 'switch',
    },
    setting: {
      default: {
        title: '是否默认开启',
        type: 'boolean',
      },
    },
  },
  {
    text: '下拉单选',
    name: 'select',
    schema: {
      title: '单选',
      type: 'string',
      enum: ['a', 'b', 'c'],
      enumNames: ['早', '中', '晚'],
      widget: 'select',
    },
    setting: {
      enumList: {
        title: '选项',
        type: 'array',
        widget: 'simpleList',
        className: 'frg-options-list',
        items: {
          type: 'object',
          properties: {
            value: {
              title: '',
              type: 'string',
              className: 'frg-options-input',
              props: {},
              placeholder: '字段',
            },
            label: {
              title: '',
              type: 'string',
              className: 'frg-options-input',
              props: {},
              placeholder: '名称',
            },
          },
        },
        props: {
          hideMove: true,
          hideCopy: true,
        },
      },
    },
  },
  {
    text: '点击单选',
    name: 'radio',
    schema: {
      title: '单选',
      type: 'string',
      enum: ['a', 'b', 'c'],
      enumNames: ['早', '中', '晚'],
      widget: 'radio',
    },
    setting: {
      enumList: {
        title: '选项',
        type: 'array',
        widget: 'simpleList',
        className: 'frg-options-list',
        items: {
          type: 'object',
          properties: {
            value: {
              title: '',
              type: 'string',
              className: 'frg-options-input',
              props: {},
              placeholder: '字段',
            },
            label: {
              title: '',
              type: 'string',
              className: 'frg-options-input',
              props: {},
              placeholder: '名称',
            },
          },
        },
        props: {
          hideMove: true,
          hideCopy: true,
        },
      },
    },
  },
  {
    text: '下拉多选',
    name: 'multiSelect',
    schema: {
      title: '多选',
      description: '下拉多选',
      type: 'array',
      items: {
        type: 'string',
      },
      enum: ['A', 'B', 'C', 'D'],
      enumNames: ['杭州', '武汉', '湖州', '贵阳'],
      widget: 'multiSelect',
    },
    setting: {
      enumList: {
        title: '选项',
        type: 'array',
        widget: 'simpleList',
        className: 'frg-options-list',
        items: {
          type: 'object',
          properties: {
            value: {
              title: '',
              type: 'string',
              className: 'frg-options-input',
              props: {},
              placeholder: '字段',
            },
            label: {
              title: '',
              type: 'string',
              className: 'frg-options-input',
              props: {},
              placeholder: '名称',
            },
          },
        },
        props: {
          hideMove: true,
          hideCopy: true,
        },
      },
    },
  },
  {
    text: '点击多选',
    name: 'checkboxes',
    schema: {
      title: '多选',
      type: 'array',
      widget: 'checkboxes',
      items: {
        type: 'string',
      },
      enum: ['A', 'B', 'C', 'D'],
      enumNames: ['杭州', '武汉', '湖州', '贵阳'],
    },
    setting: {
      enumList: {
        title: '选项',
        type: 'array',
        widget: 'simpleList',
        className: 'frg-options-list',
        items: {
          type: 'object',
          properties: {
            value: {
              title: '',
              type: 'string',
              className: 'frg-options-input',
              props: {},
              placeholder: '字段',
            },
            label: {
              title: '',
              type: 'string',
              className: 'frg-options-input',
              props: {},
              placeholder: '名称',
            },
          },
        },
        props: {
          hideMove: true,
          hideCopy: true,
        },
      },
    },
  },
  {
    text: 'HTML',
    name: 'html',
    schema: {
      title: 'HTML',
      type: 'string',
      widget: 'html',
    },
    setting: {
      props: {
        type: 'object',
        properties: {
          value: {
            title: '展示内容',
            type: 'string',
          },
        },
      },
    },
  },
];

export const advancedElements = [
  {
    text: '日期范围',
    name: 'dateRange',
    schema: {
      title: '日期范围',
      type: 'range',
      format: 'dateTime',
      props: {
        placeholder: ['开始时间', '结束时间'],
      },
    },
    setting: {
      format: {
        title: '类型',
        type: 'string',
        enum: ['dateTime', 'date'],
        enumNames: ['日期时间', '日期'],
      },
    },
  },
  {
    text: '数字（slider）',
    name: 'slider',
    schema: {
      title: '带滑动条',
      type: 'number',
      widget: 'slider',
    },
    setting: {},
  },
  {
    text: '图片展示',
    name: 'image',
    schema: {
      title: '图片展示',
      type: 'string',
      format: 'image',
    },
    setting: {},
  },
  {
    text: '颜色选择',
    name: 'color',
    schema: {
      title: '颜色选择',
      type: 'string',
      format: 'color',
    },
    setting: {},
  },
];

export const layouts = [
  {
    text: '对象',
    name: 'object',
    schema: {
      title: '对象',
      type: 'object',
      properties: {},
    },
    setting: {},
  },
  {
    text: '常规列表',
    name: 'list',
    schema: {
      title: '数组',
      type: 'array',
      items: {
        type: 'object',
        properties: {},
      },
    },
    setting: {
      items: {
        type: 'object',
        hidden: '{{true}}',
      },
      min: {
        title: '最小长度',
        type: 'number',
      },
      max: {
        title: '最大长度',
        type: 'number',
      },
      props: {
        title: '选项',
        type: 'object',
        properties: {
          foldable: {
            title: '是否可折叠',
            type: 'boolean',
          },
          hideDelete: {
            title: '隐藏删除按钮',
            type: 'string',
          },
          hideAdd: {
            title: '隐藏新增/复制按钮',
            type: 'string',
          },
        },
      },
    },
  },
  {
    text: '简单列表',
    name: 'simpleList',
    schema: {
      title: '数组',
      type: 'array',
      widget: 'simpleList',
      items: {
        type: 'object',
        properties: {},
      },
    },
    setting: {
      items: {
        type: 'object',
        hidden: '{{true}}',
      },
      min: {
        title: '最小长度',
        type: 'number',
      },
      max: {
        title: '最大长度',
        type: 'number',
      },
      props: {
        title: '选项',
        type: 'object',
        properties: {
          foldable: {
            title: '是否可折叠',
            type: 'boolean',
          },
          hideTitle: {
            title: '隐藏标题',
            type: 'boolean',
          },
          hideDelete: {
            title: '隐藏删除按钮',
            type: 'string',
          },
          hideAdd: {
            title: '隐藏新增/复制按钮',
            type: 'string',
          },
        },
      },
    },
  },
  {
    text: '表格列表',
    name: 'list2',
    schema: {
      title: '数组',
      type: 'array',
      widget: 'list2',
      items: {
        type: 'object',
        properties: {},
      },
    },
    setting: {
      items: {
        type: 'object',
        hidden: '{{true}}',
      },
      min: {
        title: '最小长度',
        type: 'number',
      },
      max: {
        title: '最大长度',
        type: 'number',
      },
      props: {
        title: '选项',
        type: 'object',
        properties: {
          foldable: {
            title: '是否可折叠',
            type: 'boolean',
          },
          hideDelete: {
            title: '隐藏删除按钮',
            type: 'string',
          },
          hideAdd: {
            title: '隐藏新增/复制按钮',
            type: 'string',
          },
        },
      },
    },
  },
  {
    text: '复杂表格列表',
    name: 'drawerList',
    schema: {
      title: '数组',
      type: 'array',
      widget: 'drawerList',
      items: {
        type: 'object',
        properties: {},
      },
    },
    setting: {
      items: {
        type: 'object',
        hidden: '{{true}}',
      },
      min: {
        title: '最小长度',
        type: 'number',
      },
      max: {
        title: '最大长度',
        type: 'number',
      },
      props: {
        title: '选项',
        type: 'object',
        properties: {
          foldable: {
            title: '是否可折叠',
            type: 'boolean',
          },
          hideDelete: {
            title: '隐藏删除按钮',
            type: 'string',
          },
          hideAdd: {
            title: '隐藏新增/复制按钮',
            type: 'string',
          },
        },
      },
    },
  },
];

const saves = [
  {
    text: '复杂结构样例',
    name: 'something',
    schema: {
      title: '对象',
      description: '这是一个对象类型',
      type: 'object',
      properties: {
        inputName: {
          title: '简单输入框',
          type: 'string',
        },
        selectName: {
          title: '单选',
          type: 'string',
          enum: ['a', 'b', 'c'],
          enumNames: ['早', '中', '晚'],
        },
        dateName: {
          title: '时间选择',
          type: 'string',
          format: 'date',
        },
        listName: {
          title: '对象数组',
          description: '对象数组嵌套功能',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              rangeName: {
                title: '日期/时间范围',
                type: 'range',
                format: 'date',
                props: {
                  placeholder: ['开始日期', '结束日期'],
                },
              },
            },
          },
        },
      },
    },
  },
];

export const defaultSettings = [
  {
    title: '基础组件',
    widgets: elements,
    show: true,
    useCommon: true, // TODO: 是否将common
  },
  {
    title: '高级组件',
    widgets: advancedElements,
  },
  {
    title: '布局组件',
    widgets: layouts,
  },
  {
    title: '模板',
    widgets: saves,
  },
];

export const defaultGlobalSettings = {
  type: 'object',
  properties: {
    column: {
      title: '整体布局',
      type: 'number',
      enum: [1, 2, 3],
      enumNames: ['一行一列', '一行二列', '一行三列'],
      props: {
        placeholder: '默认一行一列',
      },
    },
    labelWidth: {
      title: '标签宽度',
      type: 'number',
      widget: 'slider',
      max: 300,
      default: 120,
      props: {
        hideNumber: true,
      },
    },
    displayType: {
      title: '标签展示模式',
      type: 'string',
      default: 'row',
      enum: ['row', 'column'],
      enumNames: ['同行', '单独一行'],
      widget: 'radio',
    },
  },
};
