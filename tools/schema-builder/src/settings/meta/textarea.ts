import { createMeta, inputPropsBasic } from '../utils';

export default createMeta('TextArea', {
  title: '多行文本',
  priority: 995,
  props: [
    {
      title: '基础配置',
      type: 'group',
      display: 'accordion',
      items: inputPropsBasic
    },
    {
      title: '其他配置',
      display: 'accordion',
      type: 'group',
      items: [
        {
          name: 'props.allowClear',
          title: { label: '支持清除', tip: 'allowClear | 支持清除' },
          setter: 'BoolSetter'
        },
        {
          name: 'props.showCount',
          title: { label: '展示字数', tip: 'showCount ｜ 是否展示字数' },
          setter: 'BoolSetter',
        },
        {
          name: 'props.autoSize',
          title: { label: '高度自动', tip: 'autoSize ｜ 文本域高度自适应内容' },
          setter: 'BoolSetter',
        },
        {
          name: 'props.rows',
          title: { label: '指定行数', tip: 'minRows | 指定显示的行数' },
          setter: 'NumberSetter',
        },
        {
          name: 'props.minLength',
          title: { label: '最小长度', tip: 'minLength | 内容最小长度' },
          setter: 'NumberSetter'
        },
        {
          name: 'props.maxLength',
          title: { label: '最大长度', tip: 'maxLength | 内容最大长度' },
          setter: 'NumberSetter'
        },
      ]
    }
  ],
  snippets: [
    {
      label: '多行文本',
      screenshot: 'icon-textarea',
      schema: {
        componentName: 'TextArea',
        props: {
          title: '多行文本',
          type: 'string'
        }
      }
    }
  ]
});
