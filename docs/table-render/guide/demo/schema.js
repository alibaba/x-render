// 可以使用schema编辑器配置 https://form-render.github.io/schema-generator/
export const searchSchema = {
  schema: {
    type: 'object',
    properties: {
      state: {
        title: '状态',
        type: 'string',
        enum: ['open', 'closed', 'processing'],
        enumNames: ['未解决', '已解决', '解决中'],
        'ui:width': '25%',
      },
      labels: {
        title: '标签',
        type: 'string',
        'ui:width': '25%',
      },
      created_at: {
        title: '创建时间',
        type: 'string',
        format: 'date',
        'ui:width': '25%',
      },
    },
  },
  displayType: 'row',
  showDescIcon: true,
  labelWidth: 80,
};
