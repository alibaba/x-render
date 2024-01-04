import { mergeProps, createMeta } from '../utils';

const props = mergeProps({
  title: '其他配置',
  display: 'accordion',
  type: 'group',
  items: [
    {
      name: 'props.prefix',
      title: { label: '前缀', tip: 'prefix | 前缀' },
      setter: 'StringSetter'
    },
    {
      name: 'props.suffix',
      title: { label: '后缀', tip: 'suffix | 后缀' },
      setter: 'StringSetter'
    },
    {
      name: 'props.addonBefore',
      title: { label: '前置标签', tip: 'addonBefore | 前置标签' },
      setter: 'StringSetter'
    },
    {
      name: 'props.addonAfter',
      title: { label: '后置标签', tip: 'addonAfter | 后置标签' },
      setter: 'StringSetter'
    },
    {
      name: 'props.allowClear',
      title: { label: '支持清除', tip: 'allowClear | 支持清除' },
      setter: 'BoolSetter'
    }
  ]
});

const snippets = [
  {
    label: '单行文本',
    screenshot: 'icon-input',
    schema: {
      componentName: 'Input',
      props: {
        title: '单行文本',
        type: 'string'
      }
    }
  }
];

export default createMeta('Input', {
  title: '单行文本',
  props,
  snippets,
  priority: 1000
});
