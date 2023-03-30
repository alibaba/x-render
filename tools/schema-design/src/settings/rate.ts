import { mergeProps, createMeta } from './utils';

const props = mergeProps({
  title: '控件配置',
  display: 'accordion',
  type: 'group',
  items: [
    {
      name: 'allowClear',
      title: { label: '支持清除', tip: '是否允许清除' },
      setter: 'BoolSetter',
      defaultValue: true,
    },
    {
      name: 'allowHalf',
      title: { label: '支持半选', tip: '支持半选' },
      setter: 'BoolSetter',
    },
    {
      name: 'count',
      title: { label: '总数', tip: 'star 总数' },
      setter: 'NumberSetter',
      defaultValue: 5,
    },
    {
      name: 'tooltips',
      title: { label: '提示信息', tip: '自定义每项的提示信息' },
      setter: 'JsonSetter',
    },
  ]
}, 
{
  name: 'default',
  title: { label: '默认值', tip: 'default | 默认值'},
  setter: 'NumberSetter'
});

const snippets = [
  {
    label: '评分',
    screenshot:
      'https://img.alicdn.com/imgextra/i1/O1CN01y7nLjI29jgW5BLt0U_!!6000000008104-55-tps-180-24.svg',
    schema: {
      componentName: 'Rate',
      props: {
        title: '评分'
      },
    }
  }
];

export default createMeta('Rate', {
  title: '评分',
  props,
  snippets,
  priority: 992
});
