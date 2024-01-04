const props = [
  {
    name: 'title',
    title: { label: '标题', tip: 'title | 标题' },
    setter: 'StringSetter',
  },
  {
    name: 'code',
    title: { label: '字段名', tip: 'key | 字段名' },
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
    title: { label: '补充说明', tip: 'description | 补充说明' },
    setter: 'StringSetter',
  },
  {
    name: 'tooltip.title',
    title: { label: '气泡提示', tip: 'tooltip.title | 气泡提示文案' },
    setter: 'StringSetter',
  },
  {
    name: 'extra',
    title: { label: '额外提示', tip: 'extra | 额外的提示信息'},
    setter: 'StringSetter'
  },
  {
    name: 'disabled',
    title: { label: '禁用', tip: 'disabled | 禁用' },
    setter: 'FrExpressionSetter'
  },
  {
    name: 'hidden',
    title: { label: '隐藏', tip: 'hidden | 隐藏' },
    setter: 'FrExpressionSetter'
  },
  {
    name: 'readOnly',
    title: { label: '只读', tip: 'readOnly | 只读' },
    setter: 'FrExpressionSetter'
  },
  {
    name: 'readOnlyWidget',
    title: { label: '只读组件', tip: 'readOnlyWidget | 只读组件' },
    setter: 'StringSetter',
    condition: (target: any) => !!target.getProps().getPropValue('readOnly')
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
  group: '基础组件',
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
