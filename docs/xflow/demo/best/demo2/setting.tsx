export const settingSchema = {
  properties: {
    type: 'array',
    widget: 'simpleList',
    props: {
      hideCopy: true,
      hideMove: true,
    },
    className: 'parallel-wrap',
    items: {
      type: 'object',
      properties: {
        name: {
          title: '名称',
          type: 'string',
          props: {
            allowClear: true,
          },
          className: 'child-title',
          readOnlyWidget: 'ReadOnlyPanel',
        },
        value: {
          title: 'value',
          type: 'string',
          props: {
            allowClear: true,
          },
          className: 'child-title',
          readOnlyWidget: 'ReadOnlyPanel',
        },
      },
    },
  },
};

export const activitySchema = {
  title: '工具',
  type: '_group',
  items: [
    {
      title: '知识检索',
      type: 'LLM',
      description: '允许你从知识库中查询与用户问题相关的文本内容',
      icon: {
        type: 'icon-knowledge',
        bgColor: '#fa541c',
      },
      hideDesc: true,
      nodePanel: {
        width: 510,
      },
      settingSchema: {
        type: 'object',
        className: 'settingSchemaStyle',
        properties: {
          ...settingSchema,
        },
      },
    },
    {
      title: '问题分类器',
      type: 'Prompt',
      description: '定义问题的分类条件',
      icon: {
        type: 'icon-prompt',
        bgColor: '#875BF7',
      },
      hideDesc: true,
      nodePanel: {
        width: 510,
      },
      settingSchema: {
        type: 'object',
        className: 'settingSchemaStyle',
        properties: {
          ...settingSchema,
        },
      },
    },
    {
      title: '代码执行',
      type: 'userTask', // exclusiveGateway
      description: '执行一段代码实现自定义逻辑',
      icon: {
        type: 'icon-code',
        bgColor: 'pink',
      },
      hideDesc: true,
      nodePanel: {
        width: 510,
      },
      settingSchema: {
        type: 'object',
        className: 'settingSchemaStyle',
        properties: {
          ...settingSchema,
        },
      },
    },
    {
      title: 'HTTP请求',
      type: 'callActivity',
      description: '允许通过 HTTP 协议发送服务器请求',
      icon: {
        type: 'icon-http',
        bgColor: '#2E90FA',
      },
      hideDesc: true,
      nodePanel: {
        width: 510,
      },
      settingSchema: {
        type: 'object',
        className: 'settingSchemaStyle',
        properties: {
          ...settingSchema,
        },
      },
    },
  ],
};

export const settings = [
  {
    title: '开始',
    type: 'Start',
    icon: {
      type: 'icon-start',
      bgColor: '#17B26A',
    },
  },
  {
    title: '条件判断',
    type: 'Switch',
    description:'条件判断',
    showTestingBtn: true,
    icon: {
      type: 'icon-switch',
      bgColor: '#FF8800',
    },
    settingSchema: {
      type: 'object',
      properties: {
        name: {
          title: '节点名称',
          type: 'string',
          required: true,
        },
        template: {
          title: '提示词模板',
          type: 'string',
          widget: 'textarea',
        },
      },
    },
  },
  {
    title: 'LLM',
    type: 'LLM',
    showTestingBtn: true,
    description:'LLM',
    icon: {
      // type: 'icon-model',
      bgColor: '#1890FF',
    },
    iconSvg:'CustomSvg',
    settingSchema: {
      type: 'object',
      properties: {
        name: {
          title: '节点名称',
          type: 'string',
          required: true,
        },
        model: {
          title: '模型选择',
          type: 'string',
          enum: ['gpt-3.5-turbo', 'gpt-4'],
          enumNames: ['GPT-3.5', 'GPT-4'],
          widget: 'select',
        },
        temperature: {
          title: '温度',
          type: 'number',
          min: 0,
          max: 1,
          widget: 'slider',
        },
      },
    },
  },
  {
    title: '人工任务',
    type: 'userTask',
    showTestingBtn: true,
    icon: {
      type: 'icon-knowledge',
      bgColor: '#6172F3',
    },
    settingSchema: {
      type: 'object',
      properties: {
        name: {
          title: '节点名称',
          type: 'string',
          required: true,
        },
        assignee: {
          title: '处理人',
          type: 'string',
        },
        description: {
          title: '任务描述',
          type: 'string',
          widget: 'textarea',
        },
      },
    },
  },
  {
    title: '合并节点',
    type: 'Merge',
    showTestingBtn: true,
    icon: {
      type: 'icon-gongju',
      bgColor: '#9E6BE6',
    },
    settingSchema: {
      type: 'object',
      properties: {
        name: {
          title: '节点名称',
          type: 'string',
          required: true,
        },
        strategy: {
          title: '合并策略',
          type: 'string',
          enum: ['compare', 'concat', 'custom'],
          enumNames: ['对比合并', '拼接合并', '自定义合并'],
          widget: 'select',
        },
      },
    },
  },
  {
    title: '格式化',
    type: 'Format',
    showTestingBtn: true,
    icon: {
      type: 'icon-code',
      bgColor: '#F759AB',
    },
    settingSchema: {
      type: 'object',
      properties: {
        name: {
          title: '节点名称',
          type: 'string',
          required: true,
        },
        format: {
          title: '格式类型',
          type: 'string',
          enum: ['markdown', 'html', 'text'],
          enumNames: ['Markdown', 'HTML', '纯文本'],
          widget: 'select',
        },
      },
    },
  },
  {
    title: '结束',
    type: 'End',
    icon: {
      type: 'icon-end',
      bgColor: '#FF4D4F',
    },
  },
];
