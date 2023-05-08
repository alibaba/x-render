export default {
  type: 'object',
  displayType: 'row',
  properties: {
    void1: {
      title: '常用组件',
      type: 'void',
      widget: 'voidTitle'
    },
    input1: {
      title: '输入框',
      type: 'string',
      widget: 'input'
    },
    number1: {
      title: '数字输入框',
      type: 'number',
      widget: 'inputNumber'
    },
    select1: {
      title: '下拉单选',
      type: 'string',
      widget: 'select',
      props: {
        options: [
          { label: '早', value: 'a' },
          { label: '中', value: 'b' },
          { label: '晚', value: 'c' }
        ]
      }
    },
    multiSelect1: {
      title: '多选',
      type: 'array',
      widget: 'multiSelect',
      description: '下拉多选',
      props: {
        options: [
          { label: '杭州', value: 'a' },
          { label: '武汉', value: 'b' },
          { label: '湖州', value: 'c' },
          { label: '贵阳', value: 'd' }
        ]
      }
    },
    radio1: {
      title: '点击单选',
      type: 'string',
      widget: 'radio',
      props: {
        options: [
          { label: '早', value: 'a' },
          { label: '中', value: 'b' },
          { label: '晚', value: 'c' }
        ]
      }
    },
    checkboxes1: {
      title: '点击多选',
      type: 'array',
      widget: 'checkboxes',
      props: {
        options: [
          { label: '杭州', value: 'a' },
          { label: '武汉', value: 'b' },
          { label: '湖州', value: 'c' },
          { label: '贵阳', value: 'd' }
        ]
      }
    },
    textarea1: {
      title: '长文本',
      type: 'string',
      widget: 'textArea'
    },
    date1: {
      title: '日期选择',
      type: 'string',
      widget: 'datePicker'
    },
    dateRange1: {
      title: '日期范围',
      type: 'range',
      widget: 'dateRange'
    },
    time1: {
      title: '时间选择',
      type: 'string',
      widget: 'timePicker'
    },
    timeRange1: {
      title: '时间范围',
      type: 'range',
      widget: 'timeRange'
    },
    void2: {
      title: '其他组件',
      type: 'void',
      widget: 'voidTitle'
    },
    html1: {
      title: 'HTML',
      type: 'string',
      widget: 'html'
    },
    switch1: {
      title: '开关',
      type: 'boolean',
      widget: 'switch'
    },
    checkbox1: {
      title: '是否选择',
      type: 'boolean',
      widget: 'checkbox'
    },
    slider1: {
      title: '带滑动条',
      type: 'number',
      widget: 'slider'
    },
    image1: {
      title: '图片展示',
      type: 'string',
      widget: 'imageInput'
    },
    color1: {
      title: '颜色选择',
      type: 'string',
      widget: 'color'
    },
    url1: {
      title: '链接',
      type: 'string',
      widget: 'urlInput'
    }
  }
};