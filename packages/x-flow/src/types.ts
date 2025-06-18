import { NodeMouseHandler,Handle, Edge } from '@xyflow/react';
import { TabPaneProps } from 'antd';
import { Schema,useForm } from 'form-render';
import { ReactFlow } from '@xyflow/react';
import React, { ReactNode ,ComponentProps} from 'react';
import SourceHandle, {
  HandleProps,
} from './components/CustomNode/sourceHandle';

type SourceHandleType = typeof SourceHandle;
type ReactFlowProps = ComponentProps<typeof ReactFlow>
export interface TNodeItem {
  title: string; // 节点 title
  type: string; // 节点类型 _group 比较te
  description?: string; // 节点描述
  hidden?: boolean; // 是否可见
  iconSvg?: string;// svg图标
  icon: {
    type: string;
    bgColor: string;
  };
  settingSchema?: Schema; // 节点的配置schema（弹窗） string为自定义组件
  settingWidget?: string; // 自定义组件
  settingWidgetProps?: object;// 自定义组件参数
  hideDesc?: boolean; // 隐藏业务描述
  nodePanel?: {
    // 配置面板属性设置
    width?: string | number; // 配置面板宽度
    hideDesc?: boolean; // 配置面板描述
  };
  nodeWidget?: string; // 自定义节点组件
  renderHandle?: (
    sourceHandle: SourceHandleType,
    sourceHandleProps: ComponentProps<SourceHandleType>,
    nodeProps: {
      id: string;
      type: string;
      data: any;
      layout: 'LR' | 'TB';
      isConnectable: boolean;
      readOnly: boolean;
    }
  ) => React.JSX.Element;
  getSettingSchema?: (nodeId: string, nodeType: string, nodeItem:TNodeItem,nodeData:any,form: ReturnType<typeof useForm>) => Promise<Schema>;
  switchExtra: {   // 条件节点额外属性配置
    hideElse: boolean;
    valueKey: string;
    titleKey: string;
  };
  parallelExtra: {  // 并行节点额外配置
    valueKey: string;
    titleKey: string;
  };
  disabledCopy?: boolean;
  disabledDelete?: boolean;
  onTesting: (node, nodes) => void;// 单点调试方法
  showTestingBtn?: boolean; // 是否显示单点调试按钮
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

export interface TNodePanel {
  // 配置面板属性设置
  width?: string | number; // 配置面板宽度
  hideDesc?: boolean; // 配置面板描述
  onClose?:(activeNodeId:string)=>void
}

export interface TNodeSelector {
  showSearch: boolean; // 配置是否可搜索
  items?: (TNodeGroup | TNodeItem)[];
}

export interface TLogListItem {
  // 日志数据格式：
  statusPanel?: {
    status?: Array<{ label: string; value?: string; isBadge?: boolean }>; // isBadge是否为badge形式显示状态
    extra?: string | ReactNode;
  };
  codePanel?: Array<{ title: string; code: string }>;
  nodeId: string;// 节点ID
  groupTitle?: string;// 节点组标题
  showDetailLogWidget?: boolean;// 是否展示详情日志面板
  _status?: string | number;// 当前log的状态，如果没有，则以data._status为准
}

export interface TLogPanel {
  // 日志面板
  // logData: any; // 日志面板接受的数据
  logList: Array<TLogListItem>; // 日志面板的所有数据===》默认能拿到页面所有节点的日志数据
  loading?: boolean; // 日志面板loading
  logWidget?: string; // 自定义日志面板组件
  width?: number;// 日志面板宽度
  tabsProps?: TabPaneProps;// 内置日志面板,详情和追踪选项卡切换组件,antd的tabs配置透传
  detailLogWidget?: string;// 自定义详情日志面板组件
}

export interface TNodeView {
  hideTitleTips?: boolean;
  status?: Array<{
    name: string; // 状态名称
    color: string; // 状态颜色
  }>;
}

export interface TEdge {
  // 边的配置
  hideEdgeAddBtn?: boolean; // 是否隐藏两个节点之间，连线上的增加节点按钮
  hideEdgeDelBtn?: boolean; // 是否隐藏两个节点之间，连线上的删除节点按钮
  deletable?: boolean; // 是否允许删除线条 初始化的edges不受此项影响
}

export interface TControl{
  hideAddNode?:boolean
  hideAnnotate?: boolean
  hideUndoRedoBtns?:boolean
}

export interface THandle{
  // isConnectableStart?:boolean
  // isConnectableEnd?:boolean
  isValidConnection?:HandleProps['isValidConnection']
}
export interface FlowProps {
  initialValues?: {
    nodes: Array<{
      id: string;
      type: string;
      data: Record<string, any>;
      position: {
        x: number;
        y: number;
      };
    }>;
    edges: Array<{
      id: string;
      source: string;
      target: string;
    }>;
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
    nodePanel?: TNodePanel;
    nodeView?: TNodeView;
    edge?: TEdge;
    controls?:TControl
    handle?:THandle
    deleteKeyCode?:string | string[] | null
  };
  logPanel?: TLogPanel; // 日志面板配置
  readOnly?:boolean//只读模式
  onNodeClick?: ReactFlowProps['onNodeClick']
  onEdgeClick?:ReactFlowProps['onEdgeClick']
  onMenuItemClick?: (itemInfo: ItemInfo, defaultAction: () => void) => void;
  clickAddNode?:(type:string,nodeItem:TNodeItem,addNode:(initData?:Record<string,any>)=>void)=>void
}
interface ItemInfo {
  key: 'copy' | 'paste' | 'delete' | string;
  nodeId: string;
  sourceHandle?: string;
}

export default FlowProps;
