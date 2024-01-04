import { mergeProps, createMeta, optionsMeta } from '../utils';

const otherProps = [
  optionsMeta,
  // {
  //   title: '其他配置',
  //   display: 'accordion',
  //   type: 'group',
  //   items: [
  //     // {
  //     //   name: 'props.mode',
  //     //   title: { label: '选择模式', tip: 'props.mode ｜ 选择模式' },
  //     //   setter: {
  //     //     componentName: 'RadioGroupSetter',
  //     //     props: {
  //     //       options: [
  //     //         {
  //     //           title: '单选',
  //     //           value: 'single',
  //     //         },
  //     //         {
  //     //           title: '多选',
  //     //           value: 'multiple',
  //     //         },
  //     //         {
  //     //           title: 'tags',
  //     //           value: 'tags',
  //     //         }
  //     //       ]
  //     //     }
  //     //   }
  //     // },
  //     // {
  //     //   name: 'props.maxTagCount',
  //     //   title: { label: '最大个数', tip: 'props.maxTagCount ｜ 最多显示多少个tag' },
  //     //   condition(target: any) {
  //     //     return target.getProps().getPropValue('props.mode') === 'tags';
  //     //   },
  //     //   setter: 'NumberSetter'
  //     // },
  //     // {
  //     //   name: 'props.maxTagTextLength',
  //     //   title: { label: '文本长度', tip: 'props.maxTagTextLength ｜ 显示 tag 最大文本长度' },
  //     //   condition(target: any) {
  //     //     return target.getProps().getPropValue('props.mode') === 'tags';
  //     //   },
  //     //   setter: 'NumberSetter'
  //     // },
  //     // {
  //     //   name: 'props.allowClear',
  //     //   title: {
  //     //       label: '支持清除',
  //     //       tip: '是否支持清除',
  //     //   },
  //     //   setter: 'BoolSetter'
  //     // },
  //     // {
  //     //   name: 'props.showSearch',
  //     //   title: {
  //     //     label: '是否可搜索',
  //     //     tip: '是否可搜索',
  //     //   },
  //     //   setter: 'BoolSetter'
  //     // },
  //     // {
  //     //   name: 'props.notFoundContent',
  //     //   title: { label: '搜索为空提示文案', tip: '搜索为空提示文案' },
  //     //   setter: 'StringSetter',
  //     //   condition(target: any) {
  //     //     return !!target.getProps().getPropValue('props.showSearch');
  //     //   }
  //     // },
  //     // {
  //     //   name: 'props.showArrow',
  //     //   title: { label: '显示下拉箭头', tip: 'props.showArrow | 是否显示下拉小箭头' },
  //     //   setter: 'BoolSetter',
  //     //   defaultValue: true
  //     // }
  //   ]
  // }
];

const props = mergeProps(otherProps,
{
  name: 'defaultValue',
  title: { label: '默认值', tip: 'defaultValue | 默认值'},
  setter: 'JsonSetter'
},
{
  name: 'props.placeholder',
  title: { label: '提示文字', tip: 'placeholder | 提示文字' },
  defaultValue: '请选择',
  setter: 'StringSetter',
});

const snippets = [
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
];


export default createMeta('Select', {
  title: '下拉选择',
  props,
  snippets,
  priority: 998,
});





