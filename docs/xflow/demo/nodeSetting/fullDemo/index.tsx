import React from 'react';
import XFlow from '@xrenders/xflow';
import { settings } from './settings';
import CustomSvg from './CustomSvg';


const initialValues = {
  nodes: [
    {
      id: 'start',
      type: 'Start',
      data: {
        name: 'AI 助手流程',
        description: '一个基于 LLM 的智能助手流程',
        variables: [
          {
            name: 'userInput',
            type: 'string',
            defaultValue: '',
          },
        ],
      },
      position: {
        x: 100,
        y: 200,
      },
    },
    {
      id: 'llm',
      type: 'LLM',
      data: {
        model: 'gpt-3.5',
        temperature: 0.7,
        maxTokens: 2000,
        systemPrompt: '你是一个专业的AI助手，请用简洁专业的语言回答问题。',
      },
      position: {
        x: 400,
        y: 200,
      },
    },
    {
      id: 'knowledge',
      type: 'knowledge',
      data: {
        knowledgeBase: '产品文档',
        searchLimit: 5,
        similarity: 0.7,
      },
      position: {
        x: 700,
        y: 200,
      },
    },
    {
      id: 'end',
      type: 'End',
      data: {
        output: '处理完成',
      },
      position: {
        x: 1000,
        y: 200,
      },
    },
  ],
  edges: [
    {
      id: 'start-llm',
      source: 'start',
      target: 'llm',
    },
    {
      id: 'llm-knowledge',
      source: 'llm',
      target: 'knowledge',
    },
    {
      id: 'knowledge-end',
      source: 'knowledge',
      target: 'end',
    },
  ],
};



const Demo = () => {
  return (
    <div style={{ width: '100%', height: '600px' }}>
      <XFlow
        settings={settings}
        initialValues={initialValues}
        widgets={{CustomSvg}}
      />
    </div>
  );
};

export default Demo;
