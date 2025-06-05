import XFlow from '@xrenders/xflow';
import React,{ useState } from 'react';
import settings from './setting';
import { Button } from 'antd';
import CustomGroupTitle from './CustomGroupTittle';
import DetailLogWidget from './DetailLogWidget';

export default () => {
  const [logList, setLogList] = useState<any>([
    {
      nodeId: 'mcelcsg6pinydoy7',
      groupTitle:"日志分组1",
      statusPanel: {
        status: [
          {
            label: '状态',
            isBadge: true,
            // value:"失败"
          },
          {
            label: '执行时间',
            value: '0.01s',
          },
          {
            label: '总token数',
            value: '0tokens',
          },
        ],
        // extra: <span>哈哈哈哈哈哈哈哈</span>,
        extra: '测试测试',
      },
      codePanel: [
        {
          title: '输出数据',
          code: "{'target_language':'english','query':'string'}",
        },
        {
          title: '报错信息',
          code: "{'target_language':'english','query':'string'}",
        },
      ],
    },
    {
      nodeId: 'mcelcsg6pinydoy7',
      groupTitle: "customGroupTitle",// 自定义分组标题组件
      statusPanel: {
        status: [
          {
            label: '状态',
            isBadge: true,
            // value:"失败"
          },
          {
            label: '执行时间',
            value: '0.01s',
          },
          {
            label: '总token数',
            value: '0tokens',
          },
        ],
        // extra: <span>哈哈哈哈哈哈哈哈</span>,
        extra: '测试测试',
      },
      codePanel: [
        {
          title: '输出数据',
          code: "{'target_language':'english','query':'string'}",
        },
        {
          title: '报错信息',
          code: "{'target_language':'english','query':'string'}",
        },
      ],
    },
    {
      nodeId: 'w4be9edh4bhdlokm',
      statusPanel: {
        status: [
          {
            label: '状态',
            isBadge: true,
            // value:"失败"
          },
          {
            label: '执行时间',
            value: '0.01s',
          },
          {
            label: '总token数',
            value: '0tokens',
          },
        ],
        // extra: <span>哈哈
        // 哈哈哈哈哈哈</span>,
        extra: '测试测试',
      },
      codePanel: [
        {
          title: '输出数据',
          code: "{'target_language':'english','query':'string'}",
        },
        {
          title: '报错信息',
          code: "{'target_language':'english','query':'string'}",
        },
      ],
      showDetailLogWidget:false,// 是否展示自定义详情tab组件
    },
     {
       nodeId: '4m9tee00n819nyyy',
      statusPanel: {
        status: [
          {
            label: '状态',
            isBadge: true,
            // value:"失败"
          },
          {
            label: '执行时间',
            value: '0.01s',
          },
          {
            label: '总token数',
            value: '0tokens',
          },
        ],
        extra: '测试测试',
      },
      showDetailLogWidget: false,// 是否展示自定义详情tab组件
    },
    {
      nodeId: '3qloq2p1x3wcwbzg',
      statusPanel: {
        status: [
          {
            label: '状态',
            isBadge: true,
            // value:"失败"
          },
          {
            label: '执行时间',
            value: '0.01s',
          },
          {
            label: '总token数',
            value: '0tokens',
          },
        ],
        extra: '测试测试',
      },
      showDetailLogWidget: false,// 是否展示自定义详情tab组件
    }
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<string>('detail');
  const nodes = [
    {
      id: 'mcelcsg6pinydoy7',
      type: 'Parallel',
      data: {
        _status: 'warning',
        list: [
          {
            _id: 'id_30ds0x3evus7ogo2',
            value: '事件1',
          },
          {
            _id: 'id_m1l276eelcgn7s1p',
            value: '事件2',
          },
        ],
        logTrackList: [
          {
            title: '输出数据1',
            code: "{'target_language':'english','query':'string'}",
          },
          {
            title: '报错信息2',
            code: "{'target_language':'english','query':'string'}",
          },
        ],
      },
      position: {
        x: -40,
        y: 281.25,
      },
    },
    {
      id: '4m9tee00n819nyyy',
      type: 'tool',
      position: {
        x: 400,
        y: 227.5,
      },
      data: {
        _status: 'custom-succsess',
      },
    },
    {
      id: 'j0kufl0o4fca4ee9',
      type: 'knowledge',
      // data: {
      //   _status: "custom-error"
      // },
      position: {
        x: 312.5,
        y: 438.75,
      },
    },
    {
      id: 'w4be9edh4bhdlokm',
      type: 'Start',
      position: {
        x: -379.21875,
        y: 348.75,
      },
      data: {
        _status: 'success',
      },
    },
    {
      id: '3qloq2p1x3wcwbzg',
      type: 'End',
      position: {
        x: 675,
        y: 360,
      },
      data: {
        _status: 'warning',
      },
    },
  ];

  const edges = [
    {
      id: 'ky0eedrd6t2hqq81',
      source: 'mcelcsg6pinydoy7',
      target: '4m9tee00n819nyyy',
      sourceHandle: 'id_30ds0x3evus7ogo2',
    },
    {
      id: '7tm5a339lj94ugtn',
      source: 'mcelcsg6pinydoy7',
      target: 'j0kufl0o4fca4ee9',
      sourceHandle: 'id_m1l276eelcgn7s1p',
    },
    {
      type: 'buttonedge',
      source: 'w4be9edh4bhdlokm',
      target: 'mcelcsg6pinydoy7',
      id: 'xy-edge__w4be9edh4bhdlokm-mcelcsg6pinydoy7',
    },
    {
      type: 'buttonedge',
      source: '4m9tee00n819nyyy',
      target: '3qloq2p1x3wcwbzg',
      id: 'xy-edge__4m9tee00n819nyyy-3qloq2p1x3wcwbzg',
    },
    {
      type: 'buttonedge',
      source: 'j0kufl0o4fca4ee9',
      target: '3qloq2p1x3wcwbzg',
      id: 'xy-edge__j0kufl0o4fca4ee9-3qloq2p1x3wcwbzg',
    },
  ];
  return (
    <div style={{ height: '600px' }}>
      <XFlow
        initialValues={{ nodes, edges }}
        settings={settings}
        nodeSelector={{
          showSearch: true,
        }}
        widgets={{
          customGroupTitle: CustomGroupTitle,
          DetailLogWidget
        }}
        logPanel={{
          // 日志面板
          logList, // 日志面板接受的数据
          loading, // 日志面板loading
          tabsProps: {
            tabBarExtraContent:activeKey === 'detail' ? <Button type='primary' size='small'>自定义按钮</Button> : null,
            onChange: (activeKey)=>{
              setActiveKey(activeKey);
            },
          },
          detailLogWidget: 'DetailLogWidget',//自定义详情tab组件
        }}
        globalConfig={{
          nodeView: {
            status: [
              {
                value: 'custom-error',
                color: 'red',
                name: '失败状态',
              },
              {
                value: 'custom-succsess',
                color: 'green',
                name: '成功状态',
              },
            ],
          },
        }}
      />
    </div>
  );
};
