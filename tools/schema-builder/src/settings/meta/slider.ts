import { createMeta, getNotInputPropsBasic } from '../utils';

export default createMeta('Slider', {
  title: '滑动条',
  priority: 991,
  props: [
    {
      title: '基础配置',
      type: 'group',
      display: 'accordion',
      items: getNotInputPropsBasic({
        name: 'defaultValue',
        title: { label: '默认值', tip: 'defaultValue | 默认值'},
        setter: 'NumberSetter'
      })
    },
    {
      title: '其他配置',
      display: 'accordion',
      type: 'group',
      items: [
        {
          name: 'props.hideInput',
          title: {label: '隐藏输入框', tip: '隐藏输入框'},
          setter: 'BoolSetter',
        }
      ]
    }
  ],
  snippets: [
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
  ]
});
