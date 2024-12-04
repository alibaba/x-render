export default [
  {
    title: 'Switch',
    type: 'Switch',
    description: '允许你根据 if/else 条件将 workflow 拆分成两个分支',
    icon: {
      type: 'icon-switch',
      bgColor: '#06AED4',
    },
  },
  {
    title: 'Prompt',
    type: 'Prompt',
    description: '通过精心设计提示词，提升大语言模型回答效果',
    icon: {
      type: 'icon-prompt',
      bgColor: '#17B26A',
    },
    settingSchema: {
      type: "object",
      properties: {
        input: {
          title: '提示词',
          type: 'string',
          widget: 'textArea',
        },
      }
    },
  },
  {
    title: '知识库',
    type: 'knowledge',
    description: '允许你从知识库中查询与用户问题相关的文本内容',
    icon: {
      type: 'icon-knowledge',
      bgColor: '#6172F3',
    },
    settingSchema: {
      type: "object",
      properties: {
        input: {
          title: '知识库',
          type: 'string',
          widget: 'textArea',
        },
      }
    },
  },
];
