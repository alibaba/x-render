const props = [
  {
    name: 'title',
    title: { label: '标题名称', tip: 'title | 标题名称' },
    setter: 'StringSetter',
  },
  {
    name: 'code',
    title: { label: '字段名称', tip: 'key | 字段名称' },
    setter: 'StringSetter',
  },
  {
    name: 'defaultValue',
    title: { label: '默认值', tip: 'defaultValue | 默认值'},
    setter: 'StringSetter'
  },
  {
    name: 'props.placeholder',
    title: { label: '提示文案', tip: 'placeholder | 提示文案' },
    setter: 'StringSetter'
  },
  {
    name: 'description',
    title: { label: '补充描述', tip: 'description | 补充描述' },
    setter: 'StringSetter',
  },
  {
    name: 'tooltip.title',
    title: { label: '气泡提示', tip: 'tooltip.title | 气泡提示文案' },
    setter: 'StringSetter',
  },
  {
    title: '校验配置',
    display: 'popup',
    type: 'group',
    items: [
      {
        title: '必填校验',
        type: 'group',
        display: 'block',
        items: [
          {
            name: 'required',
            title: { label: '是否必填', tip: 'required | 是否必填' },
            setter: 'BoolSetter'
          },
          {
            name: 'message.required',
            title: { label: '错误提示', tip: 'message ｜ 错误提示' },
            setter: 'StringSetter'
          }
        ]
      },

      {
        title: '长度校验',
        type: 'group',
        display: 'block',
        items: [
          {
            name: 'min',
            title: { label: '最小长度', tip: 'min | 最小长度' },
            setter: 'NumberSetter'
          },
          {
            name: 'message.min',
            title: { label: '错误提示', tip: 'message ｜ 错误提示' },
            setter: 'StringSetter'
          },
          {
            name: 'max',
            title: { label: '最大长度', tip: 'max | 最大长度' },
            setter: 'NumberSetter'
          },
          {
            name: 'message.max',
            title: { label: '错误提示', tip: 'message ｜ 错误提示' },
            setter: 'StringSetter'
          }
        ]
      },

      {
        title: '类型校验',
        type: 'group',
        display: 'block',
        items: [
          {
            name: 'format',
            title: { label: '输入类型', tip: 'type | 输入类型' },
            setter: {
              componentName: 'SelectSetter',
              props: {
                options: [
                  {
                    title: '图片格式',
                    value: 'iamge',
                  },
                  {
                    title: '颜色色值格式',
                    value: 'color',
                  },
                  {
                    title: '邮箱格式',
                    value: 'email',
                  },
                  {
                    title: '网址格式',
                    value: 'url',
                  }
                ]
              }
            }
          },
          {
            name: 'message.image',
            title: { label: '错误提示', tip: 'message.image ｜ 错误提示' },
            setter: 'StringSetter',
            condition: (target: any) => target.getProps().getPropValue('format') === 'iamge'
          },
          {
            name: 'message.color',
            title: { label: '错误提示', tip: 'message.color ｜ 错误提示' },
            setter: 'StringSetter',
            condition: (target: any) => target.getProps().getPropValue('format') === 'color'
          },
          {
            name: 'message.email',
            title: { label: '错误提示', tip: 'message.email ｜ 错误提示' },
            setter: 'StringSetter',
            condition: (target: any) => target.getProps().getPropValue('format') === 'email'
          },
          {
            name: 'message.url',
            title: { label: '错误提示', tip: 'message.url ｜ 错误提示' },
            setter: 'StringSetter',
            condition: (target: any) => target.getProps().getPropValue('format') === 'url'
          }
        ]
      },
      {
        title: '正则校验',
        type: 'group',
        display: 'block',
        items: [
          {
            name: 'pattern',
            title: { label: '正则表达式', tip: 'pattern | 正则' },
            setter: 'StringSetter'
          },
          {
            name: 'message.pattern',
            title: { label: '错误提示', tip: 'message.pattern ｜ 错误提示' },
            setter: 'StringSetter'
          }
        ]
      }
    ]
  },
  {
    type: 'group',
    title: '更多属性，请点击进入配置',
    display: 'popup',
    items: [
      {
        name: 'extra',
        title: { label: '额外提示', tip: 'extra | 额外的提示信息'},
        setter: 'StringSetter'
      },
      {
        name: 'disabled',
        title: { label: '禁用', tip: 'disabled | 禁用' },
        setter: 'JsonSetter'
      },
      {
        name: 'hidden',
        title: { label: '隐藏', tip: 'hidden | 隐藏' },
        setter: 'JsonSetter'
      },
      {
        name: 'readOnly',
        title: { label: '只读', tip: 'readOnly | 只读' },
        setter: 'JsonSetter'
      }
    ]
  }
];

export const formItemProps = [
  {
    title: '基础配置',
    display: 'accordion',
    type: 'group',
    items: props
  } 
];

const meta = {
  componentName: 'FormItem',
  title: '高级表单项',
  docUrl: '',
  screenshot: '',
  devMode: 'proCode',
  npm: {
    package: '@ali/form-render-material',
    version: '0.0.1',
    exportName: 'FormItem',
    main: 'src/index.tsx',
    destructuring: true,
    subName: '',
  },
  category: '表单容器',
  group: '高级组件',
  props: formItemProps,
  configure: {
    supports: {
      className: true,
      style: true,
      events: [
        {
          name: 'onRefresh',
          description: '点击点击刷新的回调	',
          template: 'function onRefresh(){}',
        },
      ],
    },
    component: {
      isContainer: true,
      isModal: false,
      isMinimalRenderUnit: true,
    },
  },
};

export default {
  ...meta,
  icon: 'https://img.alicdn.com/imgextra/i4/O1CN01gxzRdT1hm9KXRbZkU_!!6000000004319-2-tps-200-200.png',
};
