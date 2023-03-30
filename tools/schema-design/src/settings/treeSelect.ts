import { mergeProps, createMeta } from './utils';

const props = mergeProps({
  title: '控件配置',
  display: 'accordion',
  type: 'group',
  items: [
    {
      name: 'treeData',
      title: { label: '数据源', tip: '数据源' },
      setter: 'JsonSetter',
    },
    {
      name: 'multiple',
      title: {
        label: '支持多选',
        tip: '支持多选（当设置 treeCheckable 时自动变为 true）',
      },
      setter: 'BoolSetter',
    },
    {
      name: 'showArrow',
      title: {
        label: '下拉图标',
        tip: '是否显示下拉图标，单选模式下默认 `true`',
      },
      setter: 'BoolSetter',
      defaultValue: true,
    },
    {
      name: 'showSearch',
      title: { label: '是否支持搜索框', tip: '是否支持搜索框' },
      setter: 'BoolSetter',
    },
    {
      name: 'notFoundContent',
      title: { label: '搜索为空提示文案', tip: '搜索为空提示文案' },
      setter: 'StringSetter',
      condition: (target: any) => !!target.getProps().getPropValue('F.showSearch'),
    },
    {
      title: '更多属性，请点击进入配置',
      display: 'popup',
      type: 'group',
      items: [
        {
          name: 'allowClear',
          title: { label: '支持清除', tip: '是否允许清除' },
          setter: 'BoolSetter',
        },
        {
          name: 'autoClearSearchValue',
          title: {
            label: '自动清空搜索',
            tip: '当多选模式下值被选择，自动清空搜索框',
          },
          setter: 'BoolSetter',
          defaultValue: true,
        },
        {
          name: 'treeCheckable',
          title: { label: '显示勾选框', tip: '显示勾选框' },
          setter: 'BoolSetter',
        },
        {
          name: 'treeDefaultExpandAll',
          title: { label: '默认展开所有树节点', tip: '默认展开所有树节点' },
          setter: 'BoolSetter',
        },
        {
          name: 'labelInValue',
          title: {
            label: '值包含标签',
            tip:
              '是否把每个选项的 label 包装到 value 中，会把 value 类型从 `string` 变为 {value: string, label: ReactNode, halfChecked(treeCheckStrictly 时有效): string[] } 的格式',
          },
          setter: 'BoolSetter',
        },
        {
          name: 'listHeight',
          title: { label: '设置弹窗滚动高度', tip: '设置弹窗滚动高度' },
          setter: 'NumberSetter',
          defaultValue: 256,
        },
        {
          name: 'maxTagCount',
          title: { label: '最多显示多少个 tag', tip: '最多显示多少个 tag' },
          setter: 'NumberSetter',
        },
      ]
    }
  ],
}, 
{
  name: 'default',
  title: { label: '默认值', tip: 'default | 默认值'},
  setter: 'JsonSetter'
},
{
  name: 'field.placeholder',
  title: { label: '提示文字', tip: 'placeholder | 提示文字' },
  setter: 'StringSetter',
  defaultValue: '请选择'
});

const snippets = [
  {
    label: '树选择',
    screenshot:
      'https://img.alicdn.com/imgextra/i1/O1CN01d2zZDR1pR68EZzAwf_!!6000000005356-55-tps-141-110.svg',
    schema: {
      componentName: 'TreeSelect',
      props: {
        title: '树选择',
        field: {
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
  category: '其他控件',
  props,
  // snippets
});
