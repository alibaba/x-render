import { createMeta, getInputPropsBasic } from '../utils';

export default createMeta('TreeSelect', {
  title: '树选择',
  category: '其他',
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
    {
      title: '其他配置',
      display: 'accordion',
      type: 'group',
      items: [
        {
          name: 'props.treeData',
          title: { label: '数据源', tip: '数据源' },
          setter: 'JsonSetter',
        },
        {
          name: 'props.multiple',
          title: {
            label: '支持多选',
            tip: '支持多选（当设置 treeCheckable 时自动变为 true）',
          },
          setter: 'BoolSetter',
        },
        {
          name: 'props.allowClear',
          title: { label: '支持清除', tip: '是否允许清除' },
          setter: 'BoolSetter',
        },
        {
          name: 'props.treeCheckable',
          title: { label: '显示勾选框', tip: '显示勾选框' },
          setter: 'BoolSetter',
        },
        {
          name: 'props.treeDefaultExpandAll',
          title: { label: '默认展开所有树节点', tip: '默认展开所有树节点' },
          setter: 'BoolSetter',
        }
      ],
    }
  ],
  snippets: [
    {
      label: '树选择',
      screenshot: 'icon-tree',
      schema: {
        componentName: 'TreeSelect',
        props: {
          title: '树选择',
          props: {
            treeData: [
              {
                value: 'parent 1',
                title: 'parent 1',
                children: [
                  {
                    value: 'parent 1-0',
                    title: 'parent 1-0',
                    children: [
                      {
                        value: 'leaf1',
                        title: 'leaf1',
                      },
                      {
                        value: 'leaf2',
                        title: 'leaf2',
                      },
                    ],
                  },
                ]
              }
            ]
          }
        }
      }
    }
  ]
});
