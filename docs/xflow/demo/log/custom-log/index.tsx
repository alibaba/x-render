import XFlow from '@xrenders/xflow';
import { useState } from 'react';
import settings from './setting';
import { fakeApi } from './utils';

const CustomLogPanel = ({ logList, node }) => {
  console.log('自定义组件', logList, node);
  return <p>自定义组件:{node?.id}</p>;
};

export default () => {
  const [logList, setLogList] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
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
        _status: 'custom-success',
      },
    },
    {
      id: 'j0kufl0o4fca4ee9',
      type: 'knowledge',
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
        widgets={{ CustomLogPanel }}
        logPanel={{
          // 日志面板
          logList, // 日志面板接受的数据
          loading, // 日志面板loading
          logWidget: 'CustomLogPanel',
        }}
        globalConfig={{
          nodeView: {
            status: [
              {
                value: 'custom-success',
                color: 'green',
                name: '自定义成功状态',
              },
            ],
          },
        }}
        onNodeClick={async (e, node) => {
          setLoading(true);
          const logList = await fakeApi('xx', {});
          setLogList([logList]);
          setLoading(false);
        }}
      />
    </div>
  );
};
