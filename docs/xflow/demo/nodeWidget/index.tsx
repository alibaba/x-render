import React from 'react';
import XFlow from '@xrenders/xflow';
import settings from './setting';
import { Space, Tag, Typography } from 'antd';


const customNodeWidget = ({ data }) => {
  return <div style={{ wordWrap: "break-word" }}>
    <p>变量一：{data?.input}</p>
    <p>变量二：{data?.select}</p>
  </div>
}


const endNodeWidget = ({ data }) => {
  return <div style={{ wordWrap: "break-word" }}>
    {data?.input}
  </div>
}


const LLMNodeWidget = ({ data }) => {
  const labels = Object.keys(data) || [];
  return <Space direction='vertical'>
    {labels?.map(item => <Tag color='geekblue' ><Typography.Text style={{ maxWidth: 216 }} ellipsis={true}>{data[item]}</Typography.Text></Tag>)}
  </Space>
}

export default () => {
  const nodes = [
    { id: '1', type: 'Start', data: { input: '开始节点', select: "b" }, position: { x: 40, y: 240 } },
    { id: '2', type: 'LLM', data: { input1: 'input1' }, position: { x: 400, y: 240 } },
    { id: '3', type: 'End', data: { input: '通过nodeWidget自定义配置展示' }, position: { x: 800, y: 240 } }
  ];

  const edges = [
    { source: '1', target: '2', id: '234123' },
    { source: '2', target: '3', id: '56891' }
  ]

  return (
    <div style={{ height: '600px' }}>
      <XFlow
        initialValues={{ nodes, edges }}
        settings={settings}
        nodeSelector={{
          showSearch: true,
        }}
        widgets={{ customNodeWidget, endNodeWidget, LLMNodeWidget }}
      />
    </div>
  );
}
