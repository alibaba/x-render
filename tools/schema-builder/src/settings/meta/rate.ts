import { createMeta, getNotInputPropsBasic } from '../utils';

export default createMeta('Rate', {
  title: '评分',
  priority: 992,
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
    }
  ],
  snippets: [
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
  ]
});
