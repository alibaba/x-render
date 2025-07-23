import React from 'react';
import XFlow from '@xrenders/xflow';
import { Space, Tag, Typography, Card } from 'antd';
import settings from './setting';
import './index.less';

// LLM 节点
const LLMNodeWidget = ({ data }) => {
  const { model, temperature, maxTokens, systemPrompt } = data;
  return (
    <Card
      size="small"
      bodyStyle={{ padding: '12px' }}
    >
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        <div style={{ padding: '8px 12px', background: '#f9fafb', borderRadius: 6 }}>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>模型</Typography.Text>
          <div style={{ marginTop: 4 }}>
            <Tag color="blue" style={{ margin: 0 }}>{model}</Tag>
          </div>
        </div>
        <div style={{ padding: '8px 12px', background: '#f9fafb', borderRadius: 6 }}>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>参数</Typography.Text>
          <div style={{ marginTop: 4 }}>
            <Space>
              <Tag style={{ margin: 0 }}>温度: {temperature}</Tag>
              <Tag style={{ margin: 0 }}>最大Token: {maxTokens}</Tag>
            </Space>
          </div>
        </div>
        <div style={{ padding: '8px 12px', background: '#f9fafb', borderRadius: 6 }}>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>系统提示词</Typography.Text>
          <div style={{ marginTop: 4 }}>
            <Typography.Text style={{ fontSize: 12 }}>{systemPrompt}</Typography.Text>
          </div>
        </div>
      </Space>
    </Card>
  );
};

// HTTP 请求节点
const HTTPNodeWidget = ({ data }) => {
  const { method, url, headers, body } = data;
  return (
    <Card
      size="small"
      bodyStyle={{ padding: '12px' }}
    >
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        <div style={{ padding: '8px 12px', background: '#f9fafb', borderRadius: 6 }}>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>请求</Typography.Text>
          <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Tag color={method === 'GET' ? 'green' : 'blue'} style={{ margin: 0 }}>{method}</Tag>
            <Typography.Text style={{ fontSize: 12 }} ellipsis={{tooltip:true}}>{url}</Typography.Text>
          </div>
        </div>
        <div style={{ padding: '8px 12px', background: '#f9fafb', borderRadius: 6 }}>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>请求头</Typography.Text>
          <div style={{ marginTop: 4 }}>
            <Typography.Text style={{ fontSize: 12 }}>{JSON.stringify(headers)}</Typography.Text>
          </div>
        </div>
        <div style={{ padding: '8px 12px', background: '#f9fafb', borderRadius: 6 }}>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>请求体</Typography.Text>
          <div style={{ marginTop: 4 }}>
            <Typography.Text style={{ fontSize: 12 }}>{JSON.stringify(body)}</Typography.Text>
          </div>
        </div>
      </Space>
    </Card>
  );
};

// 问题分类器节点
const ClassifierNodeWidget = ({ data }) => {
  const { categories = [], rules, defaultCategory } = data;
  return (
    <Card
      size="small"
      bodyStyle={{ padding: '12px' }}
    >
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        <div style={{ padding: '8px 12px', background: '#f9fafb', borderRadius: 6 }}>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>分类</Typography.Text>
          <div style={{ marginTop: 4 }}>
            <Space wrap>
              {(categories || [])?.map(cat => (
                <Tag
                  key={cat}
                  color={cat === defaultCategory ? 'purple' : 'default'}
                  style={{ margin: 0 }}
                >
                  {cat}
                </Tag>
              ))}
            </Space>
          </div>
        </div>
        <div style={{ padding: '8px 12px', background: '#f9fafb', borderRadius: 6 }}>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>规则</Typography.Text>
          <div style={{ marginTop: 4 }}>
            <Typography.Text style={{ fontSize: 12 }}>{rules}</Typography.Text>
          </div>
        </div>
      </Space>
    </Card>
  );
};

export default () => {
  const nodes = [
    {
      id: '1',
      type: 'Start',
      data: { input: '开始节点' },
      position: { x: 10, y: 270 },
      ports: [
        { id: 'right', type: 'output', group: 'right' }
      ]
    },
    {
      id: '2',
      type: 'LLM',
      data: {
        model: 'GPT-4',
        temperature: 0.7,
        maxTokens: 200,
        systemPrompt: '你是一个专业的AI助手，请帮助用户解决问题。'
      },
      position: { x: 300, y: 140 },
      ports: [
        { id: 'left', type: 'input', group: 'left' },
        { id: 'right', type: 'output', group: 'right' }
      ]
    },
    {
      id: '3',
      type: 'HTTP',
      data: {
        method: 'POST',
        url: 'https://api.example.com/process',
        headers: "{ 'Content-Type': 'application/json' }",
        body: "{ 'key': 'value' }"
      },
      position: { x: 600, y: 140 },
      ports: [
        { id: 'left', type: 'input', group: 'left' },
        { id: 'right', type: 'output', group: 'right' }
      ]
    },
    {
      id: '4',
      type: 'Classifier',
      data: {
        categories: ['技术问题', '业务问题', '其他'],
        rules: '根据问题描述的关键词进行分类',
        defaultCategory: '其他'
      },
      position: { x: 900, y: 140 },
      ports: [
        { id: 'left', type: 'input', group: 'left' },
        { id: 'right', type: 'output', group: 'right' }
      ]
    },
    {
      id: '7',
      type: 'End',
      data: { input: '结束节点' },
      position: { x: 1300, y: 270 },
      ports: [
        { id: 'left', type: 'input', group: 'left' }
      ]
    }
  ];

  const edges = [
    { source: '1', target: '2', id: 'edge-1-2' },
    { source: '2', target: '3', id: 'edge-2-3' },
    { source: '3', target: '4', id: 'edge-3-4' },
    { source: '4', target: '7', id: 'edge-4-5' },
  ];

  return (
    <div style={{ height: '600px' }}>
      <XFlow
        initialValues={{ nodes, edges }}
        settings={settings}
        widgets={{
          LLMNodeWidget,
          HTTPNodeWidget,
          ClassifierNodeWidget,
        }}
      />
    </div>
  );
};
