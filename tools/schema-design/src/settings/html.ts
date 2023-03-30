import { mergeProps, createMeta } from './utils';

const props: any = mergeProps({
  title: '控件配置',
  display: 'accordion',
  type: 'group',
  items: [
    {
      name: 'value',
      title: { label: '展示内容', tip: 'value | 展示的 html 页面内容'},
      setter: 'StringSetter'
    }
  ]
}, 
{
  name: 'default',
  title: { label: '默认值', tip: 'default | 默认值'},
  setter: 'StringSetter'
});

export default createMeta('FHtml', {
  title: 'HTML',
  category: '其他控件',
  props,
  // snippets
});
