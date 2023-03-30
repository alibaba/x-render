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
    //   }
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
    // {
    //   name: 'valueType',
    //   title: {
    //     label: '提交格式',
    //     tip: 'valueType | 日期提交时格式',
    //   },
    //   defaultValue: 'moment',
    //   setter:  {
    //     componentName: 'SelectSetter',
    //     props: {
    //       options: [
    //         { title: '默认moment', value: 'moment' },
    //         { title: '毫秒数(YYYY-MM-DD 23:59:59)', value: 'milliseconds-limit'},
    //         { title: '毫秒数(YYYY-MM-DD 00:00:00)', value: 'milliseconds-zero' },
    //         { title: '毫秒数(当前时间毫秒数)', value: 'milliseconds-current' },
    //         { title: 'YYYY-MM-DD', value: 'YYYY-MM-DD'},
    //         { title: 'YYYYMMDD', value: 'YYYYMMDD'},
    //         { title: 'YYYY/MM/DD', value: 'YYYY/MM/DD'}
    //       ]
    //     }
    //   }
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
    },
    // {
    //   name: 'showTime',
    //   title: {
    //     label: '时间选择',
    //     tip: 'showTime | 是否能选择时间',
    //   },
    //   propType: 'bool',
    //   setter: 'BoolSetter',
    //   setValue(target: any, showTime: any) {
    //     if (showTime) {
    //       return target.getNode().setPropValue('F.format', 'YYYY-MM-DD hh:mm:ss'); 
    //     }
    //     target.getNode().setPropValue('F.format', 'YYYY-MM-DD'); 
    //   },
    // },
    // {
    //   name: 'disabledDate',
    //   title: {
    //     label: '不可选日期',
    //     tip: 'disabledDate | 不可选择的日期',
    //   },
    //   setter: [
    //     {
    //       componentName: 'MethodSetter',
    //       props: {
    //         template:
    //           'disabledDate(currentDate,${extParams}){\n// 设置不可选择的日期\nreturn true\n}',
    //       }
    //     }
    //   ]
    // }
  ]
}, 
{
  name: 'defaultValue',
  title: { label: '默认值', tip: 'defaultValue | 默认值'},
  setter: 'DateRangeSetter'
},
{
  name: 'props.placeholder',
  title: {
    label: '提示文字',
    tip: 'placeholder | 输入框提示文字',
  },
  setter: 'JsonSetter',
  defaultValue: ['开始时间', '结束时间']
});


const snippets = [
  {
    title: '日期选择区间',
    screenshot: 'https://img.alicdn.com/imgextra/i2/O1CN01eifAQq29O9u5YZ3nc_!!6000000008057-2-tps-572-632.png',
    schema: {
      componentName: 'DateRange',
      props: {
        title: '日期选择区间',
        type: 'string',
        format: 'dateTime',
      }
    }
  }
]


export default createMeta('FDateRange', {
  title: '日期选择区间',
  props,
  snippets,
});