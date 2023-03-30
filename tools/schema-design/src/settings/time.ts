import { mergeProps, createMeta } from './utils';

const props = mergeProps({
  title: '控件配置',
  display: 'accordion',
  type: 'group',
  items: [
    {
      name: 'allowClear',
      title: { label: '支持清除', tip: '是否允许清除' },
      defaultValue: true,
      setter: 'BoolSetter'
    },
    {
      name: 'clearText',
      title: { label: '清除按钮的提示文案', tip: '清除按钮的提示文案' },
      setter: 'StringSetter'
    },
    {
      name: 'format',
      title: { label: '展示的时间格式', tip: '展示的时间格式' },
      setter: 'StringSetter',
    },
    {
      name: 'hideDisabledOptions',
      title: { label: '隐藏禁止选择的选项', tip: '隐藏禁止选择的选项' },
      defaultValue: false,
      setter: 'BoolSetter'
    },
    {
      name: 'hourStep',
      title: { label: '小时选项间隔', tip: '小时选项间隔' },
      setter: 'NumberSetter',
    },
    {
      name: 'minuteStep',
      title: { label: '分钟选项间隔', tip: '分钟选项间隔' },
      setter: 'NumberSetter',
    },
 
    {
      name: 'secondStep',
      title: { label: '秒选项间隔', tip: '秒选项间隔' },
      setter: 'NumberSetter',
    },
    {
      name: 'showNow',
      title: { label: '“此刻”按钮', tip: '面板是否显示“此刻”按钮' },
      defaultValue: true,
      setter: 'BoolSetter'
    },
  ]
}, 
{
  name: 'default',
  title: { label: '默认值', tip: 'default | 默认值'},
  setter: 'TimeSetter'
},
{
  name: 'field.placeholder',
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
    screenshot: 'https://img.alicdn.com/imgextra/i2/O1CN01i8Swoy1GB3hrSPWQd_!!6000000000583-2-tps-352-430.png',
    schema: {
      componentName: 'Time',
      props: {
        title: '时间选择',
        type: 'string',
        format: 'time',
      }
    }
  }
];

export default createMeta('Time', {
  title: '时间选择',
  props,
  snippets
});