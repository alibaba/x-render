import { mergeProps, createMeta } from './utils';

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
    label: '输入框',
    screenshot: 'https://img.alicdn.com/imgextra/i4/O1CN01pTb4a71Wo1FlXgdep_!!6000000002834-2-tps-432-114.png',
    schema: {
      componentName: 'FInput',
      props: {
        title: '输入框aaa',
        type: 'string'
      }
    }
  }
];

export default createMeta('FInput', {
  title: '输入框',
  props,
  snippets,
  priority: 1000
});
