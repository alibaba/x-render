import { NodeMouseHandler,Handle } from '@xyflow/react';
import { Schema,useForm } from 'form-render';
import React, { ReactNode ,ComponentProps} from 'react';

type HandleProps = ComponentProps<typeof Handle>

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
  settingWidgetProps?: object;// 自定义组件参数
  hideDesc?: boolean; // 隐藏业务描述
  nodePanel?: {
    // 配置面板属性设置
    width?: string | number; // 配置面板宽度
    hideDesc?: boolean; // 配置面板描述
  };
  getSettingSchema?:(nodeId:string,nodeType:string,form:ReturnType<typeof useForm>)=>Promise<Schema>
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
}

export interface TLogPanel {
  // 日志面板
  // logData: any; // 日志面板接受的数据
  logList: Array<TLogListItem>; // 日志面板的所有数据===》默认能拿到页面所有节点的日志数据
  loading?: boolean; // 日志面板loading
  logWidget?: string; // 自定义日志面板组件
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
  hideAnnotate?:boolean
}

export interface THandle{
  // isConnectableStart?:boolean
  // isConnectableEnd?:boolean
  isValidConnection?:HandleProps['isValidConnection']
}

export interface TPanel{
  onClose:(activeNodeId:string)=>void
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
    nodePanel?: TNodePanel;
    nodeView?: TNodeView;
    edge?: TEdge;
    controls?:TControl
    handle?:THandle
  };
  logPanel?: TLogPanel; // 日志面板配置
  readOnly?:boolean//只读模式
  panel?:TPanel //表单配置面板
  onNodeClick?: NodeMouseHandler;
  onMenuItemClick: (itemInfo: ItemInfo, defaultAction: () => void) => void;
  clickAddNode:(type:string,addNode:(initData?:Record<string,any>)=>void)=>void
  // 单点调试方法
}
interface ItemInfo {
  key: 'copy' | 'paste' | 'delete' | string;
  nodeId: string;
  sourceHandle?: string;
}

export default FlowProps;
