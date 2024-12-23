import { Schema } from 'form-render';
import React from 'react';
export interface TNodeItem {
  title: string; // 节点 title
  type: string; // 节点类型 _group 比较te
  description?: string; // 节点描述
  hidden?: boolean; // 是否可见
  icon: {
    type: string;
    bgColor: string;
  };
  settingSchema?: Schema; // 节点的配置schema（弹窗） string为自定义组件
  settingWidget?: string; // 自定义组件
  hideDesc?: boolean;// 隐藏业务描述
  nodePanel?: {  // 配置面板属性设置
    width?: string | number; // 配置面板宽度
    hideDesc?: boolean; // 配置面板描述
  }
}

export interface TNodeGroup {
  title: string; // 节点 title
  type: '_group';
  items: TNodeItem[];
}

export interface TNodeMenu {
  ref: React.RefObject<any>; // 可选的 ref 属性
  showSearch: boolean; // 配置是否可搜索
  items: (TNodeGroup | TNodeItem)[];
  onClick: ({}: { type: string }) => void;
}

export interface TNodeSelector {
  showSearch: boolean; // 配置是否可搜索
  items?: (TNodeGroup | TNodeItem)[];
}

export interface FlowProps {
  initialValues?: {
    nodes: any[];
    edges: any;
  };
  layout?: 'LR' | 'TB';
  /**
   * 自定义组件
   */
  widgets?: any;
  /**
   * 节点配置
   */
  settings?: (TNodeGroup | TNodeItem)[];
  nodeSelector?: TNodeSelector;
  iconFontUrl?: string;
  globalConfig?: {
    nodePanel?: {  // 配置面板属性设置
      width?: string | number; // 配置面板宽度
      hideDesc?: boolean; // 配置面板描述
    },
    nodeView?: {
      hideTitleTips: boolean;
    },
    edge: {
      hideEdgeAddBtn: boolean;// 是否隐藏两个节点之间，连线上的增加节点按钮
    }
  }
}

export default FlowProps;
