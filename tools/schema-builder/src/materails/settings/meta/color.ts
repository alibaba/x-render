import { mergeProps, createMeta } from '../utils';

const props: any = mergeProps(
{
  name: 'default',
  title: { label: '默认值', tip: 'default | 默认值'},
  setter: 'StringSetter'
});

const snippets = [
  {
    title: '颜色选择',
    screenshot:'icon-color',
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
  category: '其他',
  props,
  snippets
});
