import { mergeProps, createMeta, optionsMeta } from './utils';

const props: any = mergeProps([
  optionsMeta,
], 
{
  name: 'defaultValue',
  title: { label: '默认值', tip: 'defaultValue | 默认值'},
  setter: 'JsonSetter'
});

const snippets = [{
  title: '点击多选',
  screenshot: 'https://img.alicdn.com/imgextra/i3/O1CN014GIEpI24GlQhk5aYx_!!6000000007364-2-tps-452-54.png',
  schema: {
    componentName: 'Checkboxes',
    props: {
      title: '点击多选',
      type: 'array',
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
}];

export default createMeta('Checkboxes', {
  title: '点击多选框',
  priority: 996,
  props,
  snippets
});