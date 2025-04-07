import React, { useState } from 'react';
import XFlow from '@xrenders/xflow';
import { Button, Space, message } from 'antd';
import { PlayCircleOutlined, SaveOutlined } from '@ant-design/icons';
import { settings } from './setting';
import './index.less';

export default () => {
  const [loading, setLoading] = useState(false);
  const [logList, setLogList] = useState<any[]>([
    {
      nodeId: 'llm',
      statusPanel: {
        status: [
          { label: '状态', value: 'success', isBadge: true },
          { label: '耗时', value: '2.3s' },
          { label: 'Token', value: '856' },
        ],
        extra: `执行时间: ${new Date().toLocaleString()}`,
      },
      codePanel: [
        {
          title: '输入',
          code: JSON.stringify({
            name: 'GPT-4调用',
            model: 'gpt-4',
            temperature: 0.7,
            prompt: '请生成一段产品介绍文案',
          }, null, 2),
        },
        {
          title: '输出',
          code: `XFlow是一个强大的流程编排组件，它提供了直观的可视化界面，支持节点拖拽、连线、配置等功能。用户可以通过简单的操作快速构建复杂的业务流程。\n\n特点：\n1. 可视化编排\n2. 丰富的节点类型\n3. 灵活的配置选项\n4. 完善的状态管理`,
        },
      ],
    },
  ]);

  // 初始节点配置
  const nodes = [
    {
      id: 'start',
      type: 'Start',
      data: {
        title: '开始',
      },
      position: {
        x: 10,
        y: 60,
      },
    },
    {
      id: 'llm',
      type: 'LLM',
      data: {
        name: 'GPT-4调用',
        model: 'gpt-4',
        temperature: 0.7,
        _status: 'success', // 初始状态改为success，匹配初始日志
      },
      position: {
        x: 250,
        y: 150,
      },
    },
    {
      id: 'review',
      type: 'userTask',
      data: {
        name: '人工审核',
        assignee: 'admin',
        description: '请审核AI生成的内容',
        _status: 'warning',
      },
      position: {
        x: 450,
        y: 250,
      },
    },
    {
      id: 'format',
      type: 'Format',
      data: {
        name: '结果格式化',
        format: 'markdown',
        _status: 'success',
      },
      position: {
        x: 650,
        y: 150,
      },
    },
    {
      id: 'end',
      type: 'End',
      data: {
        title: '结束',
      },
      position: {
        x: 850,
        y: 230,
      },
    },
  ];

  const edges = [
    { source: 'start', target: 'llm', id: 'e1' },
    { source: 'llm', target: 'review', id: 'e2' },
    { source: 'review', target: 'format', id: 'e3' },
    { source: 'format', target: 'end', id: 'e4' },
  ];

  // 模拟节点测试
  const handleNodeTest = async (node) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newLog = {
        nodeId: node.id,
        statusPanel: {
          status: [
            { label: '状态', value: 'success', isBadge: true },
            { label: '耗时', value: '1.5s' },
            { label: 'Token', value: '1024' },
          ],
          extra: `执行时间: ${new Date().toLocaleString()}`,
        },
        codePanel: [
          {
            title: '输入',
            code: JSON.stringify(node.data, null, 2),
          },
          {
            title: '输出',
            code: `节点 ${node.data.name} 执行成功\n处理完成时间: ${new Date().toLocaleString()}`,
          },
        ],
      };

      setLogList(prev => [...prev, newLog]);
      message.success(`${node.data.name}测试成功`);
    } catch (error) {
      message.error(`${node.data.name}测试失败`);
    } finally {
      setLoading(false);
    }
  };

  // 运行整个流程
  const runFlow = async () => {
    setLoading(true);
    try {
      setLogList([]);
      for (const node of nodes) {
        if (node.type !== 'Start' && node.type !== 'End') {
          await handleNodeTest(node);
        }
      }
      message.success('流程执行完成');
    } catch (error) {
      message.error('流程执行失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ height: '600px', position: 'relative' }}>
        <div style={{ height: '600px' }}>
          <XFlow
            initialValues={{ nodes, edges }}
            settings={settings}
            onTesting={handleNodeTest}
            logPanel={{
              logList,
              loading,
            }}
            globalConfig={{
              nodeView: {
                status: [
                  { value: 'processing', color: '#1890FF', name: '处理中' },
                  { value: 'success', color: '#52c41a', name: '成功' },
                  { value: 'error', color: '#ff4d4f', name: '失败' },
                  { value: 'warning', color: '#faad14', name: '警告' },
                ],
              },
            }}
          />
        </div>
        <Space className="tools">
          <Button
            type="primary"
            icon={<PlayCircleOutlined />}
            loading={loading}
          onClick={runFlow}
          size="small" className="tools-btn"
          >
            运行流程
          </Button>
        <Button icon={<SaveOutlined />} size="small" className="tools-btn" >保存流程</Button>
        </Space>
    </div>
  );
};
