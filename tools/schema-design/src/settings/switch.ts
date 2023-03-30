import { mergeProps, createMeta } from './utils';

const props = mergeProps({
  title: '控件配置',
  display: 'accordion',
  type: 'group',
  items: [
    {
      name: 'checkedChildren',
      title: { label: '选中时内容', tip: 'checkedChildren | 选中时内容' },
      setter: 'StringSetter',
    },
    {
      name: 'unCheckedChildren',
      title: { label: '非选中时内容', tip: 'unCheckedChildren | 非选中时内容' },
      setter: 'StringSetter',
    }
  ]
}, 
{
  name: 'default',
  title: { label: '默认值', tip: 'default | 默认值'},
  setter: 'BoolSetter'
});

const snippets = [
  {
    label: '开关',
    screenshot:
      'https://img.alicdn.com/imgextra/i2/O1CN01yvM33m1XFxPk5qiQT_!!6000000002895-55-tps-160-16.svg',
    schema: {
      componentName: 'Switch',
      props: {
        title: '开关',
        type: 'boolean',
      },
    },
  },
];

export default createMeta('Switch', {
  title: '开关',
  props,
  snippets,
  priority: 993
});