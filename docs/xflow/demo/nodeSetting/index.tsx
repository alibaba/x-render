import XFlow, { FlowProvider, useFlow } from '@xrenders/xflow';
import { Button } from 'antd';
// import settings from './setting';
import React from 'react';
import { settings, nodes, edges } from "./data";

export const Flow = () => {
  const { getNodes, getEdges, getViewport, toObject } = useFlow();

  return (
    <>
      <Button type="primary" onClick={() => {
        console.info("打印节点数据", getNodes())
        console.info("打印边数据", getEdges())
        console.info("打印视口数据", getViewport())
        console.info("打印画布数据", toObject())
      }}>打印画布数据</Button>
      <XFlow
        initialValues={{ nodes, edges }}
        settings={settings as any}  // 节点配置
        nodeSelector={{
          showSearch: true,
        }}
        layout="LR"
        configPanelWidth={410}
        hideLineInsertBtn={true}
      />
    </>
  )
}

export default () => {
  return (
    <div style={{ height: '600px' }}>
      <FlowProvider>
        <Flow />
      </FlowProvider>
    </div>
  );
};
