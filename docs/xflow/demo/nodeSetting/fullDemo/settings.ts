export const settings= [
  {
    title: '流程控制',
    type: '_group',
    items: [
      {
        title: '开始',
        type: 'Start',
        description: '自定义SVG形式的图标',
        icon: {
          bgColor: '#17B26A', // icon背景颜色
        },
        iconSvg: 'CustomSvg',  // 传入字符串形式的 SVG
        settingSchema: {
          type: 'object',
          properties: {
            name: {
              title: '流程名称',
              type: 'string',
              widget: 'input',
              required: true,
            },
            description: {
              title: '流程描述',
              type: 'string',
              widget: 'textarea',
            },
            variables: {
              title: '流程变量',
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: {
                    title: '变量名',
                    type: 'string',
                    required: true,
                  },
                  type: {
                    title: '变量类型',
                    type: 'string',
                    enum: ['string', 'number', 'boolean'],
                    default: 'string',
                  },
                  defaultValue: {
                    title: '默认值',
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
      {
        title: '结束',
        type: 'End',
        description: '自定义图片形式的图标',
        icon: {
          bgColor: '#DACFF3',
        },
        iconSvg: 'CustomImg',  // 图标图片组件
        imgSrc: 'https://img.alicdn.com/tfs/TB17UtINiLaK1RjSZFxXXamPFXa-606-643.png', // 图片地址
        settingSchema: {
          type: 'object',
          properties: {
            output: {
              title: '输出结果',
              type: 'string',
              widget: 'textarea',
            },
          },
        },
      },
    ],
  },
  {
    title: 'AI 能力',
    type: '_group',
    items: [
      {
        title: 'LLM',
        type: 'LLM',
        description: '调用大语言模型回答问题或者对自然语言进行处理',
        icon: {
          bgColor:'#FFACF8',
        },
        iconSvg: 'CustomImg',  // 图标图片组件
        imgSrc: 'https://img.alicdn.com/imgextra/i2/O1CN01Lu3elm1XLSPBGqvPi_!!6000000002907-2-tps-200-200.png', // 图片
        settingSchema: {
          type: 'object',
          properties: {
            model: {
              title: '模型选择',
              type: 'string',
              enum: ['gpt-3.5', 'gpt-4', 'claude-2', 'claude-3'],
              default: 'gpt-3.5',
            },
            temperature: {
              title: '温度',
              type: 'number',
              default: 0.7,
              minimum: 0,
              maximum: 1,
              description: '控制输出的随机性，值越高输出越随机',
            },
            maxTokens: {
              title: '最大Token数',
              type: 'number',
              default: 2000,
              minimum: 1,
              maximum: 4000,
            },
            systemPrompt: {
              title: '系统提示词',
              type: 'string',
              widget: 'textarea',
              description: '设置AI助手的角色和行为',
            },
            stopSequences: {
              title: '停止序列',
              type: 'array',
              items: {
                type: 'string',
              },
              description: '设置停止生成的关键词',
            },
          },
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
          type: 'object',
          properties: {
            prompt: {
              title: '提示词',
              type: 'string',
              widget: 'textarea',
              default: '请帮我完成以下任务：',
            },
            variables: {
              title: '变量替换',
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: {
                    title: '变量名',
                    type: 'string',
                    required: true,
                  },
                  value: {
                    title: '变量值',
                    type: 'string',
                  },
                },
              },
            },
            examples: {
              title: '示例',
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  input: {
                    title: '输入',
                    type: 'string',
                    widget: 'textarea',
                  },
                  output: {
                    title: '输出',
                    type: 'string',
                    widget: 'textarea',
                  },
                },
              },
            },
          },
        },
      },
    ],
  },
  {
    title: '数据处理',
    type: '_group',
    items: [
      {
        title: '知识库',
        type: 'knowledge',
        description: '允许你从知识库中查询与用户问题相关的文本内容',
        icon: {
          type: 'icon-knowledge',
          bgColor: '#6172F3',
        },
        settingSchema: {
          type: 'object',
          properties: {
            knowledgeBase: {
              title: '知识库选择',
              type: 'string',
              enum: ['产品文档', '技术文档', '用户手册', 'API文档'],
              default: '产品文档',
            },
            searchLimit: {
              title: '检索限制',
              type: 'number',
              default: 5,
              minimum: 1,
              maximum: 10,
            },
            similarity: {
              title: '相似度阈值',
              type: 'number',
              default: 0.7,
              minimum: 0,
              maximum: 1,
              description: '设置检索结果的相似度阈值',
            },
            filters: {
              title: '过滤条件',
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: {
                    title: '字段',
                    type: 'string',
                    required: true,
                  },
                  operator: {
                    title: '操作符',
                    type: 'string',
                    enum: ['equals', 'contains', 'greaterThan', 'lessThan'],
                    default: 'equals',
                  },
                  value: {
                    title: '值',
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
      {
        title: '数据转换',
        type: 'transform',
        description: '对数据进行格式转换和处理',
        icon: {
          type: 'icon-function-add-line1',
          bgColor: '#F79009',
        },
        settingSchema: {
          type: 'object',
          properties: {
            inputType: {
              title: '输入类型',
              type: 'string',
              enum: ['json', 'text', 'csv', 'xml'],
              default: 'json',
            },
            outputType: {
              title: '输出类型',
              type: 'string',
              enum: ['json', 'text', 'csv', 'xml'],
              default: 'json',
            },
            mapping: {
              title: '字段映射',
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  source: {
                    title: '源字段',
                    type: 'string',
                    required: true,
                  },
                  target: {
                    title: '目标字段',
                    type: 'string',
                    required: true,
                  },
                  transform: {
                    title: '转换规则',
                    type: 'string',
                    widget: 'textarea',
                  },
                },
              },
            },
          },
        },
      },
    ],
  },
];