import { mergeProps, createMeta } from '../utils';

const props = mergeProps(
{
  name: 'defaultValue',
  title: { label: '默认值', tip: 'default | 默认值'},
  setter: 'CustomTimeRangeSetter'
},
{
  name: 'props.placeholder',
  title: {
    label: '提示文字',
    tip: 'placeholder | 输入框提示文字',
  },
  defaultValue: ['开始时间', '结束时间'],
  setter: 'JsonSetter',
});

const snippets = [
  {
    title: '时间区间选择',
    screenshot: 'icon-time',
    schema: {
      componentName: 'TimeRange',
      props: {
        title: '时间区间',
        type: 'range',
        format: 'time'
      }
    }
  }
];


export default createMeta('TimeRange', {
  title: '时间区间选择',
  props,
  snippets
});