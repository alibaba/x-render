import { mergeProps, createMeta } from '../utils';

const props: any = mergeProps({
  title: '其他配置',
  display: 'accordion',
  type: 'group',
  items: []
}, 
{
  name: 'default',
  title: { label: '默认值', tip: 'default | 默认值'},
  setter: 'StringSetter'
});

const snippets = [
  {
    title: 'Html',
    screenshot: 'icon-html',
    schema: {
      componentName: 'Html',
      props: {
        title: 'Html',
      },
    }
  }
];

export default createMeta('Html', {
  title: 'HTML',
  category: '其他',
  props,
  snippets
});
