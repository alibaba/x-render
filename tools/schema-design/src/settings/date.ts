import { mergeProps, createMeta } from './utils';

const props = mergeProps({
  title: '其他配置',
  display: 'accordion',
  type: 'group',
  items: [
    // {
    //   name: 'picker',
    //   title: {
    //     label: '日期类型',
    //     tip: 'picker | 选择器日期类型',
    //   },
    //   defaultValue: 'date',
    //   setter: {
    //     componentName: 'SelectSetter',
    //     props: {
    //       options: [
    //         {
    //           title: '日期',
    //           value: 'date',
    //         },
    //         {
    //           title: '周',
    //           value: 'week',
    //         },
    //         {
    //           title: '月份',
    //           value: 'month',
    //         },
    //         {
    //           title: '季度',
    //           value: 'quarter',
    //         },
    //         {
    //           title: '年份',
    //           value: 'year',
    //         }
    //       ]
    //     }
    //   },
    // },
    // {
    //   name: 'format',
    //   title: {
    //     label: '日期格式',
    //     tip: 'format | 设置日期格式',
    //   },
    //   defaultValue: 'YYYY-MM-DD',
    //   setter: 'StringSetter'
    // },
    {
      name: 'allowClear',
      title: {
        label: '支持清除',
        tip: 'allowClear | 是否允许清除',
      },
      defaultValue: true,
      setter: 'BoolSetter'
    },
    {
      name: 'showToday',
      title: {
        label: '展示今天按钮',
        tip: 'showToday | 是否展示今天按钮',
      },
      defaultValue: true,
      setter: 'BoolSetter'
    }
  ]
}, 
{
  name: 'defaultValue',
  title: { label: '默认值', tip: 'defaultValue | 默认值'},
  setter: 'DateSetter'
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
    screenshot: 'https://img.alicdn.com/imgextra/i2/O1CN01eifAQq29O9u5YZ3nc_!!6000000008057-2-tps-572-632.png',
    schema: {
      componentName: 'Date',
      props: {
        title: '日期选择',
        widget: 'date',
        type: 'string'
      }
    }
  }
]

export default createMeta('Date', {
  title: '日期选择',
  props,
  snippets
});