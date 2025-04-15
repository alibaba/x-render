import XFlow, {
  FlowProvider,
  useEdges,
  useFlow,
  useNodes,
} from '@xrenders/xflow';
import { Button, Card, Space, Spin } from 'antd';
import * as React from 'react';
import { useEffect, useState } from 'react';
import firstTagWidget from './components/customWidget';
import secondTagWidget from './components/secondTagWidget';
import TagWidget from './components/TagWidget';
import { initEdges, initNodes } from './const';
import './index.less';
import { settings } from './setting';
export const tagColors = [
  'blue',
  'green',
  'red',
  'orange',
  'purple',
  'cyan',
  'magenta',
  'gold',
  'lime',
  'volcano',
];

export const getColorByIndex = (index: number) => {
  return tagColors[index % tagColors.length];
};

const XFlowContent = () => {
  const [loading, setLoading] = useState(false);
  const nodes = useNodes();
  const edges = useEdges();
  const [initData, setInitData] = useState<any>({ nodes: [], edges: [] });
  const { setEdges, setNodes, runAutoLayout, getNodes, fitView } = useFlow();
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    runAutoLayout();
  }, []);

  return (
    <Spin spinning={loading}>
      <div style={{ height: '88vh' }} className="indicator-flow-container">
        <div className="indicator-flow-header">
          <div className="indicator-flow-header-title">指标关系图谱</div>
        </div>
        <div className="indicator-flow-back-btn-container">
          <Space>
            <Button
              onClick={() => {
                setLoading(true);
                setNodes(initData?.nodes || []);
                setEdges(initData?.edges || []);
                runAutoLayout();
                setLoading(false);
              }}
              className="tools-btn"
            >
              重置
            </Button>

            <Button type="primary" className="tools-btn" loading={saveLoading}>
              保存
            </Button>
          </Space>
        </div>
        <XFlow
          initialValues={{
            nodes: initNodes,
            edges: initEdges,
          }}
          settings={settings}
          widgets={{
            firstTagWidget,
            secondTagWidget,
            TagWidget,
          }}
          globalConfig={{
            edge: {
              hideEdgeAddBtn: true,
              deletable: false,
            },
            controls: {
              hideAnnotate: true,
            },
          }}
        />
      </div>
    </Spin>
  );
};

export default React.memo(() => {
  return (
    <FlowProvider>
      <Card size="small">
        <XFlowContent />
      </Card>
    </FlowProvider>
  );
});
