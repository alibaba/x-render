import { mergeProps, createMeta } from '../utils';

const props = mergeProps({
  title: '其他配置',
  display: 'accordion',
  type: 'group',
  items: [
    {
      name: 'props.checkedChildren',
      title: { label: '选中时内容', tip: 'checkedChildren | 选中时内容' },
      setter: 'StringSetter',
    },
    {
      name: 'props.unCheckedChildren',
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
    screenshot: 'icon-switch',
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