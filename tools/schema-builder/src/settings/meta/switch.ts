import { createMeta, getNotInputPropsBasic } from '../utils';

export default createMeta('Switch', {
  title: '开关',
  priority: 993,
  props: [
    {
      title: '基础配置',
      type: 'group',
      display: 'accordion',
      items: getNotInputPropsBasic({
        name: 'defaultValue',
        title: { label: '默认值', tip: 'defaultValue | 默认值'},
        setter: 'BoolSetter'
      })
    },
    {
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
    }
  ],
  snippets: [
    {
      label: '开关',
      screenshot: 'icon-switch',
      schema: {
        componentName: 'Switch',
        props: {
          title: '开关',
          type: 'boolean'
        }
      }
    }
  ]
});