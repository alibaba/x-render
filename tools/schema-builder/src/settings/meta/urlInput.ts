import { createMeta, inputPropsBasic } from '../utils';

export default createMeta('UrlInput', {
  title: '链接输入框',
  category: '其他',
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
          name: 'props.addonText',
          title: { label: '按钮文案', tip: '跳转按钮的文案配置' },
          defaultValue: '测试链接',
          setter: 'StringSetter'
        }
      ]
    }
  ],
  snippets: [
    {
      title: '链接输入框',
      screenshot: 'icon-link',
      schema: {
        componentName: 'UrlInput',
        props: {
          title: '链接输入框',
        },
      }
    }
  ]
});
