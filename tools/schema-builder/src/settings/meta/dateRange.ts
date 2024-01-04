import { createMeta, getInputPropsBasic } from '../utils';

export default createMeta('DateRange', {
  title: '日期选择区间',
  props: [
    {
      title: '基础配置',
      type: 'group',
      display: 'accordion',
      items: getInputPropsBasic({
        name: 'defaultValue',
        title: { label: '默认值', tip: 'defaultValue | 默认值'},
        setter: 'CustomDateRangeSetter'
      },
      {
        name: 'props.placeholder',
        title: {
          label: '提示文字',
          tip: 'placeholder | 输入框提示文字',
        },
        setter: 'JsonSetter',
        defaultValue: ['开始时间', '结束时间']
      })
    },
  ],
  snippets: [
    {
      title: '日期区间选择',
      screenshot: 'icon-date',
      schema: {
        componentName: 'DateRange',
        props: {
          title: '日期区间选择',
          type: 'range',
          format: 'date',
        }
      }
    }
  ]
});