import React from 'react';
interface TNodeItem {
  title: string; // 节点 title
  type: string; // 节点类型 _group 比较te s
  description?: string; // 节点描述
  hidden?: boolean; // 是否可见
  icon: {
    type: string;
    bgColor: string;
  }
}

interface TNodeGroup {
  title: string; // 节点 title
  type: '_group',
  items: TNodeItem[]
}

export interface TNodeSelector {
  showSearch: boolean; // 配置是否可搜索
  items: (TNodeGroup | TNodeItem)[]
}

export interface TNodeMenu {
  ref: React.RefObject<any>; // 可选的 ref 属性
  showSearch: boolean; // 配置是否可搜索
  items: (TNodeGroup | TNodeItem)[]
  onClick: ({}: { type: string }) => void
}


export interface XFlowProps {
  initialValues: {
    nodes: any[],
    edges: any
  };
  layout: 'LR' | 'TB';
  nodeOptions: TNodeSelector;
  widges: any; // 自定义组件
  settings: any; // 节点配置
  nodeSelector: TNodeSelector;
}

export default XFlowProps;
