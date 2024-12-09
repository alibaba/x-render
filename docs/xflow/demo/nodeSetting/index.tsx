import XFlow from '@xrenders/xflow';
// import settings from './setting';
import React from 'react';

const settings = [
  {
    title: '开始',   // 节点名称
    type: 'Start',
    hidden: true,
    targetHandleHidden: true,
    icon: {          // 图标描述
      type: 'icon-start',    // icon-font
      bgColor: '#17B26A',    // 图标背景颜色
    },
    nodeConfigPanelWidth: 500,
    settingSchema: {     // 自定义节点配置
      type: 'object',
      properties: {
        input: {
          title: '变量一',
          type: 'string',
          widget: 'input',
        },
        select: {
          title: '变量二',
          type: 'string',
          widget: 'select',
          props: {
            options: [
              { label: 'a', value: 'a' },
              { label: 'b', value: 'b' },
              { label: 'c', value: 'c' },
            ],
          },
        },
        radio1: {
          title: '点击单选',
          type: 'string',
          widget: 'radio',
          props: {
            options: [
              { label: '早', value: 'a' },
              { label: '中', value: 'b' },
              { label: '晚', value: 'c' }
            ]
          }
        },
        textarea1: {
          title: '长文本',
          type: 'string',
          widget: 'textArea'
        },
        date1: {
          title: '日期选择',
          type: 'string',
          widget: 'datePicker'
        },
        dateRange1: {
          title: '日期范围',
          type: 'range',
          widget: 'dateRange'
        },
        time1: {
          title: '时间选择',
          type: 'string',
          widget: 'timePicker'
        },
        timeRange1: {
          title: '时间范围',
          type: 'range',
          widget: 'timeRange'
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
        select: {
          title: '变量二',
          type: 'string',
          widget: 'select',
          props: {
            options: [
              { label: 'a', value: 'a' },
              { label: 'b', value: 'b' },
              { label: 'c', value: 'c' },
            ],
          },
        },
      }
    }
  },
  {
    title: 'Switch',
    type: 'Switch',
    description: '允许你根据 if/else 条件将 workflow 拆分成两个分支',
    icon: {
      type: 'icon-switch',
      bgColor: '#06AED4',
    },
  },
  {
    title: '代码执行',
    type: 'Code',
    description: '执行一段 Groovy 或 Python 或 NodeJS 代码实现自定义逻辑',
    icon: {
      type: 'icon-code',
      bgColor: '#2E90FA',
    },
  },
  {
    title: '工具',
    type: 'tool',
    description: '允许使用工具能力',
    icon: {
      type: 'icon-gongju',
      bgColor: '#2E90FA',
    },
  },
  {
    title: '工具',
    type: '_group',   // 节点分组
    items: [
      {
        title: '代码执行',
        type: 'Code',
        description: '执行一段 Groovy 或 Python 或 NodeJS 代码实现自定义逻辑',
        icon: {
          type: 'icon-code',
          bgColor: '#2E90FA',
        },
      },
      {
        title: '工具',
        type: 'tool',
        description: '允许使用工具能力',
        icon: {
          type: 'icon-gongju',
          bgColor: '#2E90FA',
        },
      },
    ],
  },
]
export default () => {
  const nodes = [
    {
      type: 'Start',
      id: '1',
      position: { x: -35, y: 268 },
    },
    {
      type: 'Switch',
      id: '2',
      position: { x: 277.5, y: 268 },
    },
    {
      type: 'Code',
      id: '3',
      position: { x: 675, y: 123.75 },
    },
    {
      type: 'tool',
      id: '4',
      position: { x: 686.25, y: 495 },
    },
    {
      type: 'End',
      id: '5',
      position: { x: 1176.2499999999998, y: 281.25 },
    },
  ];
  const edges = [
    { source: '1', target: '2', id: 'e1-2' },
    {
      source: '2',
      target: '3',
      id: 'e2-3',
    },
    { source: '2', target: '4', id: 'e2-4' },
    {
      source: '3',
      target: '5',
      id: 'e3-5',
    },
    {
      source: '4',
      target: '5',
      id: 'e4-5',
    },
  ];

  return (
    <div style={{ height: '600px' }}>
      <XFlow
        initialValues={{ nodes, edges }}
        settings={settings}  // 节点配置
        nodeSelector={{
          showSearch: true,
        }}
        layout="LR"
        configPanelWidth={410}
      />
    </div>
  );
};
