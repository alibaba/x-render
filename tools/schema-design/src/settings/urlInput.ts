import { mergeProps, createMeta } from './utils';

const props: any = mergeProps({
  title: '控件配置',
  display: 'accordion',
  type: 'group',
  items: [
    {
      name: 'addonText',
      title: { label: '按钮文案', tip: '跳转按钮的文案配置' },
      defaultValue: '测试链接',
      setter: 'StringSetter'
    }
  ]
}, 
{
  name: 'default',
  title: { label: '默认值', tip: 'default | 默认值'},
  setter: 'StringSetter'
});

const snippets = [
  {
    title: '链接输入框',
    screenshot: 'https://img.alicdn.com/imgextra/i4/O1CN01BKBPBa1HV2bpH2bIT_!!6000000000762-2-tps-433-44.png',
    schema: {
      componentName: 'UrlInput',
      props: {
        label: '链接输入框',
      },
    }
  }
];

export default createMeta('UrlInput', {
  title: '链接输入框',
  category: '其他控件',
  props,
  // snippets
});
