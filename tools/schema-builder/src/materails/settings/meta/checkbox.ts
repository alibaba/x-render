import { mergeProps, createMeta } from '../utils';

const props: any = mergeProps(
{
  name: 'defaultValue',
  title: { label: '默认值', tip: 'default | 默认值'},
  setter: 'BoolSetter'
});

const snippets = [
  {
    title: '是否选择',
    screenshot:'icon-isNot',
    schema: {
      componentName: 'Checkbox',
      props: {
        title: '是否选择',
        type: 'boolean'
      },
    }
  }
];

export default createMeta('Checkbox', {
  title: '是否选择',
  props,
  snippets,
  priority: 994
});
