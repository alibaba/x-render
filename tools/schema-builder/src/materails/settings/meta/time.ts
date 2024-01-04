import { mergeProps, createMeta } from '../utils';

const props = mergeProps(
{
  name: 'defaultValue',
  title: { label: '默认值', tip: 'default | 默认值'},
  setter: 'CustomTimeSetter'
},
{
  name: 'props.placeholder',
  title: {
    label: '提示文字',
    tip: 'placeholder | 输入框提示文字',
  },
  defaultValue: '请选择时间',
  setter: 'StringSetter',
});

const snippets = [
  {
    title: '时间选择',
    screenshot: 'icon-time',
    schema: {
      componentName: 'TimePicker',
      props: {
        title: '时间选择',
        type: 'string',
        format: 'time',
      }
    }
  }
];

export default createMeta('TimePicker', {
  title: '时间选择',
  props,
  snippets
});