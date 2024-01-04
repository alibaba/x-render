import { mergeProps, createMeta } from '../utils';

const props = mergeProps({
  title: '其他配置',
  display: 'accordion',
  type: 'group',
  items: [
    {
      name: 'props.allowClear',
      title: { label: '支持清除', tip: '是否允许清除' },
      setter: 'BoolSetter',
      defaultValue: true,
    },
    {
      name: 'props.allowHalf',
      title: { label: '支持半选', tip: '支持半选' },
      setter: 'BoolSetter',
    },
    {
      name: 'props.count',
      title: { label: '总数', tip: 'star 总数' },
      setter: 'NumberSetter',
      defaultValue: 5,
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
    screenshot: 'icon-rate',
    schema: {
      componentName: 'Rate',
      props: {
        title: '评分'
      }
    }
  }
];

export default createMeta('Rate', {
  title: '评分',
  props,
  snippets,
  priority: 992
});
