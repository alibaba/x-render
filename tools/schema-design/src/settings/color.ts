import { mergeProps, createMeta } from './utils';

const props: any = mergeProps({
  title: '控件配置',
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
    title: '颜色选择',
    screenshot:'https://img.alicdn.com/imgextra/i4/O1CN01QI7ijH25H3Id8pojj_!!6000000007500-2-tps-740-76.png',
    schema: {
      componentName: 'Color',
      props: {
        title: '颜色选择',
      },
    }
  }
];

export default createMeta('Color', {
  title: '颜色选择',
  category: '其他控件',
  props,
  // snippets
});
