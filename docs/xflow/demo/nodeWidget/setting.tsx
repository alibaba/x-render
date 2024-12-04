export default [
  {
    title: '开始',
    type: 'Start',
    hidden: true,
    targetHandleHidden: true,
    icon: {
      type: 'icon-start',
      bgColor: '#17B26A',
    },
    settingSchema: {
      type: "object",
      properties: {
        input: {
          title: '变量一',
          type: 'string',
          widget: 'input',
        },
        select: {
          title: '变量二',
          type: 'string',
          widget: 'select',
          props: {
            options: [
              { label: 'a', value: 'a' },
              { label: 'b', value: 'b' },
              { label: 'c', value: 'c' },
            ],
          },
        },
      }
    },
    nodeWidget:'customNodeWidget'
  },
  {
    title: '结束',
    type: 'End',
    hidden: true,
    sourceHandleHidden: true,
    icon: {
      type: 'icon-end',
      bgColor: '#F79009',
    },
    settingSchema: {
      type: "object",
      properties: {
        input: {
          title: '结束原因',
          type: 'string',
          widget: 'textArea',
        },
      }
    },
    nodeWidget: 'endNodeWidget',
  },
  {
    title: 'LLM',
    type: 'LLM',
    description: '调用大语言模型回答问题或者对自然语言进行处理',
    icon: {
      type: 'icon-model',
      bgColor: '#6172F3',
    },
    settingSchema: {
      type: 'object',
      displayType: 'row',
      labelCol: 6,
      fieldCol:18,
      properties: {
        input1: {
          title: 'Field A',
          type: 'string',
        },
        input2: {
          title: 'Field B',
          type: 'string'
        },
        input3: {
          title: 'Field C',
          type: 'string'
        },
        input4: {
          title: 'Field D',
          type: 'string'
        }
      }
    },
    nodeWidget: 'LLMNodeWidget',
  },
];
