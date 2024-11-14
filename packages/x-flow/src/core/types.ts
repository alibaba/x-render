import React from 'react';
export interface ConfigCtxProps {
  nodeWidges: React.ComponentType
}

export interface XFlowProps {
  nodes: any[];
  edges: any[];
  nodeMenus: any[];
  layout: 'LR' | 'TB'
}

export default XFlowProps;
