import { createMeta, getInputPropsBasic } from '../utils';

export default createMeta('DatePicker', {
  title: '日期选择',
  props: [
    {
      title: '基础配置',
      type: 'group',
      display: 'accordion',
      items: getInputPropsBasic({
        name: 'defaultValue',
        title: { label: '默认值', tip: 'defaultValue | 默认值'},
        setter: 'CustomDateSetter'
      })
    },
  ],
  snippets: [
    {
      title: '日期选择',
      screenshot: 'icon-date',
      schema: {
        componentName: 'DatePicker',
        props: {
          title: '日期选择',
          type: 'string'
        }
      }
    }
  ]
});