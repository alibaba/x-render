import { Empty, Space, Spin, Tabs } from 'antd';
import { isArray } from 'lodash';
import React, { FC, useContext } from 'react';
import { ConfigContext } from '../../models/context';
import DetailPanel from './components/DetailPanel';
import TrackPanel from './components/TrackPanel';
import './index.less';

interface INodeEditorProps {
  data: any;
  onChange?: (data: any) => void;
  nodeType: string;
  id: string;
  node: any;
  onTrackCollapseChange: (data: any) => void; // 追踪面板点击collapse方法
}

const NodeLogPanel: FC<INodeEditorProps> = (props: any) => {
  const { data, onChange, nodeType, id, node, onTrackCollapseChange } = props;
  const { widgets, globalConfig, logPanel } = useContext(ConfigContext);
  const {
    nodeView: { status = [] },
  } = globalConfig;
  const CustomWidget = widgets[logPanel?.logWidget]; // 内置setting组件
  const logData = isArray(logPanel?.logList)
    ? (logPanel?.logList || [])?.filter(item => item?.nodeId === id)
    : [];

  if (logPanel?.logWidget && CustomWidget) {
    return (
      <CustomWidget
        logList={logPanel?.logList}
        node={node}
        logPanel={logPanel}
      />
    );
  } else {
    return (
      <div className="node-log-container">
        <Spin spinning={Boolean(logPanel?.loading)}>
          <Tabs
            size="small"
            className="log-header-tab"
            {...logPanel?.tabsProps}
          >
            <Tabs.TabPane tab="详情" key="detail">
              {Boolean(logData?.length) ? (
                <Space direction="vertical" size={16} style={{width:'100%'}}>
                  {(logData || [])?.map((item, index) => {
                    return (
                      <DetailPanel
                        key={index}
                        currentStatus={item?._status || node?._status}
                        detailData={item}
                      />
                    );
                  })}
                </Space>
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="暂无日志信息"
                  style={{ fontSize: '12px' }}
                />
              )}
            </Tabs.TabPane>
            <Tabs.TabPane tab="追踪" key="track">
              <TrackPanel
                logList={logPanel?.logList || []}
                onTrackCollapseChange={onTrackCollapseChange}
              />
            </Tabs.TabPane>
          </Tabs>
        </Spin>
      </div>
    );
  }
};

export default NodeLogPanel;
