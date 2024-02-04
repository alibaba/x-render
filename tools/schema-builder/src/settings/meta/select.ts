import { createMeta, getInputPropsBasic, optionsProp } from '../utils';

export default createMeta('Select', {
  title: '下拉选择',
  priority: 998,
  props: [
    {
      title: '基础配置',
      type: 'group',
      display: 'accordion',
      items: getInputPropsBasic({
        name: 'defaultValue',
        title: { label: '默认值', tip: 'defaultValue | 默认值'},
        setter: 'JsonSetter'
      })
    },
    optionsProp
  ],
  snippets: [
    {
      title: '下拉单选',
      screenshot: 'icon-select',
      schema: {
        componentName: 'Select',
        props: {
          title: '下拉单选',
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
              }
            ]
          }
        }
      }
    },
    {
      title: '下拉多选',
      screenshot: 'icon-multiSelect',
      schema: {
        componentName: 'Select',
        props: {
          title: '下拉多选',
          type: 'array',
          widget: 'multiSelect',
          props: {
            options: [
              {
                label: 'A',
                value: 'A'
              },
              {
                label: 'B',
                value: 'B'
              }
            ]
          }
        }
      }
    }
  ]
});





