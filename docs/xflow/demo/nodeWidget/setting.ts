const settings = [
  {
    type: 'Start',
    title: '开始节点',
    hidden: true,
    targetHandleHidden: true,
    icon: {
      type: 'icon-start',
      bgColor: '#17B26A',
    },
    settingSchema: {
      type: 'object',
      properties: {
        input: {
          type: 'string',
          title: '输入',
        },
      },
    },
  },
  {
    type: 'LLM',
    title: 'LLM 处理',
    icon: {
      type: 'icon-model',
      bgColor: '#6172F3',
    },
    nodeWidget: 'LLMNodeWidget',
    className: 'node-llm-style',
    settingSchema: {
      type: 'object',
      properties: {
        model: {
          type: 'string',
          title: '模型',
          widget: 'select',
          enum: ['GPT-4', 'GPT-3.5', 'Claude'],
          default: 'GPT-4',
        },
        temperature: {
          type: 'number',
          title: '温度',
          widget: 'slider',
          minimum: 0,
          maximum: 1,
          default: 0.7,
        },
        maxTokens: {
          type: 'number',
          title: '最大Token',
          default: 200,
        },
        systemPrompt: {
          type: 'string',
          title: '系统提示词',
          default: '你是一个专业的AI助手，请帮助用户解决问题。',
        },
      },
    },
  },
  {
    type: 'HTTP',
    title: 'HTTP请求',
    icon: {
      type: 'icon-http',
      bgColor: '#875BF7',
    },
    nodeWidget: 'HTTPNodeWidget',
    settingSchema: {
      type: 'object',
      properties: {
        method: {
          type: 'string',
          title: '请求方法',
          widget: 'select',
          enum: ['GET', 'POST', 'PUT', 'DELETE'],
          default: 'POST',
        },
        url: {
          type: 'string',
          title: '请求地址',
          default: 'https://api.example.com/process',
        },
        headers: {
          type: 'string',
          title: '请求头',
          default: JSON.stringify({ 'Content-Type': 'application/json' }),
        },
        body: {
          type: 'string',
          title: '请求体',
          default: JSON.stringify({ key: 'value' }),
        },
      },
    },
  },
  {
    type: 'Classifier',
    title: '问题分类',
    icon: {
      type: 'icon-gongju',
      bgColor: '#2E90FA',
    },
    nodeWidget: 'ClassifierNodeWidget',
    settingSchema: {
      type: 'object',
      properties: {
        categories: {
          type: 'array',
          title: '分类',
          widget: 'select',
          enum: ['技术问题', '业务问题', '其他'],
          default: ['技术问题', '业务问题', '其他'],
        },
        rules: {
          type: 'string',
          title: '规则',
          default: '根据问题描述的关键词进行分类',
        },
        defaultCategory: {
          type: 'string',
          title: '默认分类',
          widget: 'select',
          enum: ['技术问题', '业务问题', '其他'],
          default: '其他',
        },
      },
    },
  },
  {
    type: 'End',
    title: '结束节点',
    hidden: true,
    sourceHandleHidden: true,
    icon: {
      type: 'icon-end',
      bgColor: '#F79009',
    },
    settingSchema: {
      type: 'object',
      properties: {
        input: {
          type: 'string',
          title: '输入',
          widget: 'input',
        },
      },
    },
  },
];

export default settings;
