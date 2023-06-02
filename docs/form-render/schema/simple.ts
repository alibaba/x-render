export default {
  type: 'object',
  properties: {
    input: {
      title: '输入框',
      type: 'string'
    },
    input1: {
      title: '输入框',
      type: 'string'
    },
    select: {
      title: '下拉框',
      type: 'string',
      xxx: "{{ formData.input }}",
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