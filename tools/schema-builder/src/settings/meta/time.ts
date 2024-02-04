import { createMeta, getInputPropsBasic } from '../utils';

export default createMeta('TimePicker', {
  title: '时间选择',
  props: [
    {
      title: '基础配置',
      type: 'group',
      display: 'accordion',
      items: getInputPropsBasic({
        name: 'defaultValue',
        title: { label: '默认值', tip: 'default | 默认值'},
        setter: 'CustomTimeSetter'
      })
    }
  ],
  snippets: [
    {
      title: '时间选择',
      screenshot: 'icon-time',
      schema: {
        componentName: 'TimePicker',
        props: {
          title: '时间选择',
          type: 'string',
          format: 'time'
        }
      }
    }
  ]
});