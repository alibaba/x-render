import React from 'react';
import XFlow from '@xrenders/xflow';

const settings = [
  {
    title: '流程控制',
    type: '_group',
    items: [
      {
        title: '开始',
        type: 'Start',
        description: '流程开始节点',
        targetHandleHidden: true,
        hidden:true,
        icon: {
          type: 'icon-start',
          bgColor: '#17B26A',
        },
        settingSchema: {
          type: 'object',
          properties: {
            name: {
              title: '流程名称',
              type: 'string',
              widget: 'input',
              required: true,
            },
          },
        },
      },
      {
        title: '结束',
        type: 'End',
        description: '流程结束节点',
        hidden: true,
        sourceHandleHidden:true,
        icon: {
          type: 'icon-end',
          bgColor: '#F79009',
        },
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
        description: '调用大语言模型',
        icon: {
          type: 'icon-model',
          bgColor: '#6172F3',
        },
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
            },
          },
        },
      },
      {
        title: 'Prompt',
        type: 'Prompt',
        description: '提示词模板',
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
        description: '知识库检索',
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
          },
        },
      },
      {
        title: '数据转换',
        type: 'transform',
        description: '数据格式转换',
        icon: {
          type: 'icon-prompt',
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
          },
        },
      },
    ],
  },
];

const initialValues = {
  nodes: [
    {
      id: 'start',
      type: 'Start',
      data: {
        name: '数据分析流程',
        description: '基于LLM的数据分析系统',
        variables: [
          {
            name: 'dataSource',
            type: 'string',
            defaultValue: 'csv',
          },
          {
            name: 'analysisType',
            type: 'string',
            defaultValue: 'trend',
          },
        ],
      },
      position: {
        x: 400,
        y: 50,
      },
    },
    {
      id: 'transform1',
      type: 'transform',
      data: {
        inputType: 'csv',
        outputType: 'json',
        mapping: [
          {
            source: 'date',
            target: 'timestamp',
            transform: 'new Date(${date}).getTime()',
          },
          {
            source: 'value',
            target: 'amount',
            transform: 'parseFloat(${value})',
          },
        ],
      },
      position: {
        x: 200,
        y: 200,
      },
    },
    {
      id: 'transform2',
      type: 'transform',
      data: {
        inputType: 'json',
        outputType: 'text',
        mapping: [
          {
            source: 'summary',
            target: 'description',
            transform: '${summary}',
          },
        ],
      },
      position: {
        x: 600,
        y: 200,
      },
    },
    {
      id: 'llm1',
      type: 'LLM',
      data: {
        model: 'gpt-3.5',
        temperature: 0.7,
        maxTokens: 2000,
        systemPrompt: '你是一个专业的数据分析师，请分析数据趋势。',
        stopSequences: ['\n\n', '。'],
      },
      position: {
        x: 200,
        y: 350,
      },
    },
    {
      id: 'knowledge1',
      type: 'knowledge',
      data: {
        knowledgeBase: '技术文档',
        searchLimit: 5,
        similarity: 0.7,
        filters: [
          {
            field: 'type',
            operator: 'equals',
            value: 'analysis',
          },
        ],
      },
      position: {
        x: 200,
        y: 450,
      },
    },
    {
      id: 'prompt1',
      type: 'Prompt',
      data: {
        prompt: '请分析数据趋势：',
        variables: [
          {
            name: 'dataType',
            value: '${analysisType}',
          },
        ],
        examples: [
          {
            input: '销售数据',
            output: '销售额呈现上升趋势，环比增长15%',
          },
        ],
      },
      position: {
        x: 600,
        y: 450,
      },
    },
    {
      id: 'llm2',
      type: 'LLM',
      data: {
        model: 'gpt-3.5',
        temperature: 0.7,
        maxTokens: 2000,
        systemPrompt: '你是一个专业的数据分析师，请生成分析报告。',
      },
      position: {
        x: 400,
        y: 700,
      },
    },
    {
      id: 'end',
      type: 'End',
      data: {
        output: '分析完成',
        status: 'success',
        message: '数据分析报告已生成',
      },
      position: {
        x: 400,
        y: 800,
      },
    },
  ],
  edges: [
    {
      id: 'start-transform1',
      source: 'start',
      target: 'transform1',
    },
    {
      id: 'start-transform2',
      source: 'start',
      target: 'transform2',
    },
    {
      id: 'transform1-llm1',
      source: 'transform1',
      target: 'llm1',
    },
    {
      id: 'transform2-prompt1',
      source: 'transform2',
      target: 'prompt1',
    },
    {
      id: 'llm1-knowledge1',
      source: 'llm1',
      target: 'knowledge1',
    },
    {
      id: 'knowledge1-llm2',
      source: 'knowledge1',
      target: 'llm2',
    },
    {
      id: 'prompt1-llm2',
      source: 'prompt1',
      target: 'llm2',
    },
    {
      id: 'llm2-end',
      source: 'llm2',
      target: 'end',
    },
  ],
};

const Demo = () => {
  return (
    <div style={{ width: '100%', height: '800px' }}>
      <XFlow
        settings={settings}
        initialValues={initialValues}
        layout="TB"
      />
    </div>
  );
};

export default Demo;
