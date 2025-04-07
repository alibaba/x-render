import XFlow from '@xrenders/xflow';
import { message } from 'antd';
import { useState } from 'react';

export default () => {
  const [loading, setLoading] = useState<boolean>(false);

  const nodes = [
    {
      id: 'node1',
      type: 'LLM',
      position: {
        x: 300,
        y: 200,
      },
    },
  ];

  const settings = [
    {
      title: 'LLM',
      type: 'LLM',
      description: '调用大语言模型回答问题或者对自然语言进行处理',
      showTestingBtn: true,
      icon: {
        type: 'icon-model',
        bgColor: '#6172F3',
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
  ];

  return (
    <div style={{ height: '400px' }}>
      <XFlow
        initialValues={{ nodes, edges: [] }}
        settings={settings}
        onTesting={(node, nodes) => {
          setLoading(true);
          // 模拟调试过程
          setTimeout(() => {
            message.success('节点调试完成');
            setLoading(false);
          }, 1000);
          console.log('单点调试', node, nodes);
        }}
      />
    </div>
  );
};
