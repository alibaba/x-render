import { mergeProps, createMeta, optionsMeta } from './utils';

const props: any = mergeProps([
  optionsMeta,
], 
{
  name: 'defaultValue',
  title: { label: '默认值', tip: 'defaultValue | 默认值'},
  setter: 'JsonSetter'
});

const snippets = [
  {
    title: '点击单选',
    screenshot: 'https://img.alicdn.com/imgextra/i3/O1CN01huVKZh1QTVp6xjmOD_!!6000000001977-2-tps-434-84.png',
    schema: {
      componentName: 'Radio',
      props: {
        title: '点击单选',
        type: 'string',
        props: {
          options: [
            {
              label: 'A',
              value: 'A'
            },
            {
              label: 'B',
              value: 'B'
            },
            {
              label: 'C',
              value: 'C'
            }
          ]
        }
      }
    }
  }
];

export default createMeta('Radio', {
  title: '单选框',
  props,
  snippets,
  priority: 997,
});