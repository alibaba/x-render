import { mergeProps, createMeta } from '../utils';

// const props = mergeProps({
//   title: '其他配置',
//   display: 'accordion',
//   type: 'group',
//   items: [
//     // {
//     //   name: 'picker',
//     //   title: {
//     //     label: '日期类型',
//     //     tip: 'picker | 选择器日期类型',
//     //   },
//     //   defaultValue: 'date',
//     //   setter: {
//     //     componentName: 'SelectSetter',
//     //     props: {
//     //       options: [
//     //         {
//     //           title: '日期',
//     //           value: 'date',
//     //         },
//     //         {
//     //           title: '周',
//     //           value: 'week',
//     //         },
//     //         {
//     //           title: '月份',
//     //           value: 'month',
//     //         },
//     //         {
//     //           title: '季度',
//     //           value: 'quarter',
//     //         },
//     //         {
//     //           title: '年份',
//     //           value: 'year',
//     //         }
//     //       ]
//     //     }
//     //   },
//     // },
//     // {
//     //   name: 'format',
//     //   title: {
//     //     label: '日期格式',
//     //     tip: 'format | 设置日期格式',
//     //   },
//     //   defaultValue: 'YYYY-MM-DD',
//     //   setter: 'StringSetter'
//     // },
//     {
//       name: 'props.allowClear',
//       title: {
//         label: '支持清除',
//         tip: 'allowClear | 是否允许清除',
//       },
//       defaultValue: true,
//       setter: 'BoolSetter'
//     },
//     {
//       name: 'props.showToday',
//       title: {
//         label: '展示今天按钮',
//         tip: 'showToday | 是否展示今天按钮',
//       },
//       defaultValue: true,
//       setter: 'BoolSetter'
//     }
//   ]
// }, 
// {
//   name: 'defaultValue',
//   title: { label: '默认值', tip: 'defaultValue | 默认值'},
//   setter: 'CustomDateSetter'
// },
// {
//   name: 'props.placeholder',
//   title: {
//     label: '提示文字',
//     tip: 'placeholder | 输入框提示文字',
//   },
//   defaultValue: '请选择日期',
//   setter: 'StringSetter'
// });

const props = mergeProps(
{
  name: 'defaultValue',
  title: { label: '默认值', tip: 'defaultValue | 默认值'},
  setter: 'CustomDateSetter'
},
{
  name: 'props.placeholder',
  title: {
    label: '提示文字',
    tip: 'placeholder | 输入框提示文字',
  },
  defaultValue: '请选择日期',
  setter: 'StringSetter'
});

const snippets = [
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

export default createMeta('DatePicker', {
  title: '日期选择',
  props,
  snippets
});