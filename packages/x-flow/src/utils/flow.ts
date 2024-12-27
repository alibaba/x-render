import { uuid } from './';

/**
 * 获取所有子节点
 */
export const generateCopyNodes = (parentNode: any) => {
  // 1、定义 childNodeIds 数组，用于存储找到的所有节点的 id，默认把 rootNode 添加到数组中
  const childNodes: any[] = [];
  const rootNode = {
    id: uuid(),
    type: parentNode.type,
    data: {
      ...parentNode.data,
    },
    position: { x: 0, y: 0 },
    sourceId: parentNode.id,
  };
  childNodes.push(rootNode);

  return childNodes;
};
