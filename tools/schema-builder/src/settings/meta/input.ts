import { createMeta, inputPropsBasic } from '../utils';

export default createMeta('Inputx', {
  title: '单行文本',
  priority: 1000,
  props: [
    {
      title: '基础配置',
      type: 'group',
      display: 'accordion',
      items: inputPropsBasic
    },
    {
      title: '其他配置',
      type: 'group',
      display: 'accordion',
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
    }
  ],
  snippets: [{
    label: '单行文本',
    screenshot: 'icon-input',
    schema: {
      componentName: 'Input',
      props: {
        title: '单行文本',
        type: 'string'
      }
    }
  }]
});
