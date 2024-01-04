
import { createMeta } from '../utils';

export default createMeta('FormRender', {
  title: '表单',
  group: '基础组件',
  category: '表单',
  props: [
    {
      title: '表单布局',
      display: 'accordion',
      type: 'group',
      items: [
        {
          name: 'displayType',
          title: {
            label: '标签位置',
            tip: 'displayType ｜ 标签的展示位置',
          },
          defaultValue: 'row',
          setter: {
            componentName: 'RadioGroupSetter',
            props: {
              options: [
                {
                  title: '水平居左',
                  value: 'row'
                },
                {
                  title: '垂直居上',
                  value: 'column'
                },
                {
                  title: '紧凑',
                  value: 'inline'
                }
              ]
            }
          }
        },
        {
          name: 'column',
          title: {
            label: '一行多列',
            tip: 'column ｜ 一行多列',
          },
          defaultValue: 1,
          setter: {
            componentName: 'RadioGroupSetter',
            props: {
              options: [
                {
                  title: '一列',
                  value: 1
                },
                {
                  title: '两列',
                  value: 2
                },
                {
                  title: '三列',
                  value: 3
                },
                {
                  title: '四列',
                  value: 4
                }
              ]
            }
          }
        },
        {
          name: 'labelWidth',
          title: {
            label: '标签宽度',
            tip: 'labelWidth ｜ 标签宽度',
          },
          setter: 'NumberSetter'
        }
      ]
    },
    {
      title: '标签和控件栅格总数不能超过24',
      display: 'block',
      type: 'group',
      items: [
        {
          name: 'labelCol',
          title: {
            label: '标签栅格数',
            tip: 'labelCol | 栅格占位格数',
          },
          setter: {
            componentName: 'NumberSetter',
            props: {
              min: 0,
              max: 24
            }
          }
        },
        {
          name: 'fieldCol',
          title: {
            label: '控件栅格数',
            tip: 'fieldCol | 栅格占位格数'
          },
          setter: {
            componentName: 'NumberSetter',
            props: {
              min: 0,
              max: 24
            }
          }
        },
        {
          name: 'maxWidth',
          title: {
            label: '最大宽度',
            tip: 'maxWidth ｜ 最大宽度'
          },
          defaultValue: '340px',
          setter: 'StringSetter'
        }
      ]
    }
  ],
  configure: {
    supports: {
      loop: false,
      condition: false
    },
    component: {
      isContainer: true,
      isModal: false
    }
  }
});

