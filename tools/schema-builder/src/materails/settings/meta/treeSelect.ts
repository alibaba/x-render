import { mergeProps, createMeta } from '../utils';

const props = mergeProps({
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
    // {
    //   name: 'props.showArrow',
    //   title: {
    //     label: '下拉图标',
    //     tip: '是否显示下拉图标，单选模式下默认 `true`',
    //   },
    //   setter: 'BoolSetter',
    //   defaultValue: true,
    // },
    // {
    //   name: 'props.showSearch',
    //   title: { label: '是否支持搜索框', tip: '是否支持搜索框' },
    //   setter: 'BoolSetter',
    // },
    // {
    //   name: 'props.notFoundContent',
    //   title: { label: '搜索为空提示文案', tip: '搜索为空提示文案' },
    //   setter: 'StringSetter',
    //   condition: (target: any) => !!target.getProps().getPropValue('props.showSearch'),
    // },
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
    },
    // {
    //   name: 'props.labelInValue',
    //   title: {
    //     label: '值包含标签',
    //     tip:
    //       '是否把每个选项的 label 包装到 value 中，会把 value 类型从 `string` 变为 {value: string, label: ReactNode, halfChecked(treeCheckStrictly 时有效): string[] } 的格式',
    //   },
    //   setter: 'BoolSetter',
    // },
    // {
    //   name: 'props.listHeight',
    //   title: { label: '设置弹窗滚动高度', tip: '设置弹窗滚动高度' },
    //   setter: 'NumberSetter',
    //   defaultValue: 256,
    // },
    // {
    //   name: 'props.maxTagCount',
    //   title: { label: '最多显示多少个 tag', tip: '最多显示多少个 tag' },
    //   setter: 'NumberSetter',
    // },
  ],
}, 
{
  name: 'default',
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

export default createMeta('TreeSelect', {
  title: '树选择',
  category: '其他',
  props,
  snippets
});
