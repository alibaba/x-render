import { mergeProps, createMeta } from '../utils';

const props = mergeProps({
  title: '其他配置',
  display: 'accordion',
  type: 'group',
  items: [
    {
      name: 'props.hideInput',
      title: {label: '隐藏输入框', tip: '隐藏输入框'},
      setter: 'BoolSetter',
    },
    // {
    //   name: 'props.schema.max',
    //   title: { label: '最大值', tip: '最大值' },
    //   setter: 'NumberSetter',
    // },
    // {
    //   name: 'props.schema.min',
    //   title: { label: '最小值', tip: '最小值' },
    //   setter: 'NumberSetter',
    // },
  ],
}, 
{
  name: 'default',
  title: { label: '默认值', tip: 'default | 默认值'},
  setter: 'NumberSetter'
});

const snippets = [
  {
    label: '滑动条',
    screenshot: 'icon-slider',
    schema: {
      componentName: 'Slider',
      props: {
        title: '滑动条'
      }
    }
  }
];

export default createMeta('Slider', {
  title: '滑动条',
  props,
  snippets,
  priority: 991
});
