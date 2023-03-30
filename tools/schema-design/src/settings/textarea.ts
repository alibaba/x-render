import { mergeProps, createMeta } from './utils';

const props = mergeProps({
  title: '控件配置',
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
      title: { label: '最小长度', tip: 'maxLength | 内容最小长度' },
      setter: 'NumberSetter'
    },
    {
      name: 'props.maxLength',
      title: { label: '最大长度', tip: 'maxLength | 内容最大长度' },
      setter: 'NumberSetter'
    },
  ]
});

const snippets = [
  {
    label: '文本框',
    screenshot:
      'https://img.alicdn.com/imgextra/i2/O1CN01olIJHD20nxg4G6K2R_!!6000000006895-2-tps-820-324.png',
    schema: {
      componentName: 'Textarea',
      props: {
        title: '文本框',
        type: 'string',
      }
    }
  }
]

export default createMeta('Textarea', {
  title: '文本框',
  priority: 995,
  props,
  snippets,
});
