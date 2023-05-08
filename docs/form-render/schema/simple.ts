export default {
  type: 'object',
  properties: {
    input: {
      title: '输入框',
      type: 'string'
    },
    select: {
      title: '下拉框',
      type: 'string',
      props: {
        options: [
          { label: '早', value: 'a' },
          { label: '中', value: 'b' },
          { label: '晚', value: 'c' }
        ]
      }
    }
  }
};