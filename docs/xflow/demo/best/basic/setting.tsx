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
      type: 'serviceTask',
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
      type: 'receiveTask',
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
    title: '事件',
    type: '_group',
    items: [
      {
        title: '开始',
        type: 'startEvent',
        description: '流程开始的节点，一个流程只允许有一个开始节点',
        icon: {
          type: 'icon-start',
          bgColor: '#17B26A',
        },
        targetHandleHidden: true,
        settingSchema: {
          type: 'object',
          className: 'settingSchemaStyle',
          properties: {
            string: {
              title: '字符串',
              description: '带清空x按钮',
              type: 'string',
              default: 'hello world',
              props: {
                allowClear: true,
              },
            },
            string2: {
              title: '复杂校验',
              description: 'pattern和message的用法',
              type: 'string',
              rules: [
                {
                  pattern: '^[A-Za-z0-9]+$',
                  message: '请输入数字或英文字母',
                },
              ],
              placeholder: '请输入数字或英文',
            },
            string3: {
              title: '长度控制',
              description: '长度在5-15个字之间',
              type: 'string',
              minLength: 5,
              maxLength: 15,
            },
            string4: {
              title: '前置/后置标签',
              type: 'string',
              props: {
                addonBefore: '长度',
                addonAfter: 'px',
              },
            },
            string5: {
              title: '前后缀',
              type: 'string',
              rules: [
                {
                  pattern: '^[0-9]+$',
                  message: '请输入数字',
                },
              ],
              props: {
                prefix: '￥',
                suffix: 'RMB',
              },
            },
            string6: {
              title: '置灰的输入框',
              type: 'string',
              disabled: true,
              default: 'hello world',
            },
            string7: {
              title: '文本框',
              description: '固定高度',
              type: 'string',
              format: 'textarea',
              props: {
                row: 4,
              },
            },
          },
          required: ['string4', 'string5'],
        },
      },
      {
        title: '结束',
        type: 'endEvent',
        description: '表示流程结束节点，可以有多个结束节点',
        icon: {
          type: 'icon-end',
          bgColor: '#F79009',
        },
        sourceHandleHidden: true,
        settingSchema: {
          type: 'object',
          className: 'settingSchemaStyle',
          properties: {
           nodeDesc: {
              title: '结束描述',
              type: 'string',
              format: 'textarea',
              placeholder: '根据内容缩放',
              props: {
                autoSize: {
                  minRows: 3,
                  maxRows: 5,
                },
             },
             readOnlyWidget: 'ReadOnlyPanel',
            },
          },
        },
      },
    ],
  },
  {
    title: '逻辑',
    type: '_group',
    items: [
      {
        title: '条件分支',
        type: 'Switch',
        description: '允许你根据 if/else 条件将 workflow 拆分成两个分支',
        icon: {
          type: 'icon-fenzhi',
          bgColor: '#6172F3',
        },
        nodePanel: {
          width: 550,
        },
        hideDesc: true,
        switchExtra: {
          hideElse: true,
          titleKey: 'name',
        },
        settingSchema: {
          type: 'object',
          className: 'settingSchemaStyle',
          properties: {
            list: {
              // title: '高级属性',
              type: 'array',
              widget: 'simpleList',
              props: {
                hideCopy: true,
                hideMove: true,
              },
              className: 'switch-list',
              items: {
                type: 'object',
                properties: {
                  name: {
                    title: '条件名称', // 条件描述
                    type: 'string',
                    props: {
                      allowClear: true,
                    },
                    className: 'child-title',
                    readOnlyWidget: 'ReadOnlyPanel',
                  },
                  type: {
                    title: '条件类型',
                    type: 'string',
                    widget: 'select',
                    props: {
                      allowClear: true,
                    },
                    enum: ['类型一'],
                    enumNames: ['类型一'],
                    className: 'child-title',
                    readOnlyWidget: 'ReadOnlyPanel',
                  },
                  value: {
                    title: '条件语句',
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
          },
        },
        nodeWidget: 'showSwitchNode',
      },
      {
        title: '并行事件',
        type: 'Parallel',
        description: '支持多个分支同时执行',
        icon: {
          type: 'icon-parallel',
          bgColor: '#06aed4',
        },
        hideDesc: true,
        nodePanel: {
          width: 510,
        },
        parallelExtra: {
          titleKey: 'name',
        },
        settingSchema: {
          type: 'object',
          className: 'settingSchemaStyle',
          properties: {
            properties: {
              title: 'Properties',
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
                    title: '属性名称',
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
            list: {
              title: '并行事件',
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
                    title: '事件名称',
                    type: 'string',
                    props: {
                      allowClear: true,
                    },
                    className: 'child-title',
                    readOnlyWidget: 'ReadOnlyPanel',
                  },
                  value: {
                    title: '事件描述',
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
          },
        },
      },
    ],
  },
  { ...activitySchema },
];
