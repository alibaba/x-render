import { mergeProps, createMeta } from '../utils';

const props = mergeProps({
  title: '其他配置',
  display: 'accordion',
  type: 'group',
  items: [
    {
      name: 'props.options',
      title: { label: '选项配置', tip: '选项配置' },
      setter: 'JsonSetter',
    },
    {
      name: 'props.multiple',
      title: { label: '支持多选', tip: '支持多选节点' },
      setter: 'BoolSetter',
    },
    {
      title: '多选配置',
      display: 'popup',
      type: 'group',
      items: [
        {
          name: 'props.maxTagCount',
          title: { label: '最大显示数量', tip: '最多显示多少个 tag' },
          setter: 'NumberSetter',
        }
      ],
      condition: (target: any) => {
        return !!target.parent.getPropValue("props.multiple")
      },
    },
    {
      name: 'props.showSearch',
      title: { label: '支持搜索', tip: '在选择框中显示搜索框' },
      setter: 'BoolSetter',
    },
    {
      name: 'props.notFoundContent',
      title: { label: '搜索为空提示文案', tip: '搜索为空提示文案' },
      setter: 'StringSetter',
      condition: (target: any) => !!target.getProps().getPropValue('F.showSearch'),
    },
    {
      name: 'props.allowClear',
      title: { label: '支持清除', tip: '是否允许清除' },
      setter: 'BoolSetter',
      defaultValue: true,
    },
    {
      name: 'props.changeOnSelect',
      title: {
        label: '点选触发',
        tip: '点选每级菜单选项值都会触发onChange',
      },
      setter: 'BoolSetter',
    },
    {
      name: 'props.expandTrigger',
      title: { label: '菜单触发方式', tip: '触发次级菜单的展开的方式' },
      setter: [
        {
          componentName: 'RadioGroupSetter',
          props: {
            options: [
              {
                title: '点击',
                value: 'click',
              },
              {
                title: '悬浮',
                value: 'hover',
              },
            ],
          },
        },
      ],
      defaultValue: 'click',
    },
    {
      name: 'props.placement',
      title: { label: '浮层预设位置', tip: '浮层预设位置' },
      setter: [
        {
          componentName: 'RadioGroupSetter',
          props: {
            options: [
              {
                title: '顶左',
                value: 'topLeft',
              },
              {
                title: '顶右',
                value: 'topRight',
              },
              {
                title: '底左',
                value: 'bottomLeft',
              },
              {
                title: '底右',
                value: 'bottomRight',
              },

            ]
          }
        }
      ]
    }
  ]
}, 
{
  name: 'defaultValue',
  title: { label: '默认值', tip: 'default | 默认值'},
  setter: 'JsonSetter'
},
{
  name: 'props.placeholder',
  title: { label: '提示文字', tip: 'placeholder | 提示文字' },
  setter: 'StringSetter',
  defaultValue: '请选择'
});

const snippets = [
  {
    label: '级联选择',
    screenshot: 'https://img.alicdn.com/imgextra/i1/O1CN01kdq0Ab22ZQL0wXyBR_!!6000000007134-55-tps-183-133.svg',
    schema: {
      componentName: 'Cascader',
      props: {
        title: '级联选择',
        props: {
          options: [
            {
              "value": 'zhejiang',
              "label": 'Zhejiang',
              "children": [
                {
                  "value": 'hangzhou',
                  "label": 'Hangzhou',
                  "children": [
                    {
                      "value": 'xihu',
                      "label": 'West Lake',
                    }
                  ]
                }
              ]
            }
          ]
        }
      }
    }
  }
];

export default createMeta('Cascader', {
  title: '级联选择',
  category: '其他',
  props,
  // snippets
});
