import React from 'react';
import XFlow from '@xrenders/xflow';

export default () => {
  const nodeSettings = [
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
        type: 'object',
        properties: {
          input: {
            title: '变量一',
            type: 'string',
            widget: 'input',
          },
        },
      },
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
            title: '变量一',
            type: 'string',
            widget: 'input',
          },
        }
      }
    },
    {
      title: 'LLM',
      type: 'LLM',
      desc: '调用大语言模型回答问题或者对自然语言进行处理',
      icon: {
        type: 'icon-model',
        bgColor: '#6172F3',
      },
      settingSchema: {
        type: 'object',
        properties: {
          model: {
            title: '模型',
            type: 'string',
            enum: ['gpt-3.5', 'gpt-4'],
            default: 'gpt-3.5'
          },
          temperature: {
            title: '温度',
            type: 'number',
            default: 0.7,
            minimum: 0,
            maximum: 1
          }
        }
      }
    },
    {
      title: 'Prompt',
      type: 'Prompt',
      description: '通过精心设计提示词，提升大语言模型回答效果',
      icon: {
        type: 'icon-prompt',
        bgColor: '#17B26A',
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
    },
  ];


  const initialValues = {
    nodes: [
      {
        id: 'start',
        type: 'Start',
        data: {
          input: '开始节点'
        },
        position: {
          x: 100,
          y: 100
        }
      },
      {
        id: 'llm',
        type: 'LLM',
        data: {
          model: 'gpt-3.5',
          temperature: 0.7
        },
        position: {
          x: 500,
          y: 100
        }
      },
      {
        id: 'prompt',
        type: 'Prompt',
        data: {},
        position: {
          x: 900,
          y: 100
        }
      },
      {
        id: 'end',
        type: 'End',
        data: {
          input: '结束节点'
        },
        position: {
          x: 1200,
          y: 100
        }
      }
    ],
    edges: [
      {
        id: 'start-llm',
        source: 'start',
        target: 'llm'
      },
      {
        id: 'llm-prompt',
        source: 'llm',
        target: 'prompt'
      },
      {
        id: 'prompt-end',
        source: 'prompt',
        target: 'end'
      }
    ]
  };


  return (
     <div style={{ height: '600px' }}>
      <XFlow
        settings={nodeSettings}
        initialValues={initialValues}
      />
     </div>
  );
}
