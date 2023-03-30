import { mergeProps, createMeta } from './utils';

const props: any = mergeProps({
  title: '其他配置',
  display: 'accordion',
  type: 'group',
  items: []
}, 
{
  name: 'defaultValue',
  title: { label: '默认值', tip: 'default | 默认值'},
  setter: 'BoolSetter'
});

const snippets = [
  {
    title: '是否选择',
    screenshot:
      'https://img.alicdn.com/imgextra/i1/O1CN01JOz44J1JpJN3gWewN_!!6000000001077-2-tps-208-44.png',
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
